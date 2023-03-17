import { createContext, useContext, useState } from 'react'

type State = HTMLElement | null
const defaultValue = { contentsWrapper: null, setContentsWrapper: () => null }
const context = createContext<{
  contentsWrapper: State
  setContentsWrapper: (contentsWrapper: State) => void
}>(defaultValue)
export const ContentWrapperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contentsWrapper, setContentsWrapper] = useState<State>(null)
  return (
    <context.Provider value={{ contentsWrapper, setContentsWrapper }}>{children}</context.Provider>
  )
}
export const useContentsWrapper = () => useContext(context)
