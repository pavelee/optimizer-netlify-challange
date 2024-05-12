import { AssetsService } from 'app/services/AssetsService';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const body = await request.json();

    const { assets } = body;

    const as = new AssetsService();
    const group = await as.createAssetGroup();

    return NextResponse.json(group.toObject());
};
