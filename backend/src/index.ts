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

// --- Kohls API Configuration (RapidAPI) ---
const KOHLS_API_URL = 'https://kohls.p.rapidapi.com';
const RAPID_API_KEY = 'd269ac0e09msh186419b293693afp1ace98jsn867b286def58';
const RAPID_API_HOST = 'kohls.p.rapidapi.com';

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=format&fit=crop&w=800';

const rapidApiConfig = {
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST
  }
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-key-123';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-key-456';
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const ORDERS_FILE = path.join(__dirname, '..', 'data', 'orders.json');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'StyleNest API is running', version: '1.0.0' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'StyleNest API Base Endpoint', status: 'healthy' });
});

// --- In-Memory Cache System ---
const productCache: { [key: string]: { data: any, timestamp: number } } = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// --- User Management Helpers ---

interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  role?: string;
}

// --- Persistence Fallback (In-Memory) ---
let memoryUsers: User[] = [];
let memoryOrders: Order[] = [];

const getUsers = (): User[] => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const fileUsers = JSON.parse(data || '[]');
      // Merge file users into memory if memory is empty
      if (memoryUsers.length === 0) memoryUsers = fileUsers;
      return memoryUsers;
    }
  } catch (err) {
    console.error('File read failed, using memory');
  }
  return memoryUsers;
};

const saveUsers = (users: User[]) => {
  memoryUsers = users;
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('File write inhibited (Serverless environment)');
  }
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
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      const fileOrders = JSON.parse(data || '[]');
      if (memoryOrders.length === 0) memoryOrders = fileOrders;
      return memoryOrders;
    }
  } catch (err) {
    console.error('Order read failed');
  }
  return memoryOrders;
};

const saveOrders = (orders: Order[]) => {
  memoryOrders = orders;
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error('Order write inhibited');
  }
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

// --- Mock Reviews Helper ---
const getMockReviews = () => [
  { id: '1', user: 'Sophia R.', rating: 5, comment: 'Absolutely amazing quality! The fit is perfect and it feels super premium.', date: '2 days ago', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '2', user: 'Liam M.', rating: 4, comment: 'Great product, delivery was fast. Slightly different color than the picture but still looks great.', date: '1 week ago', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '3', user: 'Emma W.', rating: 5, comment: 'Exceeded my expectations! Will definitely buy more from Trendora.', date: '2 weeks ago', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '4', user: 'Noah K.', rating: 3, comment: 'Decent quality for the price, but the sizing runs slightly small.', date: '1 month ago', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' }
];

// --- Load Mock Products Data ---
const productsPath = path.join(__dirname, 'products.json');
let LOCAL_PRODUCTS: any[] = [];

try {
  if (fs.existsSync(productsPath)) {
    const productsData = fs.readFileSync(productsPath, 'utf8');
    LOCAL_PRODUCTS = JSON.parse(productsData);
    console.log(`Loaded ${LOCAL_PRODUCTS.length} local products from products.json`);
  } else {
    console.warn('products.json not found, using empty local products list');
  }
} catch (error) {
  console.error('Error loading products.json:', error);
}


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

    // Password Validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>_+-]/.test(password);
    if (password.length < 6 || !hasUppercase || !hasSymbol) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long and include an uppercase letter and a symbol'
      });
    }

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

app.put('/api/auth/profile', authenticateToken, async (req: any, res) => {
  try {
    const { firstName, lastName, email, mobile, gender } = req.body;
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);

    const user = users[userIndex];
    if (userIndex === -1 || !user) return res.status(404).json({ message: 'User not found' });

    const updatedUser = {
      ...user,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      // @ts-ignore
      mobile: mobile || user.mobile,
      // @ts-ignore
      gender: gender || user.gender
    };

    users[userIndex] = updatedUser;

    saveUsers(users);
    const { passwordHash: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
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
  const cacheKey = `products_${category || 'all'}`;

  // Check Cache
  if (productCache[cacheKey] && (Date.now() - productCache[cacheKey].timestamp < CACHE_DURATION)) {
    return res.json({ products: productCache[cacheKey].data });
  }

  let externalProducts: any[] = [];

  // Map our categories to keywords for Kohls API
  const categoryKeywords: Record<string, string> = {
    'men': 'mens fashion clothing',
    'women': 'womens dress fashion',
    'kids': 'kids outfits toys',
    'beauty': 'beauty cosmetics',
    'home': 'home living decor',
    'accessories': 'jewelry watches sunglasses',
    'new arrivals': 'new arrival fashion 2026',
    'signature series': 'premium luxury designer edition'
  };

  const keyword = category
    ? (categoryKeywords[category as string] || category as string)
    : 'trending fashion';

  try {
    const response = await axios.get(`${KOHLS_API_URL}/products/list`, {
      ...rapidApiConfig,
      params: {
        keyword,
        limit: 32
      }
    });

    const products = response.data.payload.products || [];
    externalProducts = products.map((p: any) => {
      const imageUrl = (p.image && p.image.url) ? p.image.url :
        (p.images && p.images[0] && p.images[0].url) ? p.images[0].url :
          FALLBACK_IMAGE;
      const allImages = (p.images && p.images.length > 0) ? p.images.map((img: any) => img.url) : [imageUrl];

      return {
        id: parseInt(p.webID, 10),
        title: p.productTitle,
        description: p.productTitle,
        price: p.prices && p.prices[0] ? p.prices[0].regularPrice.minPrice : (p.prices && p.prices[0]?.salePrice?.minPrice || 0),
        discountPercentage: p.prices && p.prices[0] && p.prices[0].salePrice ? 25 : 0,
        rating: 4.5 + (Math.random() * 0.5),
        stock: 50 + Math.floor(Math.random() * 100),
        brand: 'Kohl\'s Luxury',
        category: category || 'General',
        thumbnail: imageUrl,
        images: allImages,
        reviews: getMockReviews()
      };
    });
  } catch (error: any) {
    console.error('Error fetching from Kohls API:', error.message);
  }

  const localItems = category ? LOCAL_PRODUCTS.filter(p => p.category === category) : LOCAL_PRODUCTS;

  const allProducts = [...localItems, ...externalProducts];
  const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());
  const finalProducts = uniqueProducts.sort(() => Math.random() - 0.5);

  // Update Cache
  productCache[cacheKey] = { data: finalProducts, timestamp: Date.now() };

  res.json({ products: finalProducts });
});

app.get('/api/products/:id', async (req, res) => {
  const numericId = parseInt(req.params.id, 10);
  const cacheKey = `product_detail_${numericId}`;

  // Check Cache
  if (productCache[cacheKey] && (Date.now() - productCache[cacheKey].timestamp < CACHE_DURATION)) {
    return res.json(productCache[cacheKey].data);
  }

  const localProduct = LOCAL_PRODUCTS.find(p => p.id === numericId);
  if (localProduct) return res.json(localProduct);

  try {
    const response = await axios.get(`${KOHLS_API_URL}/products/detail`, {
      ...rapidApiConfig,
      params: {
        webID: numericId
      }
    });

    const p = response.data.payload.products[0];
    if (!p) return res.status(404).json({ message: 'Product not found' });

    const imageUrl = (p.image && p.image.url) ? p.image.url :
      (p.images && p.images[0] && p.images[0].url) ? p.images[0].url :
        FALLBACK_IMAGE;
    const allImages = (p.images && p.images.length > 0) ? p.images.map((img: any) => img.url) : [imageUrl];

    const product = {
      id: parseInt(p.webID, 10),
      title: p.productTitle,
      description: p.shortDescription || p.productTitle,
      price: p.prices && p.prices[0] ? p.prices[0].regularPrice.minPrice : (p.prices && p.prices[0]?.salePrice?.minPrice || 0),
      discountPercentage: 20,
      rating: 4.8,
      stock: 45,
      brand: 'Kohl\'s Signature',
      category: p.productGroup || 'Couture',
      thumbnail: imageUrl,
      images: allImages,
      reviews: getMockReviews()
    };
    // Update Cache
    productCache[cacheKey] = { data: product, timestamp: Date.now() };

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
      status: 'Delivered',
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
  res.json(userOrders.reverse());
});

// --- AI Chat Support Helper ---

const getAIResponse = (message: string): string => {
  const msg = message.toLowerCase();
  if (msg.includes('shipping') || msg.includes('delivery')) return "We offer free standard shipping on all orders over $99. Standard delivery usually takes 3-5 business days.";
  if (msg.includes('return') || msg.includes('refund')) return "StyleNest offers a 30-day hassle-free return policy. Items must be unworn and have original tags.";
  if (msg.includes('hi') || msg.includes('hello')) return "Hello! Welcome to StyleNest Customer Support. How can I help you elevate your style today?";
  return "I'm here to help! You can ask about shipping, returns, or our latest collections.";
};

app.post('/api/support/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });
  setTimeout(() => {
    const response = getAIResponse(message);
    res.json({ response });
  }, 500);
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
