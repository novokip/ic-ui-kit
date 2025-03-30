import { BuildOptions } from "../types/types";

export function buildBabelLoader(options:BuildOptions){
    // const isProd = options.mode === 'production';
    const plugins:any[]=[];
    plugins.push(
        [
            "formatjs",
            {
                "idInterpolationPattern": "[sha512:contenthash:base64:6]",
                "ast": true
            }
        ]);
        plugins.push("@emotion/babel-plugin");
        plugins.push(["@babel/plugin-proposal-decorators",{ 
           "version": "2023-05" 
                        // "decoratorsBeforeExport": false // I tried this with true as well -> no luck either
        }]);
        plugins.push(["@babel/plugin-transform-class-properties"]);
        // if (isProd){
    //     plugins.push([
    //         removeDataQaBabelPlugin(),
    //         {
    //             props:['data-qa']
    //         }
    //     ]);
    // }
    return {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(node_modules)/,
        use:{

            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    ["@babel/preset-react",
                        {
                            runtime:'automatic', importSource: "@emotion/react"
                        }
                    ],
                ],
                plugins,
                "assumptions": {
                    "setPublicClassFields": false
                }
            },
        }
    }

}