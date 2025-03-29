import Taro from '@tarojs/taro';

// 拦截小程序的请求
export function setupMiniAppMock() {
  if (process.env.NODE_ENV !== 'development') return;
  
  console.log('[Mock] 小程序请求拦截器初始化中...');
  
  // 保存原始的request方法
  const originalRequest = Taro.request;
  
  // 重写request方法
  // @ts-ignore - 忽略类型错误，因为我们知道实现是安全的
  Taro.request = (options) => {
    const { url, method = 'GET', data } = options;
    
    // 构建完整URL
    const fullUrl = /^https?:\/\//.test(url) 
      ? url 
      : `https://mock.example.com${url}`;
    
    console.log(`[Mock] 拦截到请求: ${method} ${fullUrl}`);
    
    // 检查URL并提供模拟数据
    if (url.includes('/api/users')) {
      // 返回用户列表
      return mockSuccessResponse([
        { id: 1, name: '张三', age: 28 },
        { id: 2, name: '李四', age: 32 },
        { id: 3, name: '王五', age: 25 },
      ]);
    } 
    
    if (url.includes('/api/login')) {
      // 登录接口
      const loginData = data as { username?: string; password?: string } || {};
      const { username, password } = loginData;
      
      if (username === 'admin' && password === 'password') {
        return mockSuccessResponse({
          token: 'mock-jwt-token-12345',
          user: { id: 1, username: 'admin', role: 'admin' }
        });
      } else {
        return mockSuccessResponse({ message: '用户名或密码错误' }, false);
      }
    }
    
    if (url.match(/\/api\/products\/\d+/)) {
      // 产品详情
      const id = url.match(/\/(\d+)$/)?.[1];
      return mockSuccessResponse({
        id,
        name: `商品${id}`,
        price: Math.floor(Math.random() * 1000),
        description: `这是商品${id}的详细描述`
      });
    }
    
    // 对于没有匹配的请求，使用原始方法
    return originalRequest(options);
  };
  
  console.log('[Mock] 小程序请求拦截器已启动');
}

// 创建模拟成功响应的辅助函数
function mockSuccessResponse(data: any, success = true) {
  // 模拟延迟
  const delay = Math.random() * 300;
  
  // 返回一个包装过的Promise，模拟RequestTask接口
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: success ? 200 : 401,
        data: {
          success,
          data,
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