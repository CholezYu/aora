import { type FC, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"

import { icons } from "@/constants"

const FormField: FC<{
  title: string
  value: string
  onChangeText: (value: string) => void
  keyboardType?: string
  placeholder?: string
  otherStyles: string
}> = ({
  title,
  value,
  onChangeText,
  keyboardType,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      
      <View
        className="flex flex-row items-center w-full h-16 px-4 bg-black-100 border-2 border-black-200
          rounded-2xl focus:border-secondary"
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          className="flex-1 text-white font-semibold text-base"
          {...props}
        />
        
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
