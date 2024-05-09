'use server';

import { BlobStore } from 'app/_config/store';

export const getImages = async () => {
    const data = await BlobStore.list();
    return data;
};
