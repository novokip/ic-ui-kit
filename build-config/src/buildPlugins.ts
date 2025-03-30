import webpack from 'webpack';
import {BuildOptions} from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {Configuration} from 'webpack';
import {ForkTsCheckerWebpackPlugin} from "fork-ts-checker-webpack-plugin/lib/plugin";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
    const isProd = options.mode === 'production';
    const plugins: Configuration["plugins"] = [
        ...options.paths.html? [new HtmlWebpackPlugin({
            template: options.paths.html,
            // filename: "index.html"
        })]:[],
        new webpack.DefinePlugin({
            __PROD__: JSON.stringify(isProd),
            __SERVER_URL__: JSON.stringify(options.serverUrl),
            __AUTH_URL__: JSON.stringify(options.authUrl),
            __DEVPORT__: JSON.stringify(options.devport)
        }),
    ];
    if (!isProd) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: 'adminApp/css/custom.css',
            chunkFilename: 'css/[id].css',
            // ignoreOrder: true,
        }));
        plugins.push(new ForkTsCheckerWebpackPlugin({
            issue: {
                exclude: [
                    {file: '**/*.json'}
                ]
            }
        }));
        plugins.push(new ReactRefreshWebpackPlugin());
    } else {
        plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: 'adminApp/css/custom.css',
            chunkFilename: 'css/[id].css',
            // ignoreOrder: true,
        }));
    }
    // plugins.push(new BundleAnalyzerPlugin());
    return plugins;
}