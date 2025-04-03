import { create } from 'zustand'

interface UserState {
  // 用户基础信息
  username: string
  // 手机号
  phone: string
  // 登录状态
  isLoggedIn: boolean
  // 设置用户名
  setUsername: (username: string) => void
  // 设置手机号
  setPhone: (phone: string) => void
  // 设置用户信息（同时设置用户名和手机号）
  setUserInfo: (username: string, phone: string) => void
  // 清除用户信息
  clearUser: () => void
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  phone: '',
  isLoggedIn: false,
  
  setUsername: (username: string) => 
    set({ username, isLoggedIn: true }),
    
  setPhone: (phone: string) => 
    set({ phone }),
  
  setUserInfo: (username: string, phone: string) => 
    set({ username, phone, isLoggedIn: true }),
  
  clearUser: () => 
    set({ username: '', phone: '', isLoggedIn: false })
}))

export default useUserStore 