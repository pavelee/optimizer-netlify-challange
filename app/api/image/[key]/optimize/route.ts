import { optimizeImage } from 'app/actions/optimizeImage';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        key: string;
    };
};

export const GET = async (request: NextRequest, props: props) => {
    const blob = await optimizeImage(props.params.key);
    return new NextResponse(blob);
};
