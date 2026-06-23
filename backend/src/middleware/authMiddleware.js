const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in request headers
  // Frontend sends it as: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract just the token part (remove "Bearer " prefix)
      token = req.headers.authorization.split(' ')[1];

      // Verify token using our JWT_SECRET from .env
      // If token is fake or expired this will throw an error
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from DB using ID stored in token
      // .select('-password') means fetch everything EXCEPT password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Move on to the next function (the actual controller)
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };