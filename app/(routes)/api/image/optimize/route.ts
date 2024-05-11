import { AssetsService } from 'app/services/AssetsService';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const form = await request.formData();
    const file = form.get('file') as Blob;

    const as = new AssetsService();
    const asset = await as.createAsset(file);
    await as.optimizeAsset(asset);

    return NextResponse.json(asset.toObject());
};
