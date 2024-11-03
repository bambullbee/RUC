import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { Configuration } from "webpack";
import webpack from "webpack";

import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { paths, analyzer } = options;
  const isDev = options.mode === "development";

  const plugins: Configuration["plugins"] = [
    //позволяет динамично работать с автоматически генерируемым js bundle с разными названиями и добавлять их в стабильный index.html
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
  ];

  if (isDev) {
    //позволяет видеть прогресс сборки бандла
    plugins.push(new webpack.ProgressPlugin());
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
