import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetDTO } from 'app/models/Asset';
import { NetiflyBlobStore, NetiflyJsonStore } from 'app/utils/store/NeriflyStore';

export const BlobStore = new NetiflyBlobStore('images');
export const JsonStore = new NetiflyJsonStore<AssetDTO>('data');
export const AssetGroupStore = new NetiflyJsonStore<AssetGroupDto>('assetGroups');
