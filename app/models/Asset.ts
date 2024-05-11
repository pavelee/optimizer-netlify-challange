import { File, FileDTO } from './File';

export type AssetDTO = {
    id: string;
    created: Date;
    originalFile: FileDTO;
    optimizedFile?: FileDTO;
    optimizationPercent?: number;
};

export class Asset {
    public constructor(
        private id: string,
        private created: Date,
        private originalFile: File,
        private optimizedFile?: File
    ) {}

    public getId(): string {
        return this.id;
    }

    public getOriginalFile(): File {
        return this.originalFile;
    }

    public getCreated(): Date {
        return this.created;
    }

    public getOptimizedFile(): File | undefined {
        return this.optimizedFile;
    }

    public setOptimizedFile(file: File) {
        this.optimizedFile = file;
    }

    public getSizeOptimizationInPercent(): number {
        if (!this.optimizedFile) {
            return 0;
        }
        return Math.round((1 - this.optimizedFile.getSize() / this.originalFile.getSize()) * 100);
    }

    toObject(): AssetDTO {
        return {
            id: this.id,
            originalFile: this.originalFile.toObject(),
            optimizedFile: this.optimizedFile ? this.optimizedFile.toObject() : undefined,
            optimizationPercent: this.getSizeOptimizationInPercent(),
            created: this.created
        };
    }
}
