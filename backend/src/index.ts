import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DUMMY_JSON_URL = 'https://dummyjson.com';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-key-123';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key-456';
const USERS_FILE = path.join(__dirname, '../data/users.json');
const ORDERS_FILE = path.join(__dirname, '../data/orders.json');

app.use(cors());
app.use(express.json());

// --- User Management Helpers ---

interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  image?: string;
}

const getUsers = (): User[] => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data || '[]');
};

const saveUsers = (users: User[]) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// --- Order Management Helpers ---

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  shippingAddress: any;
}

const getOrders = (): Order[] => {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
  return JSON.parse(data || '[]');
};

const saveOrders = (orders: Order[]) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// --- Middleware ---

const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- Mock Products Data ---

const LOCAL_PRODUCTS = [
  // Kids
  { id: 101, title: 'Kids Graphic Print T-Shirt', description: 'Comfortable cotton t-shirt with cool graphic prints for boys.', price: 12.99, discountPercentage: 15.0, rating: 4.5, stock: 50, brand: 'KidzStyle', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=500'] },
  { id: 102, title: 'Girls Floral Summer Dress', description: 'Beautiful floral print dress perfect for summer outings.', price: 24.99, discountPercentage: 10.0, rating: 4.8, stock: 30, brand: 'LittleAngle', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=format&fit=crop&w=500'] },
  { id: 103, title: 'Kids Denim Jeans', description: 'Durable and stylish denim jeans for active kids.', price: 19.99, discountPercentage: 5.0, rating: 4.2, stock: 40, brand: 'DenimJunior', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=500'] },
  { id: 104, title: 'Boys Hooded Sweatshirt', description: 'Warm and cozy hoodie for cooler days.', price: 29.99, discountPercentage: 20.0, rating: 4.6, stock: 25, brand: 'CoolKid', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=format&fit=crop&w=500'] },
  { id: 105, title: 'Modern Kids Jacket', description: 'Stylish jacket for trendy kids.', price: 34.99, discountPercentage: 10.0, rating: 4.7, stock: 20, brand: 'UrbanKids', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1619702/pexels-photo-1619702.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1619702/pexels-photo-1619702.jpeg?auto=format&fit=crop&w=500'] },
  { id: 106, title: 'Girl\'s Ethnic Lehenga', description: 'Traditional heavy embroidered lehenga for weddings.', price: 59.99, discountPercentage: 25.0, rating: 4.9, stock: 15, brand: 'EthnicCharm', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1484439/pexels-photo-1484439.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1484439/pexels-photo-1484439.jpeg?auto=format&fit=crop&w=500'] },
  { id: 107, title: 'Kids Sportswear Set', description: 'Breathable and comfortable sportswear set for active play.', price: 22.99, discountPercentage: 5.0, rating: 4.4, stock: 45, brand: 'ActiveJunior', category: 'kids', thumbnail: 'https://images.pexels.com/photos/3662839/pexels-photo-3662839.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/3662839/pexels-photo-3662839.jpeg?auto=format&fit=crop&w=500'] },
  { id: 108, title: 'Casual Print Shorts', description: 'Fun and colorful printed shorts for summer fun.', price: 14.99, discountPercentage: 15.0, rating: 4.3, stock: 60, brand: 'SummerFun', category: 'kids', thumbnail: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=500'] },
  { id: 201, title: 'Women Ethnic Kurta', description: 'Traditional embroidered kurta for festive occasions.', price: 39.99, discountPercentage: 12.0, rating: 4.7, stock: 60, brand: 'EthnicVibes', category: 'women', thumbnail: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=500'] },
  { id: 202, title: 'Women Floral Maxi Dress', description: 'Elegant maxi dress with floral patterns.', price: 45.99, discountPercentage: 15.0, rating: 4.9, stock: 45, brand: 'ChicStyle', category: 'women', thumbnail: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=500'] },
  { id: 301, title: 'Men Checkered Shirt', description: 'Classic checkered shirt for casual wear.', price: 29.99, discountPercentage: 20.0, rating: 4.5, stock: 50, brand: 'UrbanMen', category: 'men', thumbnail: 'https://images.pexels.com/photos/1040851/pexels-photo-1040851.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1040851/pexels-photo-1040851.jpeg?auto=format&fit=crop&w=500'] },
  { id: 302, title: 'Men Slim Fit Jeans', description: 'Stylish slim fit jeans with stretch fabric.', price: 49.99, discountPercentage: 10.0, rating: 4.6, stock: 40, brand: 'DenimCo', category: 'men', thumbnail: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=format&fit=crop&w=500'] },
  { id: 303, title: 'Men Polo T-Shirt', description: 'Comfortable cotton polo t-shirt.', price: 19.99, discountPercentage: 15.0, rating: 4.4, stock: 60, brand: 'PoloClub', category: 'men', thumbnail: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=500', images: ['https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=500'] }
];

const CATEGORIES_OPTS = ['shirt', 'jeans', 'tshirt', 'jacket', 'shoes', 'watch', 'suit', 'shorts'];
const ADJECTIVES = ['Classic', 'Modern', 'Urban', 'Slim Fit', 'Casual', 'Formal', 'Trendy', 'Premium'];
const BRANDS_OPTS = ['UrbanMen', 'DenimCo', 'PoloClub', 'StyleMaster', 'VogueMan', 'EliteWear'];

const MEN_PRODUCTS = Array.from({ length: 50 }).map((_, i) => {
  const category = CATEGORIES_OPTS[i % CATEGORIES_OPTS.length] || 'shirt';
  const adjective = ADJECTIVES[i % ADJECTIVES.length] || 'Classic';
  const brand = BRANDS_OPTS[i % BRANDS_OPTS.length] || 'UrbanMen';
  const imageId = [
    'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    'https://images.pexels.com/photos/1040851/pexels-photo-1040851.jpeg',
    'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
    'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
  ][i % 6];
  return {
    id: 304 + i, title: `${adjective} Men's ${category.charAt(0).toUpperCase() + category.slice(1)}`, description: `A ${adjective.toLowerCase()} ${category} for the modern man. Perfect for any occasion.`, price: parseFloat((19.99 + (i * 1.5)).toFixed(2)), discountPercentage: 10 + (i % 40), rating: 4.0 + (i % 10) / 10, stock: 20 + i, brand: brand, category: 'men', thumbnail: `${imageId}?auto=format&fit=crop&w=500`, images: [`${imageId}?auto=format&fit=crop&w=500`]
  };
});

const WOMEN_CATEGORIES = ['dress', 'top', 'skirt', 'heels', 'handbag', 'jewelry', 'sandals', 'scarf'];
const WOMEN_ADJECTIVES = ['Elegant', 'Chic', 'Floral', 'Bohemian', 'Silk', 'Velvet', 'Designer', 'Summer'];
const WOMEN_BRANDS = ['ChicStyle', 'EthnicVibes', 'Zara', 'H&M', 'VeroModa', 'Only'];

const WOMEN_PRODUCTS = Array.from({ length: 50 }).map((_, i) => {
  const category = WOMEN_CATEGORIES[i % WOMEN_CATEGORIES.length] || 'dress';
  const adjective = WOMEN_ADJECTIVES[i % WOMEN_ADJECTIVES.length] || 'Elegant';
  const brand = WOMEN_BRANDS[i % WOMEN_BRANDS.length] || 'ChicStyle';
  const imageId = [
    'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg',
    'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg',
    'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
    'https://images.pexels.com/photos/1036620/pexels-photo-1036620.jpeg',
    'https://images.pexels.com/photos/1353503/pexels-photo-1353503.jpeg',
    'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg'
  ][i % 6];
  return {
    id: 203 + i, title: `${adjective} Women's ${category.charAt(0).toUpperCase() + category.slice(1)}`, description: `A beautiful ${adjective.toLowerCase()} ${category} designed for the modern woman.`, price: parseFloat((24.99 + (i * 2)).toFixed(2)), discountPercentage: 5 + (i % 50), rating: 4.2 + (i % 8) / 10, stock: 15 + i, brand: brand, category: 'women', thumbnail: `${imageId}?auto=format&fit=crop&w=500`, images: [`${imageId}?auto=format&fit=crop&w=500`]
  };
});

LOCAL_PRODUCTS.push(...MEN_PRODUCTS, ...WOMEN_PRODUCTS);

// --- Auth Routes ---

const generateTokens = (user: any) => {
  const accessToken = jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    const users = getUsers();
    if (users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() ||
      u.username.toLowerCase() === username.toLowerCase()
    )) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: User = { id: Date.now(), username, email, passwordHash, firstName: username, image: `https://robohash.org/${username}.png` };
    users.push(newUser);
    saveUsers(users);

    const tokens = generateTokens(newUser);
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ ...userWithoutPassword, ...tokens });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const users = getUsers();

    // Support login with either username or email (case-insensitive)
    const user = users.find(u =>
      u.username.toLowerCase() === username.toLowerCase() ||
      u.email.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const tokens = generateTokens(user);
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, ...tokens });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });
    const accessToken = jwt.sign({ id: decoded.id, username: decoded.username }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
});

app.get('/api/auth/me', authenticateToken, (req: any, res) => {
  const users = getUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { passwordHash: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// --- Product Routes (Protected) ---

app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  let externalProducts: any[] = [];
  const urls: string[] = [];

  if (category === 'men') {
    urls.push(`${DUMMY_JSON_URL}/products/category/mens-shirts`);
    urls.push(`${DUMMY_JSON_URL}/products/category/mens-shoes`);
    urls.push(`${DUMMY_JSON_URL}/products/category/mens-watches`);
  } else if (category === 'women') {
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-dresses`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-shoes`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-watches`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-bags`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-jewellery`);
  } else if (category === 'beauty') {
    urls.push(`${DUMMY_JSON_URL}/products/category/beauty`);
    urls.push(`${DUMMY_JSON_URL}/products/category/fragrances`);
    urls.push(`${DUMMY_JSON_URL}/products/category/skin-care`);
  } else if (category === 'home') {
    urls.push(`${DUMMY_JSON_URL}/products/category/home-decoration`);
    urls.push(`${DUMMY_JSON_URL}/products/category/furniture`);
  } else if (category === 'accessories') {
    urls.push(`${DUMMY_JSON_URL}/products/category/sunglasses`);
    urls.push(`${DUMMY_JSON_URL}/products/category/mens-watches`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-watches`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-bags`);
    urls.push(`${DUMMY_JSON_URL}/products/category/womens-jewellery`);
  } else if (category !== 'kids') {
    urls.push(`${DUMMY_JSON_URL}/products?limit=100`);
  }

  if (urls.length > 0) {
    try {
      const responses = await Promise.all(
        urls.map(url =>
          axios.get(url)
            .then(res => res.data.products || res.data || [])
            .catch(err => {
              console.error(`Error fetching ${url}:`, err.message);
              return [];
            })
        )
      );

      responses.forEach(items => {
        const processedItems = (Array.isArray(items) ? items : []).map((p: any) => ({
          ...p,
          id: p.id + 1000 // Offset to avoid collision with local items
        }));
        externalProducts = [...externalProducts, ...processedItems];
      });
    } catch (e) {
      console.error('Fatal error in products fetch:', e);
    }
  }

  const localItems = category ? LOCAL_PRODUCTS.filter(p => p.category === category) : LOCAL_PRODUCTS;

  // Combine all items and deduplicate by ID
  const allProducts = [...localItems, ...externalProducts];
  const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());

  // Shuffle for variety
  const finalProducts = uniqueProducts.sort(() => Math.random() - 0.5);

  res.json({ products: finalProducts });
});

app.get('/api/products/:id', async (req, res) => {
  const numericId = parseInt(req.params.id, 10);

  // Check local products first
  const localProduct = LOCAL_PRODUCTS.find(p => p.id === numericId);
  if (localProduct) return res.json(localProduct);

  // If not found and ID is high, it's likely an external product with our offset
  try {
    const originalId = numericId >= 1000 ? numericId - 1000 : numericId;
    const response = await axios.get(`${DUMMY_JSON_URL}/products/${originalId}`);

    // Add the offset back to the response ID to maintain consistency
    const product = {
      ...response.data,
      id: response.data.id + 1000
    };
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

// --- Order Routes ---

app.post('/api/orders', authenticateToken, (req: any, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const orders = getOrders();
    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      status: 'Delivered', // Default to delivered for simulation
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    saveOrders(orders);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
});

app.get('/api/orders', authenticateToken, (req: any, res) => {
  const orders = getOrders();
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json(userOrders.reverse()); // Latest first
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
