import { File } from './File';

export class Asset {
    private optimizedFile: File;

    public constructor(private originalFile: File) {}

    public getOriginalFile(): File {
        return this.originalFile;
    }

    public getOptimizedFile(): File {
        return this.optimizedFile;
    }
}
