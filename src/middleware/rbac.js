const rbac = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: 'Authentication required' });
    }
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send({ error: 'Access denied' });
    }
  };
};

module.exports = rbac;