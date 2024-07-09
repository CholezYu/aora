import { type FC } from "react"
import { View, Text, Image } from "react-native"
import { router } from "expo-router"

import { images } from "@/constants"
import CustomButton from "./CustomButton"

const EmptyState: FC<{
  title: string
  subTitle: string
}> = ({ title, subTitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-p[270px] h-[216px]"
      />
      
      <Text className="text-sm text-gray-100 font-pmedium">{title}</Text>
      <Text className="mt-2 text-xl text-white text-center font-psemibold">{subTitle}</Text>
      
      <CustomButton
        title="Back to Explore"
        onPress={() => router.replace("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  )
}

export default EmptyState
