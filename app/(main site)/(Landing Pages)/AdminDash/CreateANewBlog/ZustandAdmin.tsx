'use client'
import { create } from 'zustand'

const useStore = create((set) => ({
  isCreateBlogActive: false,
  isLoading: false,
  isSubmitted: false,
  blogContent: '# Make a New BLog',
  setCreateBlogActive: (isActive: boolean) => set(() => ({ isCreateBlogActive: isActive})),
  setblogContent: (newContent: string) => set(() => ({ blogContent: newContent})),
  setLoading: (isLoading: boolean) => set(() => ({ isLoading: isLoading})),
  setSubmitted: (isSubmitted: boolean) => set(() => ({ isSubmitted: isSubmitted})),
}))

export default useStore