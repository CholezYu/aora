import { type FC } from "react"
import { View, type ViewProps } from "react-native"

const ThemedView: FC<ViewProps & {
  lightColor?: string
  darkColor?: string
}> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => <View style={style} {...otherProps} />

export default ThemedView
