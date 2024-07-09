import { useEffect } from "react"
import { router } from "expo-router"

import { useUserStore } from "@/store"
import { apiGetCurrentUser } from "@/api"

export default function useAuth() {
  const { setLoading, setLogged, setUser } = useUserStore()
  
  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const currentUser = await apiGetCurrentUser()
        setLogged(!!currentUser)
        setUser(currentUser ? currentUser : null)
      }
      catch {
        router.push("/sign-in")
      }
      finally {
        setLoading(false)
      }
    })()
  }, [])
}
