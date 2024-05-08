'use server';

import { redirect } from 'next/navigation';
import { optimizeImage } from './optimizeImage';
import { putImage } from './putImage';
import { uploadImage } from './uploadImage';
import { AssetsService } from 'app/services/AssetsService';

export const uploadImageAndOptimize = async (formData: FormData) => {
    const file = formData.get('file') as File;
    const as = new AssetsService();
    await as.createAsset(file);
    // const hash = await uploadImage(file);
    // const optimizedImage = await optimizeImage(hash);
    // const opitmizedHash = await putImage(hash, optimizedImage);
    redirect('/');
};
