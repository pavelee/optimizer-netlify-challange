import { File, FileDTO } from './File';

export type AssetDTO = {
    id: string;
    originalFile: FileDTO;
    optimizedFile?: FileDTO;
};

export class Asset {
    private optimizedFile: File;

    public constructor(private id: string, private originalFile: File) {}

    public getId(): string {
        return this.id;
    }

    public getOriginalFile(): File {
        return this.originalFile;
    }

    public getOptimizedFile(): File {
        return this.optimizedFile;
    }

    toObject(): AssetDTO {
        return {
            id: this.id,
            originalFile: this.originalFile.toObject(),
            optimizedFile: undefined //this.optimizedFile.toObject()
        };
    }
}
