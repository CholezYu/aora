import { useState, useEffect } from "react"

export default function useAppwrite<T>(request: () => Promise<T>) {
  const [posts, setPosts] = useState<T>([] as T)
  
  const [isLoading, setLoading] = useState(false)
  
  const refetch = async () => {
    try {
      setLoading(true)
      const response = await request()
      setPosts(response)
    }
    finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    refetch()
  }, [])
  
  return { posts, isLoading, refetch }
}
