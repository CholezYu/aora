import { useState } from "react"
import { View, Text, Image, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link, router } from "expo-router"

import { useUserStore } from "@/store"
import { apiRegister } from "@/api"
import { images } from "@/constants"
import { FormField, CustomButton } from "@/components"

export default function SignUp() {
  const { isLoading, setLoading, setLogged, setUser } = useUserStore()
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })
  
  const signUp = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "请输入账号、邮箱和密码！")
    }
    try {
      setLoading(true)
      
      const currentUser = await apiRegister(form)
      
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
            Sign up to Aora
          </Text>
          
          <FormField
            title="Username"
            value={form.username}
            onChangeText={username => setForm({ ...form, username })}
            otherStyles="mt-10"
          />
          
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
            title="Sign Up"
            onPress={signUp}
            isLoading={isLoading}
            containerStyles="mt-7"
          />
          
          <View className="flex flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg text-secondary font-psemibold"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
