import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { AssetDTO } from 'app/models/Asset';
import { NetlifyBlobStore, NetlifyJsonStore } from 'app/utils/store/NetlifyStore';

export const BlobStore = new NetlifyBlobStore('img');
export const JsonStore = new NetlifyJsonStore<AssetDTO>('dat');
export const AssetGroupStore = new NetlifyJsonStore<AssetGroupDto>('groups');
