import { BuildMode, BuildPath, buildWebpack } from "./build-config";

import path from "path";

interface EnvVariables {
    mode: BuildMode,
    port?: number
}


export default (env: EnvVariables = {mode: 'development'}) => {
    console.log(env);
    const paths:BuildPath={
        entry: "./src/index.ts",
        // html:  path.resolve(__dirname, "./src/index.html"),
        output: path.resolve(__dirname, "./dist")
    }

    const config= buildWebpack({
        mode:env.mode,
        paths,
        externals:{react:'react'}
    });
    return config;
}