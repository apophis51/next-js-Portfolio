'use client'
import { create } from 'zustand'

const useStore = create((set) => ({
  isCreateBlogActive: false,
  isLoading: false,
  isSubmitted: false,
  blogContent: '# Content Goes Here \n Please use Markdown Format',
  setCreateBlogActive: (isActive: boolean) => set(() => ({ isCreateBlogActive: isActive})),
  setblogContent: (newContent: string) => set(() => ({ blogContent: newContent})),
  setLoading: (isLoading: boolean) => set(() => ({ isLoading: isLoading})),
  setSubmitted: (isSubmitted: boolean) => set(() => ({ isSubmitted: isSubmitted})),
}))

export default useStore