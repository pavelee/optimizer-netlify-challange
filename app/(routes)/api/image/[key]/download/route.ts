import { BlobStore, JsonStore } from 'app/_config/store';
import { File, FileDTO } from 'app/models/File';
import { AssetRepository } from 'app/repository/AssetRepository';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        key: string;
    };
};

export const GET = async (request: NextRequest, props: props) => {
    const cookie = cookies();
    const { key } = props.params;
    const ar = new AssetRepository();
    let image: File | null = await ar.findFile(key);

    if (!image) {
        throw new Error('Image not found');
    }

    const blob = await BlobStore.get(key);
    const response = new NextResponse(blob);
    const extension = image.getExtension();
    const filename = `${key}.${extension}`;
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return response;
};
