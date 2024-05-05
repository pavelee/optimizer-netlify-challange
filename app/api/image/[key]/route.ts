import { getImage } from 'app/actions/getImage';
import { store } from 'app/utils/store';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        key: string;
    };
};

export const GET = async (request: NextRequest, props: props) => {
    const { key } = props.params;
    const blob = await store().get(key, {
        type: 'blob'
    });

    console.log(blob);
    const b = new Blob([blob], { type: 'image/png' });
    console.log(b);

    return new NextResponse(b, {
        headers: {
            'Content-Type': 'image/png'
        }
    });

    return new Response(blob, {
        headers: {
            'Content-Type': 'image/png'
        }
    });
};
