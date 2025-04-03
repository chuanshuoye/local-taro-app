import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  // 用户基础信息
  username: string
  // 手机号
  phone: string
  // 性别
  gender: string
  // 出生日期
  birthday: string
  // 登录状态
  isLoggedIn: boolean
  
  // 设置用户信息方法
  setUsername: (username: string) => void
  setPhone: (phone: string) => void
  setGender: (gender: string) => void
  setBirthday: (birthday: string) => void
  
  // 设置完整用户信息
  setUserInfo: (username: string, phone: string) => void
  
  // 清除用户信息
  clearUser: () => void
  
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // 默认状态
      username: '',
      phone: '',
      gender: '',
      birthday: '',
      isLoggedIn: false,
      // 设置方法
      setUsername: (username: string) => 
        set({ username, isLoggedIn: true }),
        
      setPhone: (phone: string) => 
        set({ phone }),
      
      setGender: (gender: string) => 
        set({ gender }),
      
      setBirthday: (birthday: string) => 
        set({ birthday }),
      
      setUserInfo: (username: string, phone: string) => 
        set({ username, phone, isLoggedIn: true }),
      
      clearUser: () => 
        set({ username: '', phone: '', gender: '', birthday: '', isLoggedIn: false }),
      
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        username: state.username,
        phone: state.phone,
        gender: state.gender,
        birthday: state.birthday,
        isLoggedIn: state.isLoggedIn
      })
    }
  )
)

export default useUserStore