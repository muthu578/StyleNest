const axios = require('axios');
const fs = require('fs');

async function searchUnsplash(query) {
    try {
        const url = `https://unsplash.com/s/photos/${query}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Use simpler string matching or improved regex because the HTML is complex
        const regex = /photo-([a-zA-Z0-9_-]{11})/g;
        let match;
        const matches = [];
        while ((match = regex.exec(response.data)) !== null) {
            matches.push(match[1]);
        }

        const uniqueIds = [...new Set(matches)].slice(0, 5);
        console.log(`IDs for ${query}:`, uniqueIds);
        return uniqueIds;
    } catch (error) {
        console.error(`Error searching ${query}:`, error.message);
        return [];
    }
}

async function run() {
    await searchUnsplash('kids-t-shirt');
    await searchUnsplash('girls-floral-dress');
    await searchUnsplash('kids-jeans');
    await searchUnsplash('boys-hoodie');
    await searchUnsplash('kids-jacket');
    await searchUnsplash('ethnic-wear-kids');
    await searchUnsplash('kids-sportswear');
    await searchUnsplash('kids-shorts');
    await searchUnsplash('women-kurta');
    await searchUnsplash('women-floral-dress');
}

run();
