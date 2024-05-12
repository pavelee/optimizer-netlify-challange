import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetGroup } from 'app/models/AssetGroup';
import { AssetsService } from 'app/services/AssetsService';

export class AssetGroupFactory {
    public static async createFromDto(dto: AssetGroupDto): Promise<AssetGroup> {
        const as = new AssetsService();
        const assets = await Promise.all(dto.assets.map(async (asset) => {
            const a = await as.getAsset(asset.id);
            return a;
        }));
        return new AssetGroup(dto.id, new Date(dto.created), assets);
    }
}
