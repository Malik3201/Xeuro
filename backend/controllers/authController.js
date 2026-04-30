// controllers/authController.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Run once to seed admin: POST /api/admin/seed
export const seedAdmin = async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: req.body.email });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });
    const admin = await Admin.create(req.body);
    res.status(201).json({ message: 'Admin created', email: admin.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
