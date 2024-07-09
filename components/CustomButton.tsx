import { type FC } from "react"
import { Text, TouchableOpacity, ActivityIndicator } from "react-native"

const CustomButton: FC<{
  title: string
  onPress: () => void
  isLoading?: boolean
  containerStyles?: string
  textStyles?: string
}> = ({
  title,
  onPress,
  isLoading,
  containerStyles,
  textStyles
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`flex flex-row justify-center items-center min-h-[62px] bg-secondary rounded-xl ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
      
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
