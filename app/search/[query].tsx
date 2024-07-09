import { useEffect } from "react"
import { View, Text, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams } from "expo-router"

import { useAppwrite } from "@/hooks"
import { apiGetPostsByKeyword } from "@/api"
import { SearchInput, EmptyState, VideoCard } from "@/components"

export default function Search() {
  const { query } = useLocalSearchParams()
  
  const { posts, refetch } = useAppwrite(() => apiGetPostsByKeyword(query as string))
  
  useEffect(() => {
    refetch()
  }, [query])
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        renderItem={({ item }) => <VideoCard
          title={item.title}
          thumbnail={item.thumbnail}
          video={item.video}
          creator={item.creator.username}
          avatar={item.creator.avatar}
        />}
        keyExtractor={item => item.$id}
        ListHeaderComponent={
          <View className="flex my-6 px-4">
            <Text className="text-sm text-gray-100 font-pmedium">搜索结果</Text>
            <Text className="text-2xl text-white font-psemibold">{query}</Text>
            
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState title="No Videos Found" subTitle="No videos found for this search query" />
        }
      />
    </SafeAreaView>
  )
}
