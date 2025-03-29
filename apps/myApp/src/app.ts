import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
// 全局样式
import './app.scss'

// 只在开发环境下初始化模拟服务
if (process.env.NODE_ENV === 'development') {
  try {
    if (process.env.TARO_ENV === 'h5') {
      // H5环境
      setTimeout(() => {
        // 延迟加载避免初始化问题
        // @ts-ignore - 忽略类型错误
        require('./mocks/h5-init').setupH5MockService();
      }, 100);
    } else {
      // 小程序环境
      // @ts-ignore - 忽略类型错误
      require('./mocks/miniapp-init').setupMiniAppMock();
    }
  } catch (err) {
    console.error('加载模拟服务失败:', err);
  }
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
