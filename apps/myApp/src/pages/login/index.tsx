import React, { useState } from 'react'
import { View, Text, Input, Image, Checkbox, CheckboxGroup } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import { Eye, Close } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import useUserStore from '../../store/useUserStore'
import './index.scss'

// 模拟验证码API
const mockSendVerifyCode = (phone: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单验证: 手机号长度为11位则发送成功
      if (phone && phone.length === 11) {
        resolve(true)
      } else {
        resolve(false)
      }
    }, 500)
  })
}

// 模拟登录API
const mockLogin = (phone: string, verifyCode: string): Promise<{success: boolean, username?: string}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单验证: 手机号长度为11位且验证码不为空则登录成功
      if (phone && phone.length === 11 && verifyCode) {
        resolve({
          success: true,
          username: `用户${phone.substring(7)}`
        })
      } else {
        resolve({
          success: false
        })
      }
    }, 1000)
  })
}

const Login: React.FC = () => {
  const { setUserInfo } = useUserStore()
  const [phone, setPhone] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // 校验表单
  const isFormValid = () => {
    return phone.trim().length === 11 && verifyCode.trim() !== '' && agreedToTerms
  }

  // 校验手机号
  const isPhoneValid = () => {
    return phone.trim().length === 11
  }

  // 显示提示信息
  const showToast = (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }

  // 发送验证码
  const sendVerifyCode = async () => {
    if (!isPhoneValid()) {
      showToast('请输入正确的手机号')
      return
    }

    try {
      const result = await mockSendVerifyCode(phone)
      if (result) {
        showToast('验证码发送成功')
        // 开始倒计时
        setCountdown(60)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        showToast('验证码发送失败，请稍后再试')
      }
    } catch (error) {
      showToast('验证码发送失败，请稍后再试')
      console.error('验证码发送异常:', error)
    }
  }

  // 登录处理
  const handleLogin = async () => {
    if (!isFormValid()) {
      showToast('请输入手机号、验证码并同意用户协议')
      return
    }

    setLoading(true)
    try {
      const result = await mockLogin(phone, verifyCode)
      if (result.success) {
        // 存储token
        Taro.setStorageSync('token', 'mock-token-value')
        
        // 存储用户信息到store
        if (result.username) {
          setUserInfo(result.username, phone)
        }
        
        Taro.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        })
        
        // 登录成功后延迟跳转
        setTimeout(() => {
          Taro.switchTab({
            url: '/pages/index/index'
          })
        }, 1500)
      } else {
        showToast('手机号或验证码错误')
      }
    } catch (error) {
      showToast('登录失败，请稍后再试')
      console.error('登录异常:', error)
    } finally {
      setLoading(false)
    }
  }

  // 忘记密码
  const handleForgotPassword = () => {
    showToast('忘记密码功能开发中...')
  }

  // 注册新账户
  const handleRegister = () => {
    showToast('注册功能开发中...')
  }

  // 用户协议点击
  const handleTermsClick = () => {
    Taro.showModal({
      title: '用户协议与隐私条款',
      content: '感谢您使用小鲨车服。使用我们的服务即表示您同意我们的用户协议和隐私政策。我们将依法保护您的个人信息安全。',
      confirmText: '我知道了',
      showCancel: false
    })
  }

  return (
    <View className='login-container'>
      <Image className='logo' src='https://placeholder.pics/svg/120/1296DB/FFFFFF/LOGO' />
      <Text className='title'>小鲨车服</Text>

      <View className='form-container'>
        <View className='form-item'>
          <Text className='label'>手机号</Text>
          <Input
            className='input'
            type='number'
            maxlength={11}
            placeholder='请输入手机号'
            value={phone}
            onInput={(e) => setPhone(e.detail.value)}
          />
        </View>

        <View className='form-item verify-code-item'>
          <Text className='label'>验证码</Text>
          <Input
            className='input verify-code-input'
            type='number'
            maxlength={6}
            placeholder='请输入验证码'
            value={verifyCode}
            onInput={(e) => setVerifyCode(e.detail.value)}
          />
          <Button 
            className='send-code-btn'
            disabled={!isPhoneValid() || countdown > 0}
            onClick={sendVerifyCode}
          >
            {countdown > 0 ? `${countdown}秒后重发` : '获取验证码'}
          </Button>
        </View>

        <View className='terms-container'>
          <CheckboxGroup>
            <Checkbox 
              className='terms-checkbox' 
              checked={agreedToTerms} 
              value='agreed'
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              color='#1296db'
            />
          </CheckboxGroup>
          <View className='terms-text'>
            <Text>同意</Text>
            <Text className='terms-link' onClick={handleTermsClick}>《用户协议》和《隐私条款》</Text>
          </View>
        </View>

        <Button 
          className={`btn-login ${!isFormValid() ? 'btn-disabled' : ''}`}
          disabled={!isFormValid() || loading}
          loading={loading}
          onClick={handleLogin}
        >
          登录
        </Button>

        <View className='extra-options'>
          <Text onClick={handleForgotPassword}>忘记密码</Text>
          <Text onClick={handleRegister}>注册新账户</Text>
        </View>
      </View>

      <Text className='footer-text'>© 2023 小鲨车服 版权所有</Text>
    </View>
  )
}

export default Login 