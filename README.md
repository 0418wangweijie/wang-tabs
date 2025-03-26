# wang-tabs

`wang-tabs` 是一个轻量级、可定制的 React 组件库，包含多个选项卡组件，支持平滑的选中状态切换动画。适用于需要选项卡切换功能的 React 项目。

## 样式处理

### SCSS 支持

本项目使用 SCSS 进行样式编写，所有组件样式均采用模块化方式管理。您可以通过以下方式自定义样式：

1. 直接修改 SCSS 变量
2. 通过 CSS 变量覆盖默认样式
3. 使用 `style` 和 `rootStyle` props 传递自定义样式

### 单位转换

为了更好的响应式支持，项目中使用了 `postcss-pxtorem` 插件将 px 单位自动转换为 rem 单位。转换规则如下：

- 根字体大小 (rootValue): 28px
- 转换精度 (unitPrecision): 5 位小数
- 最小转换值 (minPixelValue): 2px

这意味着在 SCSS 文件中编写的 px 值会在编译时自动转换为 rem 单位。例如：

```scss
// 输入
.example {
    width: 56px;
}

// 输出
.example {
    width: 2rem; /* 56px / 28px */
}
```

---

## SlopeTabs 组件

### 功能特性

- 平滑的选中状态切换动画
- 高度可定制的样式
- 简单的 API 设计
- TypeScript 支持

### 安装

```bash
npm install wang-tabs
# 或
yarn add wang-tabs
```

### 使用示例

```tsx
import React, {useState} from 'react';
import { SlopeTabs } from 'wang-tabs';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const tabList = [
        {name: 'tab1', label: 'Tab 1', render: () => <div>Content 1</div>},
        {name: 'tab2', label: 'Tab 2', render: () => <div>Content 2</div>},
    ];

    return (
        <div>
            <SlopeTabs
                tabList={tabList}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
};
```

### Props 说明

| 属性名           | 类型                          | 必填 | 默认值 | 描述                                          |
|---------------|-----------------------------|----|-----|---------------------------------------------|
| `tabList`     | `Array<Tab>`                | 是  | -   | 选项卡列表，每个选项卡包含 `name`、`label` 和 `render` 方法。 |
| `activeTab`   | `string`                    | 是  | -   | 当前选中的选项卡名称。                                 |
| `onTabChange` | `(tabName: string) => void` | 是  | -   | 选项卡切换时的回调函数，返回选中的选项卡名称。                     |
| `style`       | `React.CSSProperties`       | 否  | -   | 自定义容器样式。                                    |
| `rootStyle`   | `React.CSSProperties`       | 否  | -   | 自定义根容器样式。                                  |

### `Tab` 类型说明

```ts
interface Tab {
    name: string;    // 选项卡唯一标识
    label: string;   // 选项卡显示文本
    render: () => JSX.Element; // 选项卡内容渲染函数
}
```

### 样式定制

| CSS 变量名          | 默认值      | 描述                     |
|-------------------|-----------|------------------------|
| `--tab-height`    | `152px`   | 选项卡高度                 |
| `--active-color`  | `#4096ff` | 激活状态背景颜色             |
| `--primary-color` | `#bae0ff` | 默认状态背景颜色             |
| `--font-color`    | `#fff`    | 文字颜色                   |
| `--border-radius` | `35px`    | 圆角大小                  |
| `--font-size`     | `44px`    | 文字大小                  |

---

## ElevatedSlopeTabs 组件

### 功能特性

- 独特的立体视觉效果
- 平滑的选中状态切换动画
- 高度可定制的样式
- TypeScript 支持

### 使用示例

```tsx
import React, {useState} from 'react';
import { ElevatedSlopeTabs } from 'wang-tabs';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const tabList = [
        {name: 'tab1', label: 'Tab 1', render: () => <div>Content 1</div>},
        {name: 'tab2', label: 'Tab 2', render: () => <div>Content 2</div>},
    ];

    return (
        <div>
            <ElevatedSlopeTabs
                tabList={tabList}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
};
```

### Props 说明

| 属性名           | 类型                          | 必填 | 默认值 | 描述                                          |
|---------------|-----------------------------|----|-----|---------------------------------------------|
| `tabList`     | `Array<Tab>`                | 是  | -   | 选项卡列表，每个选项卡包含 `name`、`label` 和 `render` 方法。 |
| `activeTab`   | `string`                    | 是  | -   | 当前选中的选项卡名称。                                 |
| `onTabChange` | `(tabName: string) => void` | 是  | -   | 选项卡切换时的回调函数，返回选中的选项卡名称。                     |
| `style`       | `React.CSSProperties`       | 否  | -   | 自定义容器样式。                                    |
| `rootStyle`   | `React.CSSProperties`       | 否  | -   | 自定义根容器样式。                                  |

### `Tab` 类型说明

```ts
interface Tab {
    name: string;    // 选项卡唯一标识
    label: string;   // 选项卡显示文本
    render: () => JSX.Element; // 选项卡内容渲染函数
}
```

### 样式定制

| CSS 变量名                | 默认值      | 描述       |
|-------------------------|-----------|----------|
| `--tab-height`          | `152px`   | 选项卡高度    |
| `--tab-container-height`| `172px`   | 选项卡容器高度  |
| `--active-color`        | `#4096ff` | 激活状态背景颜色 |
| `--font-color`          | `#FFFFFF` | 默认文字颜色   |
| `--container-color`     | `#FFFFFF` | 容器背景颜色   |
| `--primary-color`       | `#ffffff` | 默认状态背景颜色 |
| `--border-radius`       | `35px`    | 圆角大小     |
| `--font-size`           | `44px`    | 文字大小     |

---

## 开发与贡献

欢迎提交 Issue 和 PR！如果你有任何问题或建议，请通过 [GitHub Issues](https://github.com/0418wangweijie/wang-tabs/issues) 反馈。

## 许可证

本项目基于 [MIT 许可证](https://opensource.org/licenses/MIT) 开源。
