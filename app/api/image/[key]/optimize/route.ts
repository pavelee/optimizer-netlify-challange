import { getImage } from 'app/actions/getImage';
import { store } from 'app/utils/store';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type props = {
    params: {
        key: string;
    };
};

export const GET = async (request: NextRequest, props: props) => {
    const head = headers();
    const { key } = props.params;

    const host = head.get('host');
    const url = `/api/image/${key}`;
    const optimizedUrl = `http://${host}/.netlify/images?url=${encodeURIComponent(url)}&q=100&fm=webp`;

    const fetchResponse = await fetch(optimizedUrl);

    const blob = await fetchResponse.blob();

    return new NextResponse(blob, {
        headers: {
            'Content-Type': 'image/png'
        }
    });
};
