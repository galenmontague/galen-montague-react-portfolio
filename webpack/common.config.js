// webpack plugins

// common - these rules will work for every environment
// webpack helps to load the app in chuncks so only the necessary parts are loaded when they are needed (not just all at once-- that would be much slower.)
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin');

module.exports = {
  entry: {
    app: ['./src/bootstrap.js'],
    // I want the app to look at this file first (its the entry point). The user comes in through the index.html file.
    vendor: './src/vendor.js',
    // bring in pollyfill
  },

  resolve: {
    extensions: ['.js', '.scss'],
    // files we'll allow

    modules: ['node_modules'],
    // pointing to where the dependencies are
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // testing agains a certain value (any type of files that end in js)
        exclude: /node_modules/,
        use: ['babel-loader'],
        // allows for modern JS (renders modern JS for older browsers)
      },

      {
        type: 'javascript/auto',
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        // allows these file types
        loader: 'file-loader',
        // a library on npm (allows different types of media)
        options: {
          name: '[path][name].[ext]',
          publicPath: '/',
        },
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000',
      },
    ],
  },

  plugins: [
    new SplitChunksPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity,
    }),
  ],
};
