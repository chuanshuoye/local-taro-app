import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View className='header'>
      <View className='header-left'>
        <Text className='header-back'>←</Text>
      </View>
      <View className='header-title'>
        <Text>{title}</Text>
      </View>
      <View className='header-right'>
        <Text className='header-menu'>⋯</Text>
      </View>
    </View>
  )
}

export default Header 