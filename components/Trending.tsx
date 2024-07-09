import { type FC, useState } from "react"
import { Image, FlatList, ImageBackground, TouchableOpacity } from "react-native"
import { ResizeMode, Video } from "expo-av"
import * as Animatable from "react-native-animatable"
import { Models } from "react-native-appwrite"

import { icons } from "@/constants"

const Trending: FC<{
  posts: Models.Document[]
}> = ({ posts }) => {
  const [currentItem, setCurrentItem] = useState(posts[0])
  
  const [playingList, setPlayingList] = useState<{ [p: string]: boolean }>({})
  
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Animatable.View
          animation={currentItem?.$id === item.$id ? zoomIn : zoomOut}
          duration={500}
          className="mr-5"
        >
          {playingList[item.$id]
            ? <Video
              source={{ uri: item.video }}
              onPlaybackStatusUpdate={status => setPlayingList({
                ...playingList,
                [item.$id]: status.isLoaded && !status.didJustFinish
              })}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay
              className="w-52 h-72 mt-3 bg-white/10 rounded-[33px]"
            />
            : <TouchableOpacity
              onPress={() => setPlayingList({ ...playingList, [item.$id]: true })}
              activeOpacity={0.7}
              className="flex justify-center items-center relative"
            >
              <ImageBackground
                source={{ uri: item.thumbnail }}
                resizeMode="cover"
                className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
              />
              
              <Image
                source={icons.play}
                resizeMode="contain"
                className="w-12 h-12 absolute"
              />
            </TouchableOpacity>
          }
        </Animatable.View>
      )}
      keyExtractor={item => item.$id}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length) {
          setCurrentItem(viewableItems[0].item)
        }
      }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal // 水平
    />
  )
}

const zoomIn: Animatable.CustomAnimation = {
  from: { transform: [{ scale: 0.9 }] },
  to: { transform: [{ scale: 1 }] }
}

const zoomOut: Animatable.CustomAnimation = {
  from: { transform: [{ scale: 1 }] },
  to: { transform: [{ scale: 0.9 }] }
}

export default Trending
