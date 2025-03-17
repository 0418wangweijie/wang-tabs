import {pluginReact} from '@rsbuild/plugin-react';
import {defineConfig} from '@rslib/core';
import {pluginSass} from "@rsbuild/plugin-sass";
import postcss_pxtorem from "postcss-pxtorem";

export default defineConfig({
    source: {
        entry: {
            index: ['./src/**'],
        },
    },
    lib: [
        {
            bundle: false,
            dts: true,
            format: 'esm',
        },
    ],
    output: {
        target: 'web',
    },
    resolve: {
        alias: {
            '@': './src',
        }
    },
    tools: {
        postcss: {
            postcssOptions: {
                plugins: [
                    postcss_pxtorem({
                        rootValue: 28, // 根字体大小，对应 rootFontSize: 28
                        unitPrecision: 5, // 转换后的 rem 值保留的小数位数
                        propList: ['*'], // 转换所有属性
                        selectorBlackList: [], // 不转换的选择器
                        replace: true, // 是否直接替换 px 值
                        mediaQuery: false, // 是否转换媒体查询中的 px
                        minPixelValue: 2, // 最小转换值
                    }),
                ],
            },
        }
    },
    plugins: [pluginReact(), pluginSass()],
});
