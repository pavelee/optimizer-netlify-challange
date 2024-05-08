import { Store, getStore } from '@netlify/blobs';
import { StoreInterface } from './StoreInterface';

export class NetiflyBlobStore implements StoreInterface<Blob | string> {
    private store: Store;

    constructor(private storeName: string, consistency = 'strong') {
        // @ts-ignore
        this.store = getStore({ name: storeName, consistency: consistency });
    }

    public async save(key: string, data: Blob): Promise<Blob> {
        if (data instanceof Blob) {
            await this.store.set(key, data);
        }
        await this.store.set(key, JSON.stringify(data));
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

export class NetiflyJsonStore implements StoreInterface<Record<string, unknown>> {
    private store: Store;

    constructor(private storeName: string, consistency = 'strong') {
        // @ts-ignore
        this.store = getStore({ name: storeName, consistency: consistency });
    }

    public async save(key: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
        await this.store.set(key, JSON.stringify(data));
        return data;
    }

    public async get(key: string): Promise<Record<string, unknown>> {
        const data = await this.store.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return {};
    }

    public async list(): Promise<Record<string, unknown>[]> {
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
