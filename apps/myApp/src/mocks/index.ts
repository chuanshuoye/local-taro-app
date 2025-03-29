import Taro from '@tarojs/taro';
import { startWorker } from './browser';
import { setupMiniAppMock } from './miniapp';

// 初始化 MSW
export function setupMockService() {
  // 只在开发环境下启用
  if (process.env.NODE_ENV !== 'development') return;

  console.log('[MSW] 正在初始化模拟服务...');
  
  // 判断环境并初始化对应的 mock 服务
  if (process.env.TARO_ENV === 'h5') {
    // 浏览器环境使用 MSW Worker
    console.log('[MSW] 检测到H5环境，使用浏览器模拟服务');
    startWorker()
      .catch(err => console.error('[MSW] 启动失败:', err));
  } else {
    // 小程序环境使用请求拦截
    console.log('[MSW] 检测到小程序环境，使用请求拦截模拟服务');
    setupMiniAppMock();
  }
} 