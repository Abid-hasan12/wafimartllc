import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ১. লগইন করা ইউজার কি না তা টোকেন দিয়ে ভেরিফাই করার মিডলওয়্যার
export const protect = async (req, res, next) => {
  let token;

  // চেক করা হচ্ছে রিকোয়েস্টের Headers-এ Bearer Token আছে কি না
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 'Bearer <token>' থেকে শুধু টোকেন স্ট্রিংটি আলাদা করা হচ্ছে
      token = req.headers.authorization.split(' ')[1];

      // টোকেনটি ডিকোড (Decode) করে ভেতরের ইউজার আইডি বের করা হচ্ছে
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ডাটাবেজ থেকে ওই ইউজারের প্রোফাইল খুঁজে req.user-এ অ্যাসাইন করা (পাসওয়ার্ড ছাড়া)
      req.user = await User.findById(decoded.id);

      next(); // সব ঠিক থাকলে পরের ফাংশনে যাওয়ার পারমিশন দেওয়া হলো
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ২. ইউজারটি অ্যাডমিন কি না তা চেক করার মিডলওয়্যার
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};