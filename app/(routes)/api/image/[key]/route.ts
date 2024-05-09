import { BlobStore } from 'app/_config/store';
import { getImage } from 'app/actions/getImage';
import { store } from 'app/utils/store';
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
    const blob = await BlobStore.get(key);
    return new NextResponse(blob);
};
