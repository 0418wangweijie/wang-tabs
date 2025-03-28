/// <reference types="@rsbuild/core/types" />
import React, { JSX } from "react";

// 定义单个 Tab 的结构
export interface Tab {
    name: string; // Tab 的唯一标识符
    label: string; // Tab 的显示标签
    render?: () => JSX.Element; // 自定义渲染方法，返回一个 React 元素
}

// 定义 Tabs 组件的属性结构
export interface TabsProps {
    tabList: Tab[]; // 所有 Tab 的集合
    activeTab: string; // 当前激活的 Tab 的 name
    onTabChange: (tabName: string) => void; // 切换 Tab 时触发的回调函数
    style?: React.CSSProperties; // Tab 列表容器的可选样式
    rootStyle?: React.CSSProperties; // 根元素的可选样式
}
