import { File } from './File';

export class Asset {
    public constructor(private originalFile: File, private optimizedFile: File) {}

    public getOriginalFile(): File {
        return this.originalFile;
    }

    public getOptimizedFile(): File {
        return this.optimizedFile;
    }
}
