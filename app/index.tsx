import { View, Text, Image, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Redirect, router } from "expo-router"

import { useUserStore } from "@/store"
import { images } from "@/constants"
import { CustomButton } from "@/components"

export default function Welcome() {
  const { isLoading, isLogged } = useUserStore()
  
  if (!isLoading && isLogged) return <Redirect href="/home" />
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex justify-center items-center w-full h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          
          <View className="relative mt-5">
            <Text className="text-3xl text-white text-center font-bold">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          
          <Text className="mt-7 text-sm text-gray-100 text-center font-pregular">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          
          <CustomButton
            title="Continue with Email"
            onPress={() => router.push("/sign-in")}
            isLoading={isLoading}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}
