import { File, FileDTO } from './File';

export type AssetDTO = {
    id: string;
    originalFile: FileDTO;
    optimizedFile?: FileDTO;
};

export class Asset {
    public constructor(private id: string, private originalFile: File, private optimizedFile?: File) {}

    public getId(): string {
        return this.id;
    }

    public getOriginalFile(): File {
        return this.originalFile;
    }

    public getOptimizedFile(): File | undefined {
        return this.optimizedFile;
    }

    public setOptimizedFile(file: File) {
        this.optimizedFile = file;
    }

    toObject(): AssetDTO {
        return {
            id: this.id,
            originalFile: this.originalFile.toObject(),
            optimizedFile: this.optimizedFile ? this.optimizedFile.toObject() : undefined
        };
    }
}
