import { File, FileDTO } from './File';

export type AssetDTO = {
    id: string;
    created: Date;
    originalFile: FileDTO;
    optimizedFile?: FileDTO;
    optimizationPercent?: number;
    reductionInKb?: number;
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

    private round(value: number, decimals: number) {
        return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
    }

    public getSizeReductionIn(unit: 'KB' | 'MB' | 'B' = 'KB') {
        if (!this.optimizedFile) {
            return 0;
        }
        const size = Math.round(this.originalFile.getSize() - this.optimizedFile.getSize()) * 100;
        switch (unit) {
            case 'B':
                return this.round(size, 0);
            case 'KB':
                return this.round(size / 1024, 0);
            case 'MB':
                return this.round(size / 1024 / 1024, 0);
            default:
                throw new Error('Invalid unit');
        }
    }

    toObject(): AssetDTO {
        return {
            id: this.id,
            originalFile: this.originalFile.toObject(),
            optimizedFile: this.optimizedFile ? this.optimizedFile.toObject() : undefined,
            optimizationPercent: this.getSizeOptimizationInPercent(),
            reductionInKb: this.getSizeReductionIn('KB'),
            created: this.created
        };
    }
}
