import webpack, { library } from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";


export function buildWebpack(options: BuildOptions){
    const {mode,paths,externals}=options;
    const isProd = mode === 'production';
    const target = isProd ? 'browserslist' : 'web';
    return {
        mode,
        target,
        entry: paths.entry, // входная точка - исходный файл
        output: {
            libraryTarget:'umd',
            path: paths.output,     // путь к каталогу выходных файлов - папка public
            // publicPath: '/public/',
            filename: "index.js",      // название создаваемого файла
            assetModuleFilename: '[path][name][ext][query]',
            chunkFilename: 'js/[name].bundle.js',
            clean: true,
        },
     /*
      так как стало много дополнительных модулей, теперь нецелесообразно иметь отдельный файл для vendors
      optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: 'vendors/vendor',
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },*/
        devtool: !isProd && 'source-map',
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        devServer: isProd ? undefined : buildDevServer(options),
        plugins: buildPlugins(options),
        externals:{
            ...externals?externals:{}
        }
       /* performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },*/
    }
}