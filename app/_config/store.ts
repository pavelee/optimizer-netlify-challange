import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetDTO } from 'app/models/Asset';
import { NetlifyBlobStore, NetlifyJsonStore } from 'app/utils/store/NetlifyStore';

export const BlobStore = new NetlifyBlobStore('images1');
export const JsonStore = new NetlifyJsonStore<AssetDTO>('data1');
export const AssetGroupStore = new NetlifyJsonStore<AssetGroupDto>('assetGroups2');
