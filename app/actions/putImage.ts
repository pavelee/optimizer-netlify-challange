'use server';

import { BlobStore } from 'app/_config/store';

export const putImage = async (key: string, image: Blob) => {
    await BlobStore.save(key, image);
};
