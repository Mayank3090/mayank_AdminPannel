
const AuditLog = require('../models/AuditLog');

const auditLog = (action) => {
  return async (req, res, next) => {
    const originalJson = res.json;
    res.json = function (body) {
      res.locals.body = body;
      originalJson.call(this, body);
    };

    res.on('finish', async () => {
      try {
        await AuditLog.create({
          action,
          performedBy: req.user.id,
          targetResource: req.originalUrl,
        });
      } catch (error) {
        console.error('Error creating audit log:', error);
      }
    });

    next();
  };
};

module.exports = auditLog;