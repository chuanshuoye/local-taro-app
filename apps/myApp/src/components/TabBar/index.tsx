import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

const TabBar: React.FC = () => {
  const tabs = [
    { id: 1, icon: '🚗', title: '汽车服务' },
    { id: 2, icon: '☕', title: '生活服务' },
    { id: 3, icon: '❤️', title: '健康服务' },
    { id: 4, icon: '👤', title: '个人中心' }
  ]
  
  return (
    <View className='tab-bar'>
      {tabs.map(tab => (
        <View className='tab-item' key={tab.id}>
          <View className='tab-icon'>{tab.icon}</View>
          <Text className='tab-title'>{tab.title}</Text>
        </View>
      ))}
    </View>
  )
}

export default TabBar 