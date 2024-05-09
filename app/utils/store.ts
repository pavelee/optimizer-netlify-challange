'use server'

import { getStore } from '@netlify/blobs';

export const store = (name: string = 'images') => {
    return getStore({ name, consistency: 'strong' });
};
