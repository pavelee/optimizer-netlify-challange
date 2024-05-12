'use server';

import { headers } from 'next/headers';

export const optimizeImage = async (key: string) => {
    const head = headers();
    const host = head.get('host');
    const isProd = process.env.NODE_ENV === 'production';
    let protocol = 'http';
    if (isProd) {
        protocol = 'https';
    }
    const url = `/api/image/${key}`;
    const optimizedUrl = `${protocol}://${host}/.netlify/images?url=${encodeURIComponent(url)}&q=50`;

    const fetchResponse = await fetch(optimizedUrl);

    const blob = await fetchResponse.blob();

    return blob;
};
