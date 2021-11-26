var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    liveReload: true
  },
  entry: {
    standings: './src/league-standings.js',
    pastEvents: './src/past-events.js',
    schedule: './src/schedule.js',
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: "Dev",
          template: "index.html",
          chunks: ['main']
      })
  ]
};