import { BlobStore, JsonStore } from 'app/_config/store';
import { AssetFactory } from 'app/factories/AssetFactory';
import { Asset } from 'app/models/Asset';
import { Hasher } from 'app/utils/hasher';
import { File } from 'app/models/File';
import { optimizeImage } from 'app/actions/optimizeImage';
import { FileFactory } from 'app/factories/FileFactory';

export class AssetsService {
    public async createAsset(file: Blob): Promise<Asset> {
        const hash = Hasher.hash();
        const extension = file.type.split('/')[1];
        await BlobStore.save(hash, file);
        const f = new File(hash, file.size, extension);
        const assetHash = Hasher.hash();
        const a = new Asset(assetHash, f);
        await this.saveAsset(a);
        return a;
    }

    public async optimizeAsset(asset: Asset) {
        // const file = await BlobStore.get(asset.getOriginalFile().getKey());
        const optimizedFile = await optimizeImage(asset.getOriginalFile().getKey());
        const extension = optimizedFile.type.split('/')[1];
        const opimizedHash = `optimized-${asset.getOriginalFile().getKey()}`;
        await BlobStore.save(opimizedHash, optimizedFile);
        asset.setOptimizedFile(FileFactory.createFromDTO({ key: opimizedHash, size: optimizedFile.size, extension: extension}));
        await this.saveAsset(asset);
    }

    public async saveAsset(asset: Asset) {
        await JsonStore.save(asset.getId(), asset.toObject());
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
