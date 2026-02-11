const axios = require('axios');

const urls = [
    // Kids
    'https://images.unsplash.com/photo-1519238263496-6361937a4ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1519457715201-447b1f618705?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Girl
    'https://images.unsplash.com/photo-1514336058097-4b711822c60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    // Women
    'https://images.unsplash.com/photo-1596783074918-c84cb06c9ca8', // Ethnic
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae', // Maxi Dress
    // Home
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    // Beauty
    'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
];

async function checkImages() {
    for (let i = 0; i < urls.length; i++) {
        try {
            const response = await axios.head(urls[i]);
            console.log(`[${response.status}] ${urls[i]}`);
        } catch (error) {
            console.log(`[${error.response ? error.response.status : error.code}] ${urls[i]}`);
        }
    }
}

checkImages();
