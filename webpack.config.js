var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scrollanchor.js',
    library: {
      root: "ScrollAnchor",
      amd: "ScrollAnchor",
      commonjs: "ScrollAnchor"
    },
    libraryTarget: "umd"
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
}