import { http, HttpResponse } from 'msw';

// 定义API处理器
export const handlers = [
  // 示例GET请求
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: '张三', age: 28 },
      { id: 2, name: '李四', age: 32 },
      { id: 3, name: '王五', age: 25 },
    ]);
  }),

  // 示例POST请求
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as { 
      username: string;
      password: string;
    };
    
    if (username === 'admin' && password === 'password') {
      return HttpResponse.json({ 
        success: true, 
        token: 'mock-jwt-token-12345',
        user: { id: 1, username: 'admin', role: 'admin' }
      });
    }
    
    return new HttpResponse(
      JSON.stringify({ success: false, message: '用户名或密码错误' }), 
      { status: 401 }
    );
  }),

  // 示例动态路由
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    
    return HttpResponse.json({
      id,
      name: `商品${id}`,
      price: Math.floor(Math.random() * 1000),
      description: `这是商品${id}的详细描述`
    });
  })
]; 