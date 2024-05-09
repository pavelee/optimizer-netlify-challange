'use server';

import { redirect } from 'next/navigation';
import { AssetsService } from 'app/services/AssetsService';

export const uploadImageAndOptimize = async (formData: FormData) => {
    const file = formData.get('file') as File;
    const as = new AssetsService();
    const asset = await as.createAsset(file);
    await as.optimizeAsset(asset);
    redirect('/');
};
