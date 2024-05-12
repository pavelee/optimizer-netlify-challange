import { AssetGroupStore, BlobStore, JsonStore } from 'app/_config/store';
import { AssetFactory } from 'app/factories/AssetFactory';
import { Asset } from 'app/models/Asset';
import { UniqueHashGenerator } from 'app/utils/hasher';
import { File } from 'app/models/File';
import { optimizeImage } from 'app/actions/optimizeImage';
import { FileFactory } from 'app/factories/FileFactory';
import { AssetGroup } from 'app/models/AssetGroup';
import { AssetGroupFactory } from 'app/factories/AssetGroupFactory';

export class AssetsService {
    public async createAssetGroup(assets: Asset[] = []): Promise<AssetGroup> {
        const id = UniqueHashGenerator.generateHash();
        const assetGroup = new AssetGroup(id, new Date(), assets);
        await this.saveGroupAsset(assetGroup);
        return assetGroup;
    }

    public async getAssetGroup(assetGroupId: string): Promise<AssetGroup> {
        const assetGroup = await AssetGroupStore.get(assetGroupId);
        if (!assetGroup) {
            throw new Error('Asset group not found');
        }
        return await AssetGroupFactory.createFromDto(assetGroup);
    }

    public async addAssetToGroup(assetGroup: AssetGroup, asset: Asset): Promise<AssetGroup> {
        assetGroup.add(asset);
        await this.saveGroupAsset(assetGroup);
        return assetGroup;
    }

    public async createAsset(file: Blob, fileName: string | undefined): Promise<Asset> {
        const hash = UniqueHashGenerator.generateHash();
        const extension = file.type.split('/')[1];
        await BlobStore.save(hash, file);
        const name = fileName || `file.${extension}`;
        const f = new File(hash, name, file.size, extension);
        const assetHash = UniqueHashGenerator.generateHash();
        const a = new Asset(assetHash, new Date(), f);
        await this.saveAsset(a);
        return a;
    }

    public async optimizeAsset(asset: Asset): Promise<Asset> {
        // const file = await BlobStore.get(asset.getOriginalFile().getKey());
        const optimizedFile = await optimizeImage(asset.getOriginalFile().getKey());
        const extension = 'webp';//asset.getOriginalFile().getExtension();
        const optimizedHashValue = `optimized-${asset.getOriginalFile().getKey()}`;
        await BlobStore.save(optimizedHashValue, optimizedFile);
        asset.setOptimizedFile(
            FileFactory.createFromDTO({ key: optimizedHashValue, name: asset.getOriginalFile().getName(), size: optimizedFile.size, extension: extension })
        );
        await this.saveAsset(asset);
        return asset;
    }

    public async saveAsset(asset: Asset) {
        await JsonStore.save(asset.getId(), asset.toObject());
    }

    public async saveGroupAsset(asset: AssetGroup) {
        await AssetGroupStore.save(asset.getId(), asset.toObject());
    }

    public async getAsset(assetId: string): Promise<Asset> {
        const asset = await JsonStore.get(assetId);
        if (!asset) {
            throw new Error('Asset not found');
        }
        return AssetFactory.createFromDTO(asset);
    }

    public async getAssets(): Promise<Asset[]> {
        const data = await JsonStore.list();
        return data.map((asset) => AssetFactory.createFromDTO(asset));
    }
}
