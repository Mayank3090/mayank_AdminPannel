const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  performedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  targetResource: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = AuditLog;