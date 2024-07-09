import { View, Text, TouchableOpacity, Image, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"

import { useUserStore } from "@/store"
import { useAppwrite } from "@/hooks"
import { apiGetUserPosts, apiSignOut } from "@/api"
import { icons } from "@/constants"
import { EmptyState, VideoCard } from "@/components"

export default function Profile() {
  const { user, setUser, setLogged } = useUserStore()
  
  const { posts } = useAppwrite(() => apiGetUserPosts(user?.$id!))
  
  const signOut = async () => {
    await apiSignOut()
    setUser(null)
    setLogged(true)
    
    router.replace("/sign-in")
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
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
          <View className="flex justify-center items-center w-full mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={signOut}
              className="flex items-end w-full mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            
            <View
              className="flex justify-center items-center w-16 h-16 border border-secondary
                rounded-lg"
            >
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            
            <View className="my-5">
              <Text className="text-white text-center font-psemibold text-lg">
                {user?.username}
              </Text>
            </View>
            
            <View className="mt-5 flex flex-row">
              <View className="mr-10">
                <Text className="text-xl text-white text-center font-psemibold">
                  {posts.length}
                </Text>
                <Text className="text-sm text-gray-100 text-center font-pregular">Posts</Text>
              </View>
              
              <View>
                <Text className="text-xl text-white text-center font-psemibold">1.2k</Text>
                <Text className="text-sm text-gray-100 text-center font-pregular">Followers</Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState title="No Videos Found" subTitle="No videos found for this profile" />
        }
      />
    </SafeAreaView>
  )
}
