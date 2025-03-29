import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 这个配置用于浏览器环境下的模拟服务
export const worker = setupWorker(...handlers);

// H5环境的MSW初始化函数
export async function setupH5MockService() {
  // 只在开发环境下启用
  if (process.env.NODE_ENV !== 'development') return;

  console.log('[MSW] 正在初始化H5环境的模拟服务...');
  
  try {
    // 启动worker并打印控制台消息
    await worker.start({
      onUnhandledRequest: 'bypass', // 不处理的请求直接通过
    });
    console.log('[MSW] 模拟服务器已启动');
  } catch (error) {
    console.error('[MSW] 启动失败:', error);
  }
} 