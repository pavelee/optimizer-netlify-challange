'use server';

import { store } from 'app/utils/store';

export const getImage = async (key: string) => {
    const image = await store().get(key);

    if (!image) {
        throw new Error('Image not found'); 
    }

    return image;

    const blob = new Blob([image], { type: 'image/png' });
    return blob;
};
