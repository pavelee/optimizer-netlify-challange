'use server';

import { getImages } from './getImages';
import { putImage } from './putImage';

export const uploadImage = async (formData: FormData) => {
    const file = formData.get('file') as File;
    console.log(file);
    const hash = '8mtsvc'; // Math.random().toString(36).substring(7);
    await putImage(hash, file);
    const images = await getImages();
    console.log(images);
};
