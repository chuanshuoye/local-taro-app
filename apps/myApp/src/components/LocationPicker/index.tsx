import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface LocationProps {
  location: {
    city: string
    onChange: () => void
  }
}

const LocationPicker: React.FC<LocationProps> = ({ location }) => {
  return (
    <View className='location-picker' onClick={location.onChange}>
      <View className='location-icon'>📍</View>
      <Text className='location-text'>{location.city}</Text>
      <View className='location-arrow'>▼</View>
    </View>
  )
}

export default LocationPicker 