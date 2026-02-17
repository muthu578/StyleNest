const axios = require('axios');

const KOHLS_API_URL = 'https://kohls.p.rapidapi.com';
const RAPID_API_KEY = 'd269ac0e09msh186419b293693afp1ace98jsn867b286def58';
const RAPID_API_HOST = 'kohls.p.rapidapi.com';

const rapidApiConfig = {
    headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': RAPID_API_HOST
    }
};

async function test() {
    try {
        const response = await axios.get(`${KOHLS_API_URL}/products/detail`, {
            ...rapidApiConfig,
            params: {
                webID: 6033631
            }
        });

        const p = response.data.payload.products[0];
        if (p && p.images) {
            console.log('Images[0] keys:', Object.keys(p.images[0]));
            if (p.images[0].url) console.log('Images[0] url:', p.images[0].url);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

test();
