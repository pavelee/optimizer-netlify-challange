import { Store, getStore } from '@netlify/blobs';
import { StoreInterface } from './StoreInterface';

export class NetiflyBlobStore implements StoreInterface<Blob | string> {
    private store: Store;

    constructor(private storeName: string, consistency = 'strong') {
        // @ts-ignore
        this.store = getStore({ name: storeName, consistency: consistency });
    }

    public async save(key: string, data: Blob): Promise<Blob> {
        await this.store.set(key, data);
        return data;
    }

    public async get(key: string): Promise<Blob> {
        return await this.store.get(key, {
            type: 'blob'
        });
    }

    public async list(): Promise<string[]> {
        const list = await this.store.list();
        // const result = [];
        const result = Promise.all(
            list.blobs.map(async (blob) => {
                // const d = await this.get('8mtsvc');
                return blob.key;
            })
        );
        return result;
    }
}

export class NetiflyJsonStore<T> implements StoreInterface<T> {
    private store: Store;

    constructor(private storeName: string, consistency = 'strong') {
        // @ts-ignore
        this.store = getStore({ name: storeName, consistency: consistency });
    }

    public async save(key: string, data: T): Promise<T> {
        await this.store.set(key, JSON.stringify(data));
        return data;
    }

    public async get(key: string): Promise<T> {
        const data = await this.store.get(key);
        if (data) {
            return JSON.parse(data);
        }
        throw new Error('Data not found');
    }

    public async list(): Promise<T[]> {
        const list = await this.store.list();
        const result = Promise.all(
            list.blobs.map(async (blob) => {
                const d = await this.get(blob.key);
                return d;
            })
        );
        return result;
    }
}
