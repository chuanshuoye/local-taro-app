import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ConfigProvider, Dialog, Toast } from '@nutui/nutui-react-taro'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'
import './index.scss'

const CarWashVerification = () => {
  // 票券数据状态
  const [ticketData, setTicketData] = useState({
    id: 'WX2023120100001',
    name: '标准洗车券',
    status: 'unused', // unused: 未使用, used: 已使用, expired: 已过期
    validUntil: '2023-12-31',
    shopName: '车洁仕旗舰店',
    shopAddress: '北京市海淀区中关村大街1号',
    shopTel: '010-12345678',
  })

  // 二维码数据，实际项目中应从API获取
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  
  // 对话框
  const [dialogVisible, setDialogVisible] = useState(false)
  
  // 模拟加载二维码
  useEffect(() => {
    // 在实际项目中，这里应该调用后端API获取二维码
    // 这里暂时使用模拟数据
    setTimeout(() => {
      setQrCodeUrl('https://example.com/qrcode.png')
    }, 1000)
  }, [])

  // 显示状态对应的文本和样式
  const getStatusInfo = () => {
    switch (ticketData.status) {
      case 'unused':
        return { text: '未使用', color: '#3a7afe' }
      case 'used':
        return { text: '已使用', color: '#999999' }
      case 'expired':
        return { text: '已过期', color: '#ff4d4f' }
      default:
        return { text: '未知状态', color: '#999999' }
    }
  }

  // 处理扫码核销
  const handleScan = () => {
    // 如果是h5环境，弹窗提示需要调起相机扫码
    if (process.env.TARO_ENV === 'h5') {
      setDialogVisible(true)
    } else {
      // 在小程序环境中调用扫码API
      Taro.scanCode({
        success: (res) => {
          console.log('扫码结果：', res)
          // 假设扫码成功后会返回核销结果
          // 实际中需要将扫码结果发送给服务器验证
          showVerificationResult(true)
        },
        fail: (err) => {
          console.error('扫码失败：', err)
          Taro.showToast({
            title: '扫码失败，请重试',
            icon: 'none'
          })
        }
      })
    }
  }

  // 对话框确认
  const handleDialogConfirm = () => {
    setDialogVisible(false)
    // 模拟核销成功
    showVerificationResult(true)
  }

  // 显示核销结果
  const showVerificationResult = (success: boolean) => {
    if (success) {
      // 更新状态为已使用
      setTicketData({
        ...ticketData,
        status: 'used'
      })
      
      Taro.showToast({
        title: '核销成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      Taro.showToast({
        title: '核销失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  }

  // 状态信息
  const statusInfo = getStatusInfo()
  
  return (
    <ConfigProvider locale={zhCN}>
      <View className='car-wash-verification'>
        <View className='qr-section'>
          <Text className='qr-title'>洗车券二维码</Text>
          
          <View className='qr-container'>
            {qrCodeUrl ? (
              <Image 
                src={qrCodeUrl} 
                mode='aspectFit'
                style={{width: '220px', height: '220px'}}
              />
            ) : (
              <View className='qr-placeholder'>
                <Text>二维码加载中...</Text>
              </View>
            )}
          </View>
          
          <Text className='qr-instructions'>
            请向服务人员出示此二维码进行核销
          </Text>
        </View>
        
        <View className='ticket-info'>
          <Text className='info-title'>券信息</Text>
          
          <View className='info-item'>
            <Text className='label'>券名称</Text>
            <Text className='value'>{ticketData.name}</Text>
          </View>
          
          <View className='info-item'>
            <Text className='label'>券编号</Text>
            <Text className='value'>{ticketData.id}</Text>
          </View>
          
          <View className='info-item'>
            <Text className='label'>有效期至</Text>
            <Text className='value'>{ticketData.validUntil}</Text>
          </View>
          
          <View className='info-item'>
            <Text className='label'>状态</Text>
            <Text className='value' style={{color: statusInfo.color}}>
              {statusInfo.text}
            </Text>
          </View>
          
          <View className='info-item'>
            <Text className='label'>适用门店</Text>
            <Text className='value'>{ticketData.shopName}</Text>
          </View>
          
          <View className='info-item'>
            <Text className='label'>门店地址</Text>
            <Text className='value'>{ticketData.shopAddress}</Text>
          </View>
          
          <View className='info-item'>
            <Text className='label'>联系电话</Text>
            <Text className='value'>{ticketData.shopTel}</Text>
          </View>
        </View>
        
        <View 
          className={`action-button ${ticketData.status !== 'unused' ? 'disabled-button' : ''}`}
          onClick={ticketData.status === 'unused' ? handleScan : undefined}
        >
          {ticketData.status === 'unused' ? '扫码核销' : '已核销'}
        </View>
        
        {/* 扫码核销确认弹窗 */}
        <Dialog
          title="扫码核销"
          content="请让工作人员扫描二维码进行核销"
          visible={dialogVisible}
          onConfirm={handleDialogConfirm}
          onCancel={() => setDialogVisible(false)}
        />
      </View>
    </ConfigProvider>
  )
}

export default CarWashVerification 