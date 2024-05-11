import { JsonStore } from 'app/_config/store';
import { AssetFactory } from 'app/factories/AssetFactory';
import { FileFactory } from 'app/factories/FileFactory';
import { Asset, AssetDTO } from 'app/models/Asset';
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

    async findBy(
        query: any,
        order: {
            created?: 'asc' | 'desc';
        }
    ): Promise<Asset[]> {
        const data = await JsonStore.list();
        const r = data.map((asset: AssetDTO) => {
            return AssetFactory.createFromDTO(asset);
        });

        if (order.created) {
            r.sort((a, b) => {
                if (order.created === 'asc') {
                    return a.getCreated().getTime() - b.getCreated().getTime();
                } else {
                    return b.getCreated().getTime() - a.getCreated().getTime();
                }
            });
        }

        return r;
    }
}
