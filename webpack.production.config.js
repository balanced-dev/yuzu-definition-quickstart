const config = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');
const YuzuDist = require('./plugins/YuzuDist');

config.mode = 'production';

config.output.filename = './_client/scripts/[name].[contenthash].js';
config.resolve.alias.vue = 'vue/dist/vue.min.js';
config.plugins.push(
    new MiniCssExtractPlugin({
        filename: './_client/styles/[name].[contenthash].css'
    }),
    new MiniCssExtractPlugin({
        filename: './_client/styles/[name].css'
    }),
    new YuzuDist(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
);

module.exports = config;