import {pluginReact} from '@rsbuild/plugin-react';
import {defineConfig} from '@rslib/core';
import {pluginSass} from "@rsbuild/plugin-sass";

const postcssPxtorem = require("postcss-pxtorem");

// 从环境变量获取配置
const enablePxToRem = process.env.ENABLE_PX_TO_REM !== 'false';
const rootValue = parseInt(process.env.PX_TO_REM_ROOT_VALUE || '16', 10);

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
                    ...(enablePxToRem ? postcssPxtorem({
                        rootValue,
                        unitPrecision: 5, // 转换后的 rem 值保留的小数位数
                        propList: ['*'], // 转换所有属性
                        selectorBlackList: [], // 不转换的选择器
                        replace: true, // 是否直接替换 px 值
                        mediaQuery: false, // 是否转换媒体查询中的 px
                        minPixelValue: 1, // 最小转换值
                    }) : []),
                ],
            },
        },
    },
    plugins: [pluginReact(), pluginSass()],
});
