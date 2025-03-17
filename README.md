# wang-tabs

`wang-tabs` 是一个轻量级、可定制的 React 组件库，目前包含 `SlopeTabs` 选项卡组件，支持平滑的选中状态切换动画。适用于需要选项卡切换功能的 React 项目。

## 组件列表

- **SlopeTabs**：带有平滑动画效果的选项卡组件

## 功能特性

- **平滑动画**：选中状态带有平滑的滑动动画效果。
- **高度可定制**：支持自定义样式和内容渲染。
- **简单易用**：通过简单的配置即可快速集成到项目中。
- **TypeScript 支持**：完全使用 TypeScript 编写，提供类型安全。

## 安装

使用 npm 或 yarn 安装：

```bash
npm install wang-tabs
```

或

```bash
yarn add wang-tabs
```

## 使用示例

以下是一个简单的使用示例：

```tsx
import React, {useState} from 'react';
import SlopeTabs from 'slope-tabs';

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

export default App;
```

## API 说明

### Props

| 属性名           | 类型                          | 必填 | 默认值 | 描述                                          |
|---------------|-----------------------------|----|-----|---------------------------------------------|
| `tabList`     | `Array<Tab>`                | 是  | -   | 选项卡列表，每个选项卡包含 `name`、`label` 和 `render` 方法。 |
| `activeTab`   | `string`                    | 是  | -   | 当前选中的选项卡名称。                                 |
| `onTabChange` | `(tabName: string) => void` | 是  | -   | 选项卡切换时的回调函数，返回选中的选项卡名称。                     |
| `style`       | `React.CSSProperties`       | 否  | -   | 自定义容器样式。                                    |

### `Tab` 类型

```ts
interface Tab {
    name: string;    // 选项卡唯一标识
    label: string;   // 选项卡显示文本
    render: () => JSX.Element; // 选项卡内容渲染函数
}
```

## 样式定制

`SlopeTabs` 使用 SCSS 编写样式，你可以通过以下方式覆盖默认样式：

1. 在你的项目可以更改的样式属性：

| CSS 变量名          | 默认值      | 描述                     |
|-------------------|-----------|------------------------|
| `--tab-height`    | `152px`   | 选项卡高度                 |
| `--active-color`  | `#ffffff` | 激活状态文字颜色             |
| `--default-color` | `#ede6f2` | 默认状态文字颜色             |
| `--primary-color` | `#844ca8` | 主色调（如背景色、边框色等）     |
| `--border-radius` | `35px`    | 圆角大小                  |
| `--font-size`     | `44px`    | 文字大小                  |

2. 通过 `style` 属性传递自定义样式：
```tsx
<SlopeTabs 
    tabList={tabList}
    activeTab={activeTab}
    onTabChange={setActiveTab}
    style={{
        '--tab-height': '100px',
        '--active-color': '#000000',
        '--default-color': '#cccccc',
        '--primary-color': '#ff0000',
        '--border-radius': '10px',
        '--font-size': '16px'
    }}
/>
  ```

## 开发与贡献

欢迎提交 Issue 和 PR！如果你有任何问题或建议，请通过 [GitHub Issues](https://github.com/0418wangweijie/wang-tabs/issues) 反馈。

## 许可证

本项目基于 [MIT 许可证](https://opensource.org/licenses/MIT) 开源。