import { getStore } from '@netlify/blobs';

export const store = () => {
    return getStore({ name: 'images', consistency: 'strong' });
};
