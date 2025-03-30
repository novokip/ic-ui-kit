import {BuildOptions} from './types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {buildBabelLoader} from './babel/buildBaelLoader';
import {ModuleOptions} from 'webpack';
import path from "path";

const ReactRefreshTypeScript = require('react-refresh-typescript');

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isProd = options.mode === 'production';

    const cssLoader = {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader,'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    };

    const tsLoader = {
        test: /\.jsx?|tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    // transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [!isProd && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    // configFile: isProd ? 'tsconfig.prod.json' : 'tsconfig.dev.json'
                },
            },
        ],
        exclude: [/node_modules/,
            path.resolve(__dirname, 'src/stories'),],
    };
    const babelLoader = buildBabelLoader(options);
    const pngLoader = {
        test: /\.(png|jpe?g|gif|webp|ico)$/i,
        exclude: /moon.png$/i,
        type: 'asset', //isProd ? 'asset' : 'asset/resource'
    };
    
    const pngMoonLoader = {
        test:/moon.png$/i,
        type:  'asset/resource'
    };
    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };
    const svgLoader2 = {
        test: /custom-svg-sprite.svg$/i,
        type: 'asset/inline',
    };
    const svgUrlLoader = {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
    };
    const svgLoader3 = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        exclude: /custom-svg-sprite.svg$/i,
        resourceQuery: {not: [/url/]}, // exclude react component if *.svg?url

        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    expandProps: false,
                },
            },
        ],
    };
    const fontLoader = {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /Roboto-LightItalic.ttf$/i,
        type: 'asset/resource',
    };
    const fontLoader2 = {
        test: /Roboto-LightItalic.ttf$/i,
        type: 'asset/inline',
    };
    const htmlLoader = {
        test: /\.html$/,
        use: [
            {
                loader: 'html-loader',
            },
        ],
    };

    return [
        cssLoader,
        // fontLoader,
        // fontLoader2,
        tsLoader,
        // babelLoader,
        // svgLoader,
        // svgLoader2,
        // svgLoader3,
        // svgUrlLoader,
        // pngLoader,
        // pngMoonLoader,
        // htmlLoader,
    ];
}
