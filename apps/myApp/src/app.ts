import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.scss'
// 导入MSW模拟服务
import { setupMockService } from './mocks'

// 初始化模拟服务（开发环境）
if (process.env.NODE_ENV === 'development') {
  setupMockService();
}

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    // 应用初始化逻辑
  })

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
