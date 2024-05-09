import { getStore } from '@netlify/blobs';

export const store = (storeName: string) => {
    return getStore({
        name: storeName,
        consistency: 'strong',
        siteID: process.env.SITE_ID,
        token: process.env.API_TOKEN
    });
};
