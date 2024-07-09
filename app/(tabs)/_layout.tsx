import { useColorScheme } from "react-native"
import { Tabs, Redirect } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { useUserStore } from "@/store"
import { Colors } from "@/constants/colors"
import { TabBarIcon, Loading } from "@/components"

export default function TabLayout() {
  const { isLoading, isLogged } = useUserStore()
  
  if (!isLoading && !isLogged) return <Redirect href="/sign-in" />
  
  const colorScheme = useColorScheme()
  
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarInactiveTintColor: "#cdcde0",
          // tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            paddingBottom: 6,
            height: 60
          },
          headerShown: false
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "主页",
            tabBarIcon: ({ color, focused }) => <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "新建",
            tabBarIcon: ({ color, focused }) => <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={34}
            />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "我",
            tabBarIcon: ({ color, focused }) => <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          }}
        />
      </Tabs>
      
      <Loading isLoading={isLoading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}
