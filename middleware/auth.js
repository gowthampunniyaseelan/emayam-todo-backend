const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  let token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Check if the token starts with "Bearer " and extract the token part
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length); // Remove "Bearer " from the token
  } else {
    return res.status(403).send({ message: "Invalid token format!" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;  // Add the decoded user ID to the request
    req.userRole = decoded.role; // Add the decoded user role to the request
    next(); // Call the next middleware or route handler
  });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    next(); // User is admin, proceed
  } else {
    res.status(403).send({ message: "Require Admin Role!" });
  }
};

// Middleware to check if the user is a manager
const isManager = (req, res, next) => {
  if (req.userRole === 'manager') {
    next(); // User is manager, proceed
  } else {
    res.status(403).send({ message: "Require Manager Role!" });
  }
};

const isManagerOrAdmin = (req, res, next) => {
  if (req.userRole === 'manager' || req.userRole === 'admin') {
    next(); // User is manager, proceed
  } else {
    res.status(403).send({ message: "Require Manager Role!" });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isManager,
  isManagerOrAdmin
};
