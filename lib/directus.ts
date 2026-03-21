import { createDirectus, rest, staticToken } from '@directus/sdk';

const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const token = process.env.DIRECTUS_STATIC_TOKEN;

/**
 * Directus istemcisini (client) oluşturur.
 * Eğer DIRECTUS_STATIC_TOKEN varsa, yetkilendirme ile oluşturur.
 */
let client = createDirectus(url).with(rest());

if (token) {
    client = client.with(staticToken(token));
}

export default client;

export const getAssetsUrl = (id: string) => {
    return `${url}/assets/${id}`;
};
