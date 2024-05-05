'use server';

import { store } from 'app/utils/store';

export const putImage = async (key: string, image: Blob) => {
    console.log(image);
    await store().set(key, image);
};
