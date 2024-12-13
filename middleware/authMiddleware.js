const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1]; // Extract the token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      req.user = decoded.id;
      next(); // Pass control to the next middleware
    });
  } else {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }
};

module.exports = protect;
