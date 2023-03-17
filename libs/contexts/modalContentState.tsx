import { createContext, useContext, useState } from 'react'

type State = JSX.Element | null
const defaultValue = { modalContent: null, setModalContent: () => null }
const context = createContext<{
  modalContent: State
  setModalContent: (modalContent: State) => void
}>(defaultValue)

export const ModalContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<State>(null)
  return <context.Provider value={{ modalContent, setModalContent }}>{children}</context.Provider>
}
export const useModalContent = () => useContext(context)
