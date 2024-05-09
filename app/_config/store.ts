import { AssetDTO } from 'app/models/Asset';
import { NetiflyBlobStore, NetiflyJsonStore } from 'app/utils/store/NeriflyStore';

export const BlobStore = new NetiflyBlobStore('images');
export const JsonStore = new NetiflyJsonStore<AssetDTO>('data');
