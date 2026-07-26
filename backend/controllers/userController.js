import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// টোকেন তৈরি করার হেল্পার ফাংশন
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // টোকেনটি ৩০ দিন ভ্যালিড থাকবে
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // ইমেইল অলরেডি ডাটাবেজে আছে কি না চেক করা
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // নতুন ইউজার তৈরি (পাসওয়ার্ড আমাদের মডেলের মিডলওয়্যার দিয়ে অটো হ্যাশ হয়ে যাবে)
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // ইউজারকে লগইন টোকেন পাঠানো হচ্ছে
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ইমেইল দিয়ে ইউজার খোঁজা (মডেলে select: false থাকায় পাসওয়ার্ড এখানে আলাদাভাবে টেনে আনতে হবে)
    const user = await User.findOne({ email }).select('+password');

    // ইউজার পাওয়া গেলে এবং পাসওয়ার্ড ম্যাচ করলে
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};