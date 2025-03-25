const adminOnly = (req, res, next) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  
    // Check if the decoded token has isAdmin flag
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Admin access only' });
    }
  
    next();
  };
  
  export default adminOnly;
  