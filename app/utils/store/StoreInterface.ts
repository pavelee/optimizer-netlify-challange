export interface StoreInterface<T> {
    save(key: string, data: T): Promise<T>;
    get(key: string): Promise<T>;
    list(): Promise<T[]>;
}
