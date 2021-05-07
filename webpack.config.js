const webpack = require('webpack');
const path = require('path');
"use-strict";
// const meteorExternals = require('webpack-meteor-externals');
// const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC = path.resolve(__dirname, 'node_modules');

const clientConfig = {
    target: 'web',
    entry: './client/main.js',
    devtool: 'inline-source-map',
    devServer: {
        hot: true
    },
    output: {
        publicPath: '/'
    },
    // externals: [meteorExternals()],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './client/main.html',
            hash: true
        })
    ],
    rules: [
        {
          test: /\.mp3$/,
          include: SRC,
          loader: 'file-loader'
        }
    ],
    resolve: {
        modules: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, './'), // enables you to use 'imports/...' instead of '/imports/...'
        ],
        alias: {
          '/imports': path.resolve(__dirname, './imports'),
          '/ui': path.resolve(__dirname, './ui'),
          // ... and any other directories you might have
        }
    }
};

const serverConfig = {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [meteorExternals(), nodeExternals()], // in order to ignore all modules in node_modules folder
    entry: './server/methods.js',
    devServer: {
        hot: true
    },
};

module.exports = [clientConfig, serverConfig];