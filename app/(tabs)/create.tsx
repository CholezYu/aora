import { useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ResizeMode, Video } from "expo-av"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"

import { useUserStore } from "@/store"
import { apiCreatePost } from "@/api"
import { PostForm } from "@/api/interface"
import { icons } from "@/constants"
import { FormField, CustomButton } from "@/components"

export default function Create() {
  const { user } = useUserStore()
  
  const [uploading, setUploading] = useState(false)
  
  const [form, setForm] = useState<PostForm>({
    userId: user?.$id,
    title: "",
    prompt: "",
    video: null,
    thumbnail: null
  })
  
  const pickDocument = async (type: string) => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === "image"
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })
    if (!response.canceled) {
      setForm(type === "image" ? {
        ...form,
        thumbnail: response.assets[0]
      } : {
        ...form,
        video: response.assets[0]
      })
    }
    else {
      setTimeout(() => {
        Alert.alert(
          "Document picked",
          JSON.stringify(response, null, 2)
        )
      }, 100)
    }
  }
  
  const submit = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      return Alert.alert("Please provide all fields")
    }
    
    try {
      setUploading(true)
      await apiCreatePost(form)
      Alert.alert("Success", "Post uploaded successfully")
      router.push("/home")
    }
    finally {
      setForm({
        userId: user?.$id,
        title: "",
        prompt: "",
        thumbnail: null,
        video: null
      })
      setUploading(false)
    }
  }
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="my-6 px-4">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        
        <FormField
          title="Video Title"
          value={form.title}
          onChangeText={title => setForm({ ...form, title })}
          placeholder="Give your video a catchy title..."
          otherStyles="mt-10"
        />
        
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          
          <TouchableOpacity onPress={() => pickDocument("video")}>
            {form.video
              ? <Video
                source={{ uri: form.video.uri }}
                useNativeControls
                isLooping
                resizeMode={ResizeMode.COVER}
                className="w-full h-64 rounded-2xl"
              />
              : <View
                className="flex justify-center items-center w-full h-40 px-4 bg-black-100 rounded-2xl
                border border-black-200"
              >
                <View
                  className="flex justify-center items-center w-14 h-14 border border-dashed
                  border-secondary-100"
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            }
          </TouchableOpacity>
        </View>
        
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          
          <TouchableOpacity onPress={() => pickDocument("image")}>
            {form.thumbnail ? <Image
              source={{ uri: form.thumbnail.uri }}
              resizeMode="cover"
              className="w-full h-64 rounded-2xl"
            /> : <View
              className="flex justify-center items-center flex-row w-full h-16 px-4 bg-black-100
                rounded-2xl border-2 border-black-200 space-x-2"
            >
              <Image
                source={icons.upload}
                resizeMode="contain"
                alt="upload"
                className="w-5 h-5"
              />
              <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
            </View>}
          </TouchableOpacity>
        </View>
        
        <FormField
          title="Prompt"
          value={form.prompt}
          onChangeText={prompt => setForm({ ...form, prompt })}
          placeholder="The Prompt of your video...."
          otherStyles="mt-7"
        />
        
        <CustomButton
          title="Submit & Publish"
          onPress={submit}
          isLoading={uploading}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  )
}
