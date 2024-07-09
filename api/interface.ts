import type { ImagePickerAsset } from "expo-image-picker"

export interface User {
  username?: string
  email: string
  password: string
}

export interface PostForm {
  userId?: string
  title: string
  prompt: string
  thumbnail: ImagePickerAsset | null
  video: ImagePickerAsset | null
}
