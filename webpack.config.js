// webpack.config.js - Custom webpack configuration to remove Sharp
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      sharp: false,
    },
  },
  externals: {
    sharp: 'commonjs sharp',
  },
};
