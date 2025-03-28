import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const Banner: React.FC = () => {
  return (
    <View className='banner'>
      <View className='banner-content'>
        <View className='banner-title'>
          <Text className='banner-logo'>小鲨车服</Text>
          <Text className='banner-slogan'>您的养车用车</Text>
          <Text className='banner-slogan-sub'>一站式平台</Text>
        </View>
        <View className='banner-tags'>
          <Text className='banner-tag'>全国覆盖</Text>
          <Text className='banner-tag'>专业服务</Text>
          <Text className='banner-tag'>售后保障</Text>
          <Text className='banner-tag'>无忧养车</Text>
        </View>
        <View className='banner-image'>
          {/* 虚拟图标，实际应该导入图片 */}
          <Text className='banner-icon'>🚘</Text>
        </View>
      </View>
    </View>
  )
}

export default Banner 