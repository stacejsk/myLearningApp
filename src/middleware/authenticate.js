const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Ensure the Authorization header exists and is formatted correctly
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Using environment variable for secret key
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

const authorizeAdmin = (req, res, next) => {
    // Check if the authenticated user has the 'admin' role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Requires admin role." });
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };

