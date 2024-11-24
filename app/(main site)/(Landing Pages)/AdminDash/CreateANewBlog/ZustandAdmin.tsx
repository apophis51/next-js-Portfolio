'use client'
import { create } from 'zustand'

const useStore = create((set) => ({
  isCreateBlogActive: false,
  setCreateBlogActive: () => set((state) => ({ isCreateBlogActive: state})),
}))

export default useStore