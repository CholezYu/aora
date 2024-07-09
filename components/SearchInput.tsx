import { type FC, useState } from "react"
import { View, TextInput, TouchableOpacity, Image } from "react-native"
import { router, usePathname } from "expo-router"

import { icons } from "@/constants"

const SearchInput: FC<{
  initialQuery?: string
}> = ({ initialQuery }) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery || "")
  
  const search = () => {
    if (query === "") return
    if (pathname.startsWith("/search")) router.setParams({ query })
    else router.push(`/search/${query}`)
  }
  
  return (
    <View
      className="flex flex-row items-center w-full h-16 px-4 space-x-4 bg-black-100
        border-2 border-black-200 rounded-2xl focus:border-secondary"
    >
      <TextInput
        value={query}
        onChangeText={query => setQuery(query)}
        placeholder="Search for a video topic"
        placeholderTextColor="#cdcde0"
        className="flex-1 mt-0.5 text-white font-pregular text-base"
      />
      
      <TouchableOpacity onPress={search}>
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-5 h-5"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
