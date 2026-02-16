import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/profile', '/orders', '/cart', '/checkout'],
        },
        sitemap: 'https://stylenest-trendora.vercel.app/sitemap.xml',
    };
}
