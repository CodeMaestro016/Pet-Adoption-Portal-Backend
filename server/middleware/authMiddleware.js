import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Optional: Role-based middleware (e.g., for Shelter only)
const shelterOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Shelter') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as Shelter' });
  }
};

export { protect, shelterOnly };