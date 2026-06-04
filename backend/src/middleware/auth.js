const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.user.status === 'Inactive') {
      return res.status(403).json({ success: false, message: 'Your account is inactive' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

// Authorize specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `User role '${req.user.role}' is not authorized to access this resource` 
      });
    }
    next();
  };
};

// Check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Only administrators can access this resource' 
    });
  }
  next();
};

// Check if user is the owner of the resource
const isResourceOwner = async (req, res, next) => {
  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user.role === 'Admin' || req.user._id.toString() === resourceUserId) {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'You are not authorized to access this resource' 
    });
  }
};

module.exports = {
  protect,
  authorize,
  adminOnly,
  isResourceOwner
};
