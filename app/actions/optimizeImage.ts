'use server';

import { AssetRepository } from 'app/repository/AssetRepository';
import { headers } from 'next/headers';

export const optimizeImage = async (key: string, q?: string, f?: string, h?: string) => {
    const head = headers();
    const ar = new AssetRepository();
    const image = await ar.findFile(key);
    let host = head.get('host');
    if (h) {
        host = h;
    }
    const isProd = process.env.NODE_ENV === 'production';
    let protocol = 'http';
    if (isProd) {
        protocol = 'https';
    }
    const url = `/api/image/${key}`;

    const quality = q || '75';
    let format = image?.getExtension();
    if (f) {
        format = f;
    }


    const optimizedUrl = `${protocol}://${host}/.netlify/images?url=${encodeURIComponent(
        url
    )}&q=${quality}&fm=${format}`;

    const fetchResponse = await fetch(optimizedUrl);

    const blob = await fetchResponse.blob();

    return blob;
};
