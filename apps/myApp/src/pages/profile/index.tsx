import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { ConfigProvider, Picker, DatePicker, Dialog, Input, Cell } from '@nutui/nutui-react-taro'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'
import useUserStore from '../../store/useUserStore'
import './index.scss'
import { GENDER_OPTIONS } from '../../constants'

 // 业务逻辑方法
 const getGenderText = (gender) => {
  if (!gender) return '请选择'
  const option = GENDER_OPTIONS.find(item => item.value === gender)
  return option ? option.text : '请选择'
}

const Profile: React.FC = () => {
  // 使用合并后的useUserStore
  const { 
    username, 
    gender,
    birthday,
    phone,
    setUsername,
    setGender,
    setBirthday
  } = useUserStore()
  
  // UI状态
  const [genderPickerVisible, setGenderPickerVisible] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [usernameDialogVisible, setUsernameDialogVisible] = useState(false)
  const [inputUsername, setInputUsername] = useState('')
  
  // 处理性别选择确认
  const confirmGenderPicker = (options, values) => {
    setGender(values?.[0] || options?.[0]?.[0]?.value)
    setGenderPickerVisible(false)
  }
  
  // 处理日期选择确认
  const confirmDatePicker = (selectedDate) => {
    // 处理日期选择器确认事件
    
    setBirthday(selectedDate.map((option) => option.text).join('-'))
    setDatePickerVisible(false)
  }

  // 打开用户名修改弹窗
  const openUsernameDialog = () => {
    setInputUsername(username || '')
    setUsernameDialogVisible(true)
  }

  // 确认修改用户名
  const confirmUsername = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim())
    }
    setUsernameDialogVisible(false)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <View className='profile-page'>
        {/* 个人信息区域 */}
        <View className='info-section'>
          <Text className='section-title'>个人信息</Text>
          
          <View className='info-item' onClick={openUsernameDialog}>
            <Text className='label'>用户名</Text>
            <View className='value'>
              <Text>{username || '188****5678'}</Text>
              <Text className='arrow'>{'>'}</Text>
            </View>
          </View>
          
          {/* 用户名修改弹窗 */}
          <Dialog
            title="修改用户名"
            visible={usernameDialogVisible}
            onConfirm={confirmUsername}
            onCancel={() => setUsernameDialogVisible(false)}
          >
            <Input 
              placeholder="请输入用户名"
              value={inputUsername}
              onChange={(value) => setInputUsername(value)}
            />
          </Dialog>
          
          <View className='info-item' onClick={() => setGenderPickerVisible(true)}>
            <Text className='label'>性别</Text>
            <View className='value'>
              <Text>{getGenderText(gender)}</Text>
              <Text className='arrow'>{'>'}</Text>
            </View>
          </View>
          
          {/* 性别选择器 */}
          <Picker
            visible={genderPickerVisible}
            options={[GENDER_OPTIONS]}
            defaultValue={[gender]}
            onClose={() => setGenderPickerVisible(false)}
            onConfirm={(list, values) => confirmGenderPicker(list, values)}
            title="请选择性别"
          />
          
          <View className='info-item' onClick={() => setDatePickerVisible(true)}>
            <Text className='label'>出生日期</Text>
            <View className='value'>
              <Text>{birthday || '请选择'}</Text>
              <Text className='arrow'>{'>'}</Text>
            </View>
          </View>
          
          {/* 日期选择器 */}
          <DatePicker
            visible={datePickerVisible}
            title="请选择出生日期"
            onClose={() => setDatePickerVisible(false)}
            onConfirm={confirmDatePicker}
            startDate={new Date(1950, 0, 1)}
            endDate={new Date()}
          />
          
          <View className='info-item'>
            <Text className='label'>联系电话</Text>
            <View className='value'>
              <Text>{phone || '18812345678'}</Text>
              <Text className='arrow'>{'>'}</Text>
            </View>
          </View>
        </View>
        
        {/* 车辆信息 */}
        <View className='box-area'>
          <Text className='box-title'>车辆信息</Text>
        </View>
        
        {/* 收货地址 */}
        <View className='box-area'>
          <Text className='box-title'>收货地址</Text>
        </View>
        
        {/* 协议信息 */}
        <View className='protocol-section'>
          <Text className='section-title'>协议信息</Text>
          
          <Cell
            className='protocol-item'
            title='《XX用户协议》'
            isLink
            onClick={() => {}}
          />
          
          <Cell
            className='protocol-item'
            title='《隐私协议》'
            isLink
            onClick={() => {}}
          />
        </View>
      </View>
    </ConfigProvider>
  )
}

export default Profile 