'use server';

import { store } from 'app/utils/store';

export const getImages = async () => {
    const data = await store().list();
    const keys = data.blobs.map(({ key }) => key);
    return keys;
};
