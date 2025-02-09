import { type FC, useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Video, ResizeMode } from "expo-av"

import { icons } from "@/constants"

const VideoCard: FC<{
  title: string
  creator: string
  avatar: string
  thumbnail: string
  video: string
}> = ({
  title,
  creator,
  avatar,
  thumbnail,
  video
}) => {
  const [play, setPlay] = useState(false)
  
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row items-start gap-3">
        <View className="flex justify-center items-center flex-row flex-1">
          <View
            className="flex justify-center items-center w-[46px] h-[46px] rounded-lg border
              border-secondary p-0.5"
          >
            <Image
              source={{ uri: avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              numberOfLines={1}
              className="font-psemibold text-sm text-white"
            >
              {title}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs text-gray-100 font-pregular"
            >
              {creator}
            </Text>
          </View>
        </View>
        
        <View className="pt-2">
          <Image
            source={icons.menu}
            resizeMode="contain"
            className="w-5 h-5"
          />
        </View>
      </View>
      
      {play
        ? <Video
          source={{ uri: video }}
          onPlaybackStatusUpdate={status => setPlay(status.isLoaded && !status.didJustFinish)}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          className="w-full h-60 rounded-xl mt-3"
        />
        : <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      }
    </View>
  )
}

export default VideoCard
