import React from 'react'
import { View, Text } from '@tarojs/components'
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
  return (
    <View className='service-grid'>
      {title && (
        <View className='service-grid-title'>
          <Text>{title}</Text>
        </View>
      )}
      <View className='service-grid-content'>
        {services.map(service => (
          <View className='service-item' key={service.id}>
            <View className='service-icon'>{service.icon}</View>
            <Text className='service-title'>{service.title}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default ServiceGrid 