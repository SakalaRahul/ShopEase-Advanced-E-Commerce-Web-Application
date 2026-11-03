const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shopease_jwt_secret_key_2026_production');
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid or expired.' });
    }
  }
  return res.status(401).json({ message: 'Authorization header missing.' });
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Admin privileges required.' });
};

module.exports = { protect, adminOnly };
