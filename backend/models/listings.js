const connection = require('../config/database');

const Listing = connection.define('listing', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Define other fields as needed
});

module.exports = Listing;