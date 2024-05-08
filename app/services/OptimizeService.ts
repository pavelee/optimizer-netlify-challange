import { Asset } from 'app/models/Asset';
import { File } from 'app/models/File';
import { Hasher } from 'app/utils/hasher';

export class OptimizeService {
    public async createAsset(file: Blob) {
        const hash = Hasher.hash();
        const f = new File(hash, file.size);
        const a = new Asset(f);
        await this.saveAsset(a);
    }

    public async saveAsset(asset: Asset) {}

    public async optimizeAsset(asset: Asset) {}

    // public async getAsset(): Promise<Asset> {

    // }

    public async getAssets() {}
}
