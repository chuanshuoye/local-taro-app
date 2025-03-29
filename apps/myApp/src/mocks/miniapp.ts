import { http } from 'msw';
import { handlers } from './handlers';
import Taro from '@tarojs/taro';

// 拦截小程序的请求
function setupMiniAppMock() {
  if (process.env.NODE_ENV === 'production') return;
  
  // 保存原始的request方法
  const originalRequest = Taro.request;
  
  // 重写request方法 - 使用类型断言解决类型不匹配问题
  // @ts-ignore - 忽略类型错误，因为我们知道实现是安全的
  Taro.request = (options) => {
    const { url, method = 'GET', data } = options;
    
    // 构建完整URL
    const fullUrl = /^https?:\/\//.test(url) 
      ? url 
      : `https://mock.example.com${url}`;
    
    console.log(`[MSW] 拦截到请求: ${method} ${fullUrl}`);
    
    // 查找匹配的处理器
    const matchingHandler = handlers.find((handler) => {
      // 简单匹配，实际使用中可能需要更复杂的匹配逻辑
      const handlerPath = String(handler.info.path);
      const handlerMethod = String(handler.info.method);
      
      const urlMatches = fullUrl.includes(handlerPath) || 
                         handlerPath.includes(':id') && fullUrl.match(/\/\d+$/);
      const methodMatches = handlerMethod.toUpperCase() === String(method).toUpperCase();
      
      return urlMatches && methodMatches;
    });
    
    if (matchingHandler) {
      // 模拟延迟
      const delay = Math.random() * 300;
      
      // 返回一个包装过的Promise，模拟RequestTask接口
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          // 处理请求并返回模拟数据
          resolve({
            statusCode: 200,
            // @ts-ignore - 忽略类型错误
            data: {
              success: true,
              // 根据不同URL返回不同的模拟数据
              data: getMockDataForUrl(url, data),
            },
            header: { 'Content-Type': 'application/json' },
          });
        }, delay);
      });

      // 添加RequestTask所需方法以满足类型要求
      // @ts-ignore
      promise.abort = () => {};
      // @ts-ignore
      promise.onHeadersReceived = () => {};
      // @ts-ignore
      promise.offHeadersReceived = () => {};
      // @ts-ignore
      promise.onChunkReceived = () => {};
      // @ts-ignore
      promise.offChunkReceived = () => {};

      // @ts-ignore - 返回增强后的Promise
      return promise;
    }
    
    // 对于没有匹配的请求，使用原始方法
    return originalRequest(options);
  };
  
  console.log('[MSW] 小程序请求拦截器已启动');
}

// 根据URL获取模拟数据的辅助函数
function getMockDataForUrl(url: string, requestData: any) {
  // 用户列表
  if (url.includes('/api/users')) {
    return [
      { id: 1, name: '张三', age: 28 },
      { id: 2, name: '李四', age: 32 },
      { id: 3, name: '王五', age: 25 },
    ];
  }
  
  // 登录接口
  if (url.includes('/api/login')) {
    const { username, password } = requestData || {};
    
    if (username === 'admin' && password === 'password') {
      return {
        token: 'mock-jwt-token-12345',
        user: { id: 1, username: 'admin', role: 'admin' }
      };
    } else {
      return { message: '用户名或密码错误' };
    }
  }
  
  // 产品详情
  if (url.match(/\/api\/products\/\d+/)) {
    const id = url.match(/\/(\d+)$/)?.[1];
    return {
      id,
      name: `商品${id}`,
      price: Math.floor(Math.random() * 1000),
      description: `这是商品${id}的详细描述`
    };
  }
  
  // 默认返回空对象
  return {};
}

export { setupMiniAppMock }; 