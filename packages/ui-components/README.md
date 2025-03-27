# @local/ui-components

基于Vite和React的本地UI组件库

## 安装

```bash
pnpm add @local/ui-components
```

## 开发

```bash
# 启动开发服务器
pnpm dev

# 构建组件库
pnpm build

# 预览构建结果
pnpm preview
```

## 使用

```jsx
import { Button, Card } from '@local/ui-components';
import '@local/ui-components/dist/style.css'; // 导入样式

function App() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Card title="标题">内容</Card>
    </div>
  );
}
```

## 组件

### Button 按钮

按钮组件用于触发操作。

```jsx
<Button type="primary" size="large" onClick={() => console.log('点击')}>
  按钮文本
</Button>
```

#### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | 'primary' \| 'default' \| 'danger' \| 'warning' | 'default' |
| size | 按钮尺寸 | 'large' \| 'medium' \| 'small' | 'medium' |
| disabled | 是否禁用 | boolean | false |
| onClick | 点击事件 | () => void | - |

### Card 卡片

卡片容器组件。

```jsx
<Card title="卡片标题" bordered={true}>
  卡片内容
</Card>
```

#### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | React.ReactNode | - |
| bordered | 是否有边框 | boolean | true |
| style | 卡片样式 | React.CSSProperties | - |
| className | 卡片类名 | string | - | 