import { useState } from "react"
import { View, Text, Image, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useUserStore } from "@/store"
import { useAppwrite } from "@/hooks"
import { apiGetPosts, apiGetLatestPosts } from "@/api"
import { images } from "@/constants"
import { SearchInput, Trending, EmptyState, VideoCard } from "@/components"

export default function Home() {
  const { user } = useUserStore()
  
  const { posts, refetch } = useAppwrite(apiGetPosts)
  const { posts: latestPosts } = useAppwrite(apiGetLatestPosts)
  
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  
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
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">欢迎回来！</Text>
                <Text className="text-2xl text-white font-psemibold">{user?.username}</Text>
              </View>
              
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>
            
            <SearchInput />
            
            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="mb-3 text-lg text-gray-100 font-pregular">Latest Videos</Text>
              
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState title="No Videos Found" subTitle="Be the first one to upload a video" />
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}
