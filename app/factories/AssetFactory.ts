import { Asset, AssetDTO } from 'app/models/Asset';
import { FileFactory } from './FileFactory';

export class AssetFactory {
    public static createFromDTO(dto: AssetDTO): Asset {
        return new Asset(dto.id, FileFactory.createFromDTO(dto.originalFile));
    }
}
