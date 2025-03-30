import webpack from 'webpack';
import { BuildOptions } from './types/types';

import path from "path";
export function buildResolvers(options: BuildOptions): webpack.Configuration['resolve'] {
    console.log(path.resolve(process.cwd(), 'src/5.shared/'))
    return {
        fallback: {
            net: false,
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // alias: options.paths.alias,
        /* alias:{
            // "@/" : path.resolve(process.cwd(), '.src/*'),
            shared: path.resolve(__dirname, './src/5.shared/'),
        } */
    };
}
