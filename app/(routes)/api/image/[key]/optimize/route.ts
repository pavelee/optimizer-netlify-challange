import { optimizeImage } from 'app/actions/optimizeImage';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        key: string;
    };
};

export const GET = async (request: NextRequest, props: props) => {
    const sp = request.nextUrl.searchParams;
    const q = sp.get('q');
    const fm = sp.get('fm');
    const h = sp.get('h');
    const blob = await optimizeImage(props.params.key, q, fm, h);
    return new NextResponse(blob);
};
