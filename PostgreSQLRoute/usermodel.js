// models/user.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:4XTGyKtN2yKoFVCiRxAB@containers-us-west-165.railway.app:5779/railway', {
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: require('pg')
});

async function testDatabaseConnection() {
  try {
    // Test the database connection by authenticating with it.
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the database connection to prevent resource leaks.
    sequelize.close();
  }
}

testDatabaseConnection();



const Tick = sequelize.define('tick', {
  // Define your fields here
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  // Add more fields as needed
});

module.exports = Tick;
