import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useAuthStore = create()(
  persist(
    immer((set) => ({
      user: null,
      login: (data) => set((state) => { state.user = data }),
      logout: () => set((state) => { state.user = null }),
    })),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
