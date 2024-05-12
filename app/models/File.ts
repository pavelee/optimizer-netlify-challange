export type FileDTO = {
    key: string;
    name: string;
    fullName?: string;
    size: number;
    extension: string;
    sizeInKB?: number;
    sizeInMB?: number;
    sizeInGB?: number;
};

export class File {
    constructor(
        private readonly key: string,
        private name: string,
        private readonly size: number,
        private readonly extension
    ) {}

    public getKey(): string {
        return this.key;
    }

    public getName(): string {
        return this.name;
    }

    public getFullName(): string {
        return `${this.name}.${this.extension}`;
    }

    public getSize(): number {
        return this.size;
    }

    public getExtension(): string {
        return this.extension;
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

    toObject(): FileDTO {
        return {
            key: this.getKey(),
            name: this.getName(),
            fullName: this.getFullName(),
            size: this.getSize(),
            extension: this.getExtension(),
            sizeInKB: this.getRoundedSizeIn('KB'),
            sizeInMB: this.getRoundedSizeIn('MB'),
            sizeInGB: this.getRoundedSizeIn('GB')
        };
    }
}
