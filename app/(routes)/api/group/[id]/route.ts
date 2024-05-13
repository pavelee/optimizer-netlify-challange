import { AssetGroupFactory } from 'app/factories/AssetGroupFactory';
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
    const g = await as.getAssetGroup(id);
    const g1 = await AssetGroupFactory.createFromDto(g.toObject());

    return NextResponse.json(g1.toObject());
};
