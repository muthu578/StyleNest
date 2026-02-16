import robots from '../robots';
import sitemap from '../sitemap';

describe('Metadata Functions', () => {
    describe('robots', () => {
        it('returns correct robots configuration', () => {
            const config = robots();
            expect(config.rules.userAgent).toBe('*');
            expect(config.rules.allow).toBe('/');
            expect(config.rules.disallow).toContain('/profile');
            expect(config.sitemap).toBe('https://stylenest-trendora.vercel.app/sitemap.xml');
        });
    });

    describe('sitemap', () => {
        it('returns correct sitemap configuration', () => {
            const config = sitemap();
            expect(config.length).toBeGreaterThan(0);

            const urls = config.map(item => item.url);
            expect(urls).toContain('https://stylenest-trendora.vercel.app');
            expect(urls).toContain('https://stylenest-trendora.vercel.app/products');

            expect(config[0].priority).toBe(1);
            expect(config[1].priority).toBe(0.8);
        });
    });
});
