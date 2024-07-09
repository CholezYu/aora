import { useState } from "react"
import { View, Text, Image, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, router } from "expo-router"

import { useUserStore } from "@/store"
import { apiSignIn, apiGetCurrentUser } from "@/api"
import { images } from "@/constants"
import { FormField, CustomButton } from "@/components"

export default function SignIn() {
  const { isLoading, setLoading, setLogged, setUser } = useUserStore()
  
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  
  const signIn = async () => {
    if (form.email === "" || form.password === "") {
      return Alert.alert("Error", "请输入邮箱和密码！")
    }
    
    try {
      setLoading(true)
      
      await apiSignIn(form)
      const currentUser = await apiGetCurrentUser()
      
      setUser(currentUser)
      setLogged(true)
      
      router.replace("/home")
    }
    catch (error: any) {
      Alert.alert("Error", error.message)
    }
    finally {
      setLoading(false)
    }
  }
  
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full h-full justify-center my-6 px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          
          <Text className="mt-10 text-2xl text-white font-semibold font-psemibold">
            Log in to Aora
          </Text>
          
          <FormField
            title="Email"
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          
          <FormField
            title="Password"
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
            otherStyles="mt-7"
          />
          
          <CustomButton
            title="Sign In"
            onPress={signIn}
            isLoading={isLoading}
            containerStyles="mt-7"
          />
          
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg text-secondary font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
