import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import useCounterStore from '../../store/useCounterStore'
import './index.scss'

const ZustandDemo: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: 'Zustand 状态管理示例'
    })
  }, [])

  return (
    <View className='zustand-demo'>
      <View className='counter-value'>
        计数器: {count}
      </View>

      <View className='button-group'>
        <Button 
          type='primary' 
          className='button' 
          onClick={increment}
        >
          增加
        </Button>
        <Button 
          type='default' 
          className='button' 
          onClick={decrement}
        >
          减少
        </Button>
        <Button 
          type='warn' 
          className='button' 
          onClick={reset}
        >
          重置
        </Button>
      </View>

      <View className='info-section'>
        <View className='info-title'>关于 Zustand</View>
        <View className='info-content'>
          Zustand 是一个轻量级的状态管理库，使用简单且性能出色。它比 Redux 更简洁，比 Context API 更高效，
          非常适合 React 和 React Native 应用。在 Taro 中使用 Zustand 可以很方便地管理跨组件的状态。
        </View>
      </View>
    </View>
  )
}

export default ZustandDemo 