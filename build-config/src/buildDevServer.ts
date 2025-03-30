import {Configuration} from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(options:BuildOptions):Configuration{
    return {
        ...'port' in options ? {port: options.port} : {},
        open: true,
        hot: true, // Включает автоматическую перезагрузку страницы при изменениях
    }
}