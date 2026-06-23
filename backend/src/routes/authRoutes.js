// const express = require('express');
// const router = express.Router();
// const { check } = require('express-validator');
// const { register, login, getMe } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// // Validation rules for registration
// const registerValidation = [
//   check('name', 'Name is required').notEmpty(),
//   check('email', 'Please enter a valid email').isEmail(),
//   check('password', 'Password must be at least 6 characters').isLength({
//     min: 6,
//   }),
// ];

// // Validation rules for login
// const loginValidation = [
//   check('email', 'Please enter a valid email').isEmail(),
//   check('password', 'Password is required').notEmpty(),
// ];

// // @route   POST /api/auth/register
// // Public route - no token needed
// // Temporary debug - remove later
// router.use((req, res, next) => {
//   console.log('Auth route hit:', req.method, req.path, req.body);
//   next();
// });
// router.post('/register', registerValidation, register);

// // @route   POST /api/auth/login
// // Public route - no token needed
// // Temporary debug - remove later
// router.use((req, res, next) => {
//   console.log('Auth route hit:', req.method, req.path, req.body);
//   next();
// });
// router.post('/login', loginValidation, login);

// // @route   GET /api/auth/me
// // Private route - protect middleware runs first to verify token
// // Temporary debug - remove later
// router.use((req, res, next) => {
//   console.log('Auth route hit:', req.method, req.path, req.body);
//   next();
// });
// router.get('/me', protect, getMe);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// Public route - no token needed
router.post('/register', register);

// @route   POST /api/auth/login
// Public route - no token needed
router.post('/login', login);

// @route   GET /api/auth/me
// Private route - protect middleware runs first to verify token
router.get('/me', protect, getMe);

module.exports = router;