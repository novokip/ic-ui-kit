export interface BuildPath {
    entry: any;
    html?: string;
    output: string;
    alias?: Record<string, string>;
}

export type BuildMode = 'production' | 'development'

export interface BuildOptions {
    port?: number;
    devport?: number;
    paths: BuildPath;
    mode: BuildMode;
    serverUrl?: string;
    authUrl?: string;
    externals?:Record<string,string>
}