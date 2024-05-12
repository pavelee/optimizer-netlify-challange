import { AssetsService } from 'app/services/AssetsService';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        id: string;
    };
};

export const GET = async (request: NextRequest, params: props) => {
    const { id } = params.params;

    const as = new AssetsService();
    const group = await as.getAssetGroup(id);

    return NextResponse.json(group.toObject());
};
