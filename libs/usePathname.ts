import { createContext, useContext } from 'react'

export const PathContext = createContext('/')
export const usePathname = () => useContext(PathContext)
