const { Sequelize } = require('sequelize');
require('dotenv').config();


const isProduction = process.env.NODE_ENV === 'production';
const useSSL = isProduction || process.env.DATABASE_URL.includes('sslmode=require');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, 
  dialectOptions: {
    ssl: useSSL ? { require: true, rejectUnauthorized: false } : false,
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
