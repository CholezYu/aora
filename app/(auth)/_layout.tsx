import { Stack } from "expo-router/stack"
import { StatusBar } from "expo-status-bar"

export default function AuthLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}
