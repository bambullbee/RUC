import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { Configuration } from "webpack";
import webpack, { DefinePlugin } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { paths, analyzer, platform } = options;
  const isDev = options.mode === "development";

  const plugins: Configuration["plugins"] = [
    //позволяет динамично работать с автоматически генерируемым js bundle с разными названиями и добавлять их в стабильный index.html
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    //объвляемые здесь глобальые переменные(они влияют на сборку, отбрасывая не нужный код, если, например if(__PLATFOTM__ === "mobile")) return <Mobile/> не соблюдается) дожны также определяться в global.d.ts. эта тактика условной сборки называется tree shaking
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    //позволяет видеть прогресс сборки бандла
    plugins.push(new webpack.ProgressPlugin());
    //разделяет сборку и проверку типов. последний процесс запускается сразу после сборки и если то покажет ошибки
    plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  if (analyzer === "true") plugins.push(new BundleAnalyzerPlugin());

  return plugins;
}
