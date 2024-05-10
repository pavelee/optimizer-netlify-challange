import { JsonStore } from 'app/_config/store';
import { FileFactory } from 'app/factories/FileFactory';
import { File, FileDTO } from 'app/models/File';

export class AssetRepository {
    async findFile(key: string): Promise<File | null> {
        const data = await JsonStore.list();
        let file: FileDTO | null = null;
        for (const asset of data) {
            if (asset.originalFile.key === key) {
                file = asset.originalFile;
                break;
            }
            if (asset.optimizedFile && asset.optimizedFile.key === key) {
                file = asset.optimizedFile;
                break;
            }
        }
        if (!file) {
            return null;
        }
        return FileFactory.createFromDTO(file);
    }
}
