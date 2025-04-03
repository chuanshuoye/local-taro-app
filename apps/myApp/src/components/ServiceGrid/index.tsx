import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

interface Service {
  id: number
  icon: string
  title: string
}

interface ServiceGridProps {
  title?: string
  services: Service[]
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ title, services }) => {
  // 处理服务项点击
  const handleServiceClick = (service: Service) => {
    console.log('点击了服务:', service.title)
    
    // 如果点击的是洗车相关服务，跳转到洗车券核销页面
    if (service.title.includes('洗车')) {
      Taro.navigateTo({
        url: '/pages/car-wash-verification/index'
      })
    } else {
      // 其他服务暂时显示提示
      Taro.showToast({
        title: `${service.title}功能开发中...`,
        icon: 'none',
        duration: 2000
      })
    }
  }
  
  return (
    <View className='service-grid'>
      {title && (
        <View className='service-grid-title'>
          <Text>{title}</Text>
        </View>
      )}
      <View className='service-grid-content'>
        {services.map(service => (
          <View 
            className='service-item' 
            key={service.id}
            onClick={() => handleServiceClick(service)}
          >
            <View className='service-icon'>{service.icon}</View>
            <Text className='service-title'>{service.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ServiceGrid 