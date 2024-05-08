export type FileDTO = {
    key: string;
    size: number;
}; 

export class File {
    constructor(private readonly key: string, private readonly size: number) {}

    public getKey(): string {
        return this.key;
    }

    public getSize(): number {
        return this.size;
    }

    toObject() {
        return {
            key: this.key,
            size: this.size
        };
    }
}
