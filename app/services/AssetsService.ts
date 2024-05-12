import { AssetGroupStore, BlobStore, JsonStore } from 'app/_config/store';
import { AssetFactory } from 'app/factories/AssetFactory';
import { Asset } from 'app/models/Asset';
import { UniqueHashGenerator } from 'app/utils/hasher';
import { File } from 'app/models/File';
import { optimizeImage } from 'app/actions/optimizeImage';
import { FileFactory } from 'app/factories/FileFactory';
import { AssetGroup } from 'app/models/AssetGroup';

export class AssetsService {
    public async createAssetGroup(assets: Asset[] = []): Promise<AssetGroup> {
        const id = UniqueHashGenerator.generateHash();
        const assetGroup = new AssetGroup(id, new Date(), assets);
        await this.saveGroupAsset(assetGroup);
        return assetGroup;
    }

    public async createAsset(file: Blob): Promise<Asset> {
        const hash = UniqueHashGenerator.generateHash();
        const extension = file.type.split('/')[1];
        await BlobStore.save(hash, file);
        const f = new File(hash, file.size, extension);
        const assetHash = UniqueHashGenerator.generateHash();
        const a = new Asset(assetHash, new Date(), f);
        await this.saveAsset(a);
        return a;
    }

    public async optimizeAsset(asset: Asset): Promise<Asset> {
        // const file = await BlobStore.get(asset.getOriginalFile().getKey());
        const optimizedFile = await optimizeImage(asset.getOriginalFile().getKey());
        const extension = optimizedFile.type.split('/')[1];
        const optimizedHashValue = `optimized-${asset.getOriginalFile().getKey()}`;
        await BlobStore.save(optimizedHashValue, optimizedFile);
        asset.setOptimizedFile(
            FileFactory.createFromDTO({ key: optimizedHashValue, size: optimizedFile.size, extension: extension })
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
