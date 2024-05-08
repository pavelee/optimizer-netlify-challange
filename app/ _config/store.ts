import { NetiflyBlobStore, NetiflyJsonStore } from 'app/utils/store/NeriflyStore';

export const BlobStore = new NetiflyBlobStore('images');
export const JsonStore = new NetiflyJsonStore('data');
