import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetGroup } from 'app/models/AssetGroup';
import { AssetFactory } from './AssetFactory';

export class AssetGroupFactory {
    public static createFromDto(dto: AssetGroupDto): AssetGroup {
        const assets = dto.assets.map((asset) => AssetFactory.createFromDTO(asset));
        return new AssetGroup(dto.id, new Date(dto.created), assets);
    }
}
