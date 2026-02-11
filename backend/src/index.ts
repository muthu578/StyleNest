import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DUMMY_JSON_URL = 'https://dummyjson.com';

app.use(cors());
app.use(express.json());

// Local Mock Data for Enhanced Categories
const LOCAL_PRODUCTS = [
  // Kids
  {
    id: 101,
    title: 'Kids Graphic Print T-Shirt',
    description: 'Comfortable cotton t-shirt with cool graphic prints for boys.',
    price: 12.99,
    discountPercentage: 15.0,
    rating: 4.5,
    stock: 50,
    brand: 'KidzStyle',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/boy,shirt/all',
    images: ['https://loremflickr.com/500/500/boy,shirt/all']
  },
  {
    id: 102,
    title: 'Girls Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer outings.',
    price: 24.99,
    discountPercentage: 10.0,
    rating: 4.8,
    stock: 30,
    brand: 'LittleAngle',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/girl,dress/all',
    images: ['https://loremflickr.com/500/500/girl,dress/all']
  },
  {
    id: 103,
    title: 'Kids Denim Jeans',
    description: 'Durable and stylish denim jeans for active kids.',
    price: 19.99,
    discountPercentage: 5.0,
    rating: 4.2,
    stock: 40,
    brand: 'DenimJunior',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/jeans,kid/all',
    images: ['https://loremflickr.com/500/500/jeans,kid/all']
  },
  {
    id: 104,
    title: 'Boys Hooded Sweatshirt',
    description: 'Warm and cozy hoodie for cooler days.',
    price: 29.99,
    discountPercentage: 20.0,
    rating: 4.6,
    stock: 25,
    brand: 'CoolKid',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/hoodie,boy/all',
    images: ['https://loremflickr.com/500/500/hoodie,boy/all']
  },
  {
    id: 105,
    title: 'Modern Kids Jacket',
    description: 'Stylish jacket for trendy kids.',
    price: 34.99,
    discountPercentage: 10.0,
    rating: 4.7,
    stock: 20,
    brand: 'UrbanKids',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/jacket,kid/all',
    images: ['https://loremflickr.com/500/500/jacket,kid/all']
  },
  {
    id: 106,
    title: 'Girl\'s Ethnic Lehenga',
    description: 'Traditional heavy embroidered lehenga for weddings.',
    price: 59.99,
    discountPercentage: 25.0,
    rating: 4.9,
    stock: 15,
    brand: 'EthnicCharm',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/indian,dress,girl/all',
    images: ['https://loremflickr.com/500/500/indian,dress,girl/all']
  },
  {
    id: 107,
    title: 'Kids Sportswear Set',
    description: 'Breathable and comfortable sportswear set for active play.',
    price: 22.99,
    discountPercentage: 5.0,
    rating: 4.4,
    stock: 45,
    brand: 'ActiveJunior',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/sportswear,kid/all',
    images: ['https://loremflickr.com/500/500/sportswear,kid/all']
  },
  {
    id: 108,
    title: 'Casual Print Shorts',
    description: 'Fun and colorful printed shorts for summer fun.',
    price: 14.99,
    discountPercentage: 15.0,
    rating: 4.3,
    stock: 60,
    brand: 'SummerFun',
    category: 'kids',
    thumbnail: 'https://loremflickr.com/500/500/shorts,kid/all',
    images: ['https://loremflickr.com/500/500/shorts,kid/all']
  },
  // Women (Additional)
  {
    id: 201,
    title: 'Women Ethnic Kurta',
    description: 'Traditional embroidered kurta for festive occasions.',
    price: 39.99,
    discountPercentage: 12.0,
    rating: 4.7,
    stock: 60,
    brand: 'EthnicVibes',
    category: 'women',
    thumbnail: 'https://loremflickr.com/500/500/woman,indian,dress/all',
    images: ['https://loremflickr.com/500/500/woman,indian,dress/all']
  },
  {
    id: 202,
    title: 'Women Floral Maxi Dress',
    description: 'Elegant maxi dress with floral patterns.',
    price: 45.99,
    discountPercentage: 15.0,
    rating: 4.9,
    stock: 45,
    brand: 'ChicStyle',
    category: 'women',
    thumbnail: 'https://loremflickr.com/500/500/woman,dress,floral/all',
    images: ['https://loremflickr.com/500/500/woman,dress,floral/all']
  }
];

// Proxy for Products
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let products: any[] = [];
    let url = '';

    // Map frontend categories to DummyJSON categories
    if (category === 'men') {
      url = `${DUMMY_JSON_URL}/products/category/mens-shirts`;
    } else if (category === 'women') {
      url = `${DUMMY_JSON_URL}/products/category/womens-dresses`;
    } else if (category === 'beauty') {
      url = `${DUMMY_JSON_URL}/products/category/beauty`;
    } else if (category === 'home') {
      url = `${DUMMY_JSON_URL}/products/category/home-decoration`;
    } else if (category === 'kids') {
      // Avoid fetching dummyjson for kids to prevent irrelevant items
      url = '';
    } else {
      url = `${DUMMY_JSON_URL}/products?limit=100`;
    }

    if (url) {
      try {
        const response = await axios.get(url);
        if (response.data && response.data.products) {
          products = response.data.products;
        } else if (Array.isArray(response.data)) {
          products = response.data;
        }
      } catch (e) {
        // If specific category fails, don't crash, just log and allow local products to return
        console.error(`External API error for category ${category}:`, e);
      }
    }

    // Merge with LOCAL_PRODUCTS
    if (category) {
      const localItems = LOCAL_PRODUCTS.filter(p => p.category === category);
      products = [...localItems, ...products];
    } else {
      // If no category specified, include all local ones too
      products = [...LOCAL_PRODUCTS, ...products];
    }

    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback
    res.json({ products: LOCAL_PRODUCTS });
  }
});

// Proxy for Single Product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    // Check LOCAL_PRODUCTS first
    const localProduct = LOCAL_PRODUCTS.find(p => p.id === numericId);
    if (localProduct) {
      return res.json(localProduct);
    }

    // Fallback to DummyJSON
    const response = await axios.get(`${DUMMY_JSON_URL}/products/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Proxy for Auth (Login)
app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${DUMMY_JSON_URL}/auth/login`, req.body);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Auth failed' });
  }
});

// Proxy for User Profile (using token)
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization;
    const response = await axios.get(`${DUMMY_JSON_URL}/auth/me`, {
      headers: { Authorization: token || '' }
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to fetch user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
