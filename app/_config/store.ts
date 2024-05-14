import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetDTO } from 'app/models/Asset';
import { NetlifyBlobStore, NetlifyJsonStore } from 'app/utils/store/NetlifyStore';

export const BlobStore = new NetlifyBlobStore('images');
export const JsonStore = new NetlifyJsonStore<AssetDTO | null>('data');
export const AssetGroupStore = new NetlifyJsonStore<AssetGroupDto | null>('assetGroups');
