import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 这个配置用于浏览器环境下的模拟服务
export const worker = setupWorker(...handlers);

// 异步启动函数，便于调用
export async function startWorker() {
  // 只在非生产环境下启用
  if (process.env.NODE_ENV !== 'production') {
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
} 