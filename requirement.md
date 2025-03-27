# 基于taro脚手架开发H5、小程序多端应用

## 技术栈
- vite
- taro
- Nutui

## 状态管理
- zustand

## 工程结构
使用monorepo+pnpm管理，共享依赖包：packages

## 整体项目结构
- apps // 多类相关的app应用，比如taro应用
- packages // app之间可以共享的依赖包，使用软链接引用
- utils // 全局可共享的通用工具类
