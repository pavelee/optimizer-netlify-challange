import { JsonStore } from 'app/_config/store';
import { AssetFactory } from 'app/factories/AssetFactory';
import { Asset } from 'app/models/Asset';
import { File } from 'app/models/File';
import { Hasher } from 'app/utils/hasher';

export class OptimizeService {
    public async createAsset(file: Blob) {
        const hash = Hasher.hash();
        const f = new File(hash, file.size);
        const assetHash = Hasher.hash();
        const a = new Asset(assetHash, f);
        await this.saveAsset(a);
    }

    public async saveAsset(asset: Asset) {
        await JsonStore.save(asset.getId(), asset.toObject());
    }

    public async optimizeAsset(asset: Asset) {}

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
