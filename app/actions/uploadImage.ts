'use server';

import { putImage } from './putImage';

export const uploadImage = async (file: File) => {
    const hash = Math.random().toString(36).substring(7);
    await putImage(hash, file);
    return hash;
};
