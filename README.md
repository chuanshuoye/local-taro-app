# Local Taro App

## 项目介绍

这是一个使用 Taro 框架开发的多端应用，支持微信小程序和H5网页。

## 项目特点

- 基于 Taro 4.0 和 React 18 开发
- 使用 NutUI React 组件库提供 UI 支持
- 采用 Zustand 进行状态管理
- 支持多端运行（微信小程序、H5等）

## 功能列表

- 首页服务展示
- 登录认证
- 个人中心
- 状态管理示例
- 洗车券二维码核销功能
  - 支持展示洗车券信息
  - 二维码显示
  - 扫码核销功能（H5和小程序环境）

## 安装依赖

```bash
# 安装项目依赖
pnpm install
```

## 运行项目

```bash
# 运行 H5 版本
pnpm run dev:h5

# 运行微信小程序版本
pnpm run dev:weapp
```

## 构建项目

```bash
# 构建 H5 版本
pnpm run build:h5

# 构建微信小程序版本
pnpm run build:weapp
```

## 洗车券核销功能使用说明

1. 在首页点击"标准洗车"或"精致洗车"服务进入洗车券核销页面
2. 页面展示洗车券的二维码和详细信息
3. 用户可以向服务人员出示二维码进行核销
4. H5环境下点击"扫码核销"按钮会弹出提示对话框
5. 小程序环境下点击"扫码核销"按钮会调起扫码功能

## 项目结构

```
|-- apps/              # 多类相关的app应用
|   `-- myApp/         # Taro应用
|-- packages/          # app之间可以共享的依赖包（使用软链接引用）
|   `-- ui-components/ # 共享UI组件
|-- utils/             # 全局可共享的通用工具类
|-- pnpm-workspace.yaml # pnpm工作区配置
```

## 技术栈

- Vite
- Taro 4.x
- React 18
- TypeScript
- NutUI
- Zustand（状态管理）
- SCSS/SASS

## Monorepo + pnpm

本项目采用monorepo + pnpm进行多包管理，可以在不同项目间共享组件和工具。

## 开发指南

### 安装依赖

首先全局安装pnpm（如已安装可跳过）：

```bash
npm install -g pnpm
```

然后在项目根目录安装依赖：

```bash
pnpm install
```

### 启动开发服务

#### 开发微信小程序：

```bash
pnpm dev:weapp
```

#### 开发H5：

```bash
pnpm dev:h5
```

### 生产构建

#### 微信小程序：

```bash
pnpm build:weapp
```

#### H5：

```bash
pnpm build:h5
```

## 状态管理

项目使用Zustand进行状态管理，示例代码：

```typescript
// 在 apps/myApp/src/store/useCounterStore.ts 中创建store

import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;
```

在组件中使用：

```typescript
import React from 'react';
import { View, Text } from '@tarojs/components';
import { Button } from '@local-taro-app/ui-components';
import useCounterStore from '../store/useCounterStore';

const Counter: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <View className="counter">
      <Text className="counter-value">计数：{count}</Text>
      <View className="counter-buttons">
        <Button type="primary" onClick={increment}>加一</Button>
        <Button type="primary" onClick={decrement}>减一</Button>
        <Button onClick={reset}>重置</Button>
      </View>
    </View>
  );
};

export default Counter;
```

## 共享组件使用

项目中的共享UI组件位于`packages/ui-components`目录，可在Taro应用中直接引用。

## 项目说明

1. 使用Taro作为跨端解决方案，可同时开发小程序和H5应用
2. 使用NutUI作为UI组件库，提供丰富的移动端组件
3. 使用Zustand作为状态管理工具，简单高效
4. 使用pnpm workspace管理monorepo结构，便于共享代码和组件

## 注意事项

1. 在开发前请确保有相应平台的开发者账号和配置
2. 在编写共享组件时注意兼容多端的特性和限制
3. 开发前请确保已安装相关依赖和开发工具