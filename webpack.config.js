const { exec } = require('child_process');
const path = require('path');
//const webpack = require("webpack");

module.exports = (env, options) => {
 const { mode = 'development' } = options;
 const rules = [
  {
   test: /\.(sa|sc|c)ss$/,
   use: [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader'
   ],
  },
  {
   test: /\.m?js$/,
   use: [
    'html-tag-js/jsx/tag-loader.js',
    {
     loader: 'babel-loader',
     options: {
      presets: ['@babel/preset-env'],
     },
    },
   ],
  },
 ];

 const main = {
  mode,
  entry: {
   main: './src/main.js',
  },
  output: {
   path: path.resolve(__dirname, 'dist'),
   filename: '[name].js',
   chunkFilename: '[name].js',
  },
  module: {
   rules,
   },
  resolve: {
   fallback: {
    url: require.resolve("url/"),
    http: require.resolve("stream-http"),
    stream: require.resolve("stream-http"),
    buffer: require.resolve("buffer")
   }
  },
  plugins: [
   {
    apply: (compiler) => {
     compiler.hooks.afterDone.tap('pack-zip', () => {
      // run pack-zip.js
      exec('node .vscode/pack-zip.js', (err, stdout, stderr) => {
       if (err) {
        console.error(err);
        return;
       }
       console.log(stdout);
      });
     });
    },
   },
  ],
 };

 return [main];
};