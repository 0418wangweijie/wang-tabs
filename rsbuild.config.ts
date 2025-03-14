import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*'],
          }),
        ],
      },
    },
    rspack: {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          },
        ],
      },
    },
  },
});
