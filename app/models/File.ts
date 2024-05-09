export type FileDTO = {
    key: string;
    size: number;
    sizeInKB?: number;
    sizeInMB?: number;
    sizeInGB?: number;
};

export class File {
    constructor(private readonly key: string, private readonly size: number) {}

    public getKey(): string {
        return this.key;
    }

    public getSize(): number {
        return this.size;
    }

    public getSizeIn(unit: string): number {
        switch (unit) {
            case 'KB':
                return this.size / 1024;
            case 'MB':
                return this.size / 1024 / 1024;
            case 'GB':
                return this.size / 1024 / 1024 / 1024;
            default:
                return this.size;
        }
    }

    public getRoundedSizeIn(unit: string): number {
        return Math.round(this.getSizeIn(unit) * 100) / 100;
    }

    toObject() {
        return {
            key: this.key,
            size: this.size,
            sizeInKB: this.getRoundedSizeIn('KB'),
            sizeInMB: this.getRoundedSizeIn('MB'),
            sizeInGB: this.getRoundedSizeIn('GB')
        };
    }
}
