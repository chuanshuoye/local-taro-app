import React, { useState, useEffect } from 'react';
import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const MockDemoPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [loginResult, setLoginResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await Taro.request({
        url: '/api/users',
        method: 'GET'
      });
      
      if (res.statusCode === 200 && res.data) {
        setUsers(Array.isArray(res.data) ? res.data : res.data.data || []);
      }
    } catch (error) {
      console.error('获取用户列表失败', error);
      Taro.showToast({
        title: '获取用户列表失败',
        icon: 'none'
      });
    } finally {
      setLoading(false);
    }
  };

  // 获取商品详情
  const fetchProduct = async () => {
    setLoading(true);
    // 随机商品ID
    const randomId = Math.floor(Math.random() * 100) + 1;
    
    try {
      const res = await Taro.request({
        url: `/api/products/${randomId}`,
        method: 'GET'
      });
      
      if (res.statusCode === 200 && res.data) {
        setProduct(res.data.data || res.data);
      }
    } catch (error) {
      console.error('获取商品详情失败', error);
      Taro.showToast({
        title: '获取商品详情失败',
        icon: 'none'
      });
    } finally {
      setLoading(false);
    }
  };

  // 模拟登录
  const login = async () => {
    setLoading(true);
    try {
      const res = await Taro.request({
        url: '/api/login',
        method: 'POST',
        data: {
          username: 'admin',
          password: 'password'
        }
      });
      
      setLoginResult(res.data.data || res.data);
      
      Taro.showToast({
        title: '登录成功',
        icon: 'success'
      });
    } catch (error) {
      console.error('登录失败', error);
      Taro.showToast({
        title: '登录失败',
        icon: 'none'
      });
    } finally {
      setLoading(false);
    }
  };

  // 模拟登录失败
  const loginFail = async () => {
    setLoading(true);
    try {
      const res = await Taro.request({
        url: '/api/login',
        method: 'POST',
        data: {
          username: 'wrong',
          password: 'wrong'
        }
      });
      
      setLoginResult(res.data.data || res.data);
      
      if (!res.data.success) {
        Taro.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('登录失败', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='mock-page'>
      <View className='header'>
        <Text className='title'>MSW 模拟接口演示</Text>
        <Text className='subtitle'>使用 MSW 替代 @tarojs/plugin-mock</Text>
      </View>

      <View className='section'>
        <Text className='section-title'>用户列表</Text>
        <Button 
          onClick={fetchUsers} 
          disabled={loading}
          type='primary'
          className='action-button'
        >
          获取用户列表
        </Button>
        
        {users.length > 0 && (
          <View className='result-box'>
            {users.map(user => (
              <View key={user.id} className='user-item'>
                <Text>{user.name} - {user.age}岁</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View className='section'>
        <Text className='section-title'>商品详情</Text>
        <Button 
          onClick={fetchProduct} 
          disabled={loading}
          type='primary'
          className='action-button'
        >
          获取随机商品
        </Button>
        
        {product && (
          <View className='result-box'>
            <View className='product-item'>
              <Text className='product-name'>{product.name}</Text>
              <Text className='product-price'>价格: ¥{product.price}</Text>
              <Text className='product-desc'>{product.description}</Text>
            </View>
          </View>
        )}
      </View>

      <View className='section'>
        <Text className='section-title'>登录接口</Text>
        <View className='button-group'>
          <Button 
            onClick={login} 
            disabled={loading}
            type='primary'
            className='action-button'
          >
            登录成功
          </Button>
          
          <Button 
            onClick={loginFail} 
            disabled={loading}
            type='default'
            className='action-button'
          >
            登录失败
          </Button>
        </View>
        
        {loginResult && (
          <View className='result-box'>
            <View className='login-result'>
              {loginResult.token ? (
                <>
                  <Text className='success-text'>登录成功</Text>
                  <Text>Token: {loginResult.token}</Text>
                  {loginResult.user && (
                    <Text>用户: {loginResult.user.username} (角色: {loginResult.user.role})</Text>
                  )}
                </>
              ) : (
                <Text className='error-text'>{loginResult.message || '登录失败'}</Text>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MockDemoPage; 