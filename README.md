# wang-tabs

一个现代化的 React 选项卡组件库，提供了两种风格的选项卡组件：SlopeTabs 和 ElevatedSlopeTabs。

## 特性

- 🎨 现代化的设计风格
- 🚀 轻量级，无外部依赖
- 💪 使用 TypeScript 开发，提供完整的类型支持
- 🎯 支持自定义样式和主题
- 📱 响应式设计，支持移动端

## 安装

```bash
npm install wang-tabs
# 或
yarn add wang-tabs
```

## 快速开始

```jsx
import { SlopeTabs } from 'wang-tabs';

const tabList = [
  {
    name: 'tab1',
    label: '选项卡1',
    render: () => <div>选项卡1内容</div>
  },
  {
    name: 'tab2',
    label: '选项卡2',
    render: () => <div>选项卡2内容</div>
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <SlopeTabs
      tabList={tabList}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}
```

## 样式处理

### SCSS 支持

本项目使用 SCSS 进行样式编写，所有组件样式均采用模块化方式管理。您可以通过以下方式自定义样式：

1. 直接修改 SCSS 变量
2. 通过 CSS 变量覆盖默认样式
3. 使用 `style` 和 `rootStyle` props 传递自定义样式

### 单位转换

为了更好的响应式支持，项目中使用了 `postcss-pxtorem` 插件将 px 单位自动转换为 rem 单位。转换规则如下：

- 根字体大小 (rootValue): 16px
- 转换精度 (unitPrecision): 5 位小数
- 最小转换值 (minPixelValue): 1px

这意味着在 SCSS 文件中编写的 px 值会在编译时自动转换为 rem 单位。例如：

```scss
// 输入
.example {
    width: 56px;
}

// 输出
.example {
    width: 2rem; /* 32px / 16px */
}
```

---

## SlopeTabs 组件

### Props 说明

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
|---------------|-----------------------------|----|-----|----------------------------------------------|
| `tabList` | `Array<Tab>` | 是 | - | 选项卡列表，每个选项卡包含 `name`、`label` 和 `render` 方法。 |
| `activeTab` | `string` | 是 | - | 当前选中的选项卡名称。 |
| `onTabChange` | `(tabName: string) => void` | 是 | - | 选项卡切换时的回调函数，返回选中的选项卡名称。 |
| `style` | `React.CSSProperties` | 否 | - | 自定义容器样式。 |
| `rootStyle` | `React.CSSProperties` | 否 | - | 自定义根容器样式。 |

## ElevatedSlopeTabs 组件

### Props 说明

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
|---------------|-----------------------------|----|-----|----------------------------------------------|
| `tabList` | `Array<Tab>` | 是 | - | 选项卡列表，每个选项卡包含 `name`、`label` 和 `render` 方法。 |
| `activeTab` | `string` | 是 | - | 当前选中的选项卡名称。 |
| `onTabChange` | `(tabName: string) => void` | 是 | - | 选项卡切换时的回调函数，返回选中的选项卡名称。 |
| `style` | `React.CSSProperties` | 否 | - | 自定义容器样式。 |
| `rootStyle` | `React.CSSProperties` | 否 | - | 自定义根容器样式。 |

## 版本历史

### v1.1.1
- 优化组件样式
- 改进类型定义
- 修复已知问题

### v1.0.0
- 首次发布
- 提供 SlopeTabs 和 ElevatedSlopeTabs 两个组件

## 开发与贡献

欢迎提交 Issue 和 PR！如果你有任何问题或建议，请通过 [GitHub Issues](https://github.com/0418wangweijie/wang-tabs/issues) 反馈。

## 许可证

MIT
