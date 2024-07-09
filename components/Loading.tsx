import { type FC } from "react"
import { View, ActivityIndicator, Dimensions, Platform } from "react-native"

const Loading: FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <>
    {isLoading && <View
      className="flex justify-center items-center absolute z-10 w-full h-full bg-primary/60"
      style={{ height: Dimensions.get("screen").height }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={Platform.OS === "ios" ? "large" : 50}
      />
    </View>}
  </>
)

export default Loading
