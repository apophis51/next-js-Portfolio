'use client'
import { create } from 'zustand'

const useStore = create((set) => ({
  isLoading: "off",
  setLoading: (isLoading: "on" | "off" | "successful"| "error") => set(() => ({ isLoading: isLoading})),
}))

export default useStore