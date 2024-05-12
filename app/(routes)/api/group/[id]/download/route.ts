import { BlobStore } from 'app/_config/store';
import { AssetsService } from 'app/services/AssetsService';
import JSZip from 'jszip';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        id: string;
    };
};

export const GET = async (request: NextRequest, params: props) => {
    const { id } = params.params;
    const zip = new JSZip();

    const as = new AssetsService();
    const group = await as.getAssetGroup(id);

    const blobs = [];
    for (const asset of group.getAssets()) {
        const blob = await BlobStore.get(asset.getOptimizedFile().getKey());
        zip.file(asset.getOriginalFile().getFullName(), blob.arrayBuffer());
    }

    const blob = await zip.generateAsync({ type: 'blob' });

    return new NextResponse(blob);
};
