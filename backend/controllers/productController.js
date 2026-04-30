// controllers/productController.js
import Product from '../models/Product.js';

/**
 * Normalize images to a plain array of URL strings.
 * Handles: string | string[] | {url}[] | undefined
 */
const normalizeImages = (raw) => {
  if (!raw) return [];
  let arr = raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) arr = parsed;
      else arr = [raw];
    } catch {
      arr = [raw];
    }
  }
  if (!Array.isArray(arr)) arr = [arr];

  return arr
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      if (item && typeof item === 'object' && item.url) return String(item.url).trim();
      return null;
    })
    .filter(Boolean);
};

export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 12 } = req.query;
    const query = { isAvailable: true };
    if (category) query.category = category;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    if (search) query.$text = { $search: search };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const body = { ...req.body };

    if (typeof body.customizationOptions === 'string') {
      try { body.customizationOptions = JSON.parse(body.customizationOptions); }
      catch { body.customizationOptions = {}; }
    }
    if (body.price !== undefined) body.price = Number(body.price);
    if (body.MOQ   !== undefined) body.MOQ   = Number(body.MOQ);
    if (body.stock !== undefined) body.stock  = Number(body.stock);
    if (body.isAvailable !== undefined)
      body.isAvailable = body.isAvailable === 'true' || body.isAvailable === true;

    console.log('Incoming images (create):', body.images);
    body.images = normalizeImages(body.images);
    console.log('Normalized images (create):', body.images);

    const product = await Product.create(body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const body = { ...req.body };

    if (body.price !== undefined) body.price = Number(body.price);
    if (body.MOQ   !== undefined) body.MOQ   = Number(body.MOQ);
    if (body.stock !== undefined) body.stock  = Number(body.stock);
    if (typeof body.customizationOptions === 'string') {
      try { body.customizationOptions = JSON.parse(body.customizationOptions); }
      catch { body.customizationOptions = {}; }
    }

    console.log('Incoming images (update):', body.images);
    body.images = normalizeImages(body.images);
    console.log('Normalized images (update):', body.images);

    const product = await Product.findByIdAndUpdate(req.params.id, body, {
      new: true, runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.isAvailable = !product.isAvailable;
    await product.save();
    res.json({ isAvailable: product.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
