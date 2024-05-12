import { AssetsService } from 'app/services/AssetsService';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const form = await request.formData();
    const file = form.get('file') as Blob;
    const groupId = form.get('groupId') as string | undefined;
    const fileName = form.get('fileName') as string | undefined;

    const as = new AssetsService();
    const asset = await as.createAsset(file, fileName);
    if (groupId) {
        const group = await as.getAssetGroup(groupId);
        await as.addAssetToGroup(group, asset);
    }
    await as.optimizeAsset(asset);

    return NextResponse.json(asset.toObject());
};
