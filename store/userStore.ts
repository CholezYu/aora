import { create } from "zustand"
import { Models } from "react-native-appwrite"

type State = {
  isLogged: boolean
  isLoading: boolean
  user: Models.Document | null
}

type Action = {
  setLogged: (isLogged: boolean) => void
  setLoading: (isLoading: boolean) => void
  setUser: (user: Models.Document | null) => void
}

const useUserStore = create<State & Action>(set => ({
  isLogged: false,
  setLogged: (isLogged: boolean) => {
    set({ isLogged })
  },
  
  isLoading: false,
  setLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  
  user: null,
  setUser: (user: Models.Document | null) => {
    set({ user })
  }
}))

export default useUserStore
