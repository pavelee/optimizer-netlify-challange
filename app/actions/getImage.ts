'use server';

import { BlobStore } from 'app/_config/store';

export const getImage = async (key: string) => {
    const image = await BlobStore.get(key);

    if (!image) {
        throw new Error('Image not found'); 
    }

    return image;
};
