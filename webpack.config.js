const path = require('path');

module.exports = {
  entry: './src/index.ts', // Entry point for TypeScript files
  output: {
    path: path.resolve(__dirname, 'dist'), // Output path
    filename: 'bundle.js', // Output file name
    libraryTarget: 'commonjs2', // Required for npm package exports
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Add support for .ts and .tsx files
        exclude: /node_modules/,
        use: 'ts-loader', // Use ts-loader to transpile TypeScript files
      },
      {
        test: /\.jsx?$/, // Already present for .js and .jsx files
        exclude: /node_modules/,
        use: 'babel-loader', // Use babel-loader for JavaScript files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve both TypeScript and JavaScript extensions
  },
  externals: {
    react: 'react', // Do not bundle React (leave as external)
    'react-dom': 'react-dom', // Do not bundle ReactDOM
  },
};
