module.exports = {
  entry: './app/index.ts',
  output: {
    filename: 'app.js',
    path: './dist'
  },
  resolve: {
    extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'babel-loader?presets[]=es2016&presets[]=es2015&presets[]=react!ts-loader',
        exclude: '/node_modules'
      }
    ]
  }
};
