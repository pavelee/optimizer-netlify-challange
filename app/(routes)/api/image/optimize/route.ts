import { AssetsService } from 'app/services/AssetsService';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const form = await request.formData();
    const file = form.get('file') as Blob;
    const groupId = form.get('groupId') as string | undefined;
    const fileName = form.get('fileName') as string | undefined;
    const quality = form.get('q') as string | undefined;

    const maxSize = 8 * 1024 * 1024; // 8 MB
    if (file.size > maxSize) {
        return NextResponse.json({
            error: 'File is too large, maximum size is 8 MB.'
        }, {
            status: 400
        })
    }

    const as = new AssetsService();
    const asset = await as.createAsset(file, fileName);
    if (groupId) {
        const group = await as.getAssetGroup(groupId);
        await as.addAssetToGroup(group, asset);
    }

    let q = parseInt(quality);
    if (isNaN(q) || q < 1 || q > 100) {
        q = 75;
    }

    await as.optimizeAsset(asset, q);

    return NextResponse.json(asset.toObject());
};
