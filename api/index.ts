import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  ImageGravity
} from "react-native-appwrite"
import type { ImagePickerAsset } from "expo-image-picker"
import type { User, PostForm } from "./interface"

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.cholez.aora",
  projectId: "6683735e00127cf793ed",
  storageId: "668376ef001e46df7613",
  databaseId: "6683751a003a5d5a94ce",
  userCollectionId: "6683753f002c4c949dc0",
  videoCollectionId: "6683758f000db6278a6e"
}

const client = new Client()

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const databases = new Databases(client)
const avatars = new Avatars(client)
const storage = new Storage(client)

/**
 * 注册
 * @param {string} user.username - 用户名
 * @param {string} user.email - 邮箱
 * @param {string} user.password - 密码
 */
export const apiRegister = async (user: User) => {
  const { username, email, password } = user
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  )
  if (!newAccount) throw Error
  await apiSignIn(user)
  return await databases.createDocument(
    config.databaseId,
    config.userCollectionId,
    ID.unique(),
    {
      accountId: newAccount.$id,
      avatar: avatars.getInitials(username),
      email,
      username
    }
  )
}

/**
 * 登录
 * @param {string} user.email - 邮箱
 * @param {string} user.password - 密码
 */
export const apiSignIn = async (user: User) => {
  return await account.createEmailPasswordSession(user.email, user.password)
}

/**
 * 获取账户
 */
export const apiGetAccount = async () => {
  return await account.get()
}

/**
 * 获取当前用户
 */
export const apiGetCurrentUser = async () => {
  const currentAccount = await apiGetAccount()
  if (!currentAccount) throw Error
  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  )
  if (!currentUser) throw Error
  return currentUser.documents[0]
}

/**
 * 获取所有 Posts
 */
export const apiGetPosts = async () => {
  const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId
  )
  return posts.documents
}

/**
 * 获取用户的 Posts
 * @param {string} userId - 用户ID
 */
export const apiGetUserPosts = async (userId: string) => {
  const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.equal("creator", userId)]
  )
  return posts.documents
}

/**
 * 搜索 Posts
 * @param {string} keyword - 关键字
 */
export const apiGetPostsByKeyword = async (keyword: string) => {
  const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.search("title", keyword)]
  )
  return posts.documents
}

/**
 * 获取 Latest Posts
 */
export const apiGetLatestPosts = async () => {
  const posts = await databases.listDocuments(
    config.databaseId,
    config.videoCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
  )
  return posts.documents
}

/**
 * 创建 Post
 * @param {number} form.userId - 用户ID
 * @param {string} form.title - 标题
 * @param {string} form.prompt - 描述
 * @param {ImagePickerAsset} form.thumbnail - 封面
 * @param {ImagePickerAsset} form.video - 视频资源
 */
export const apiCreatePost = async (form: PostForm) => {
  const [thumbnail, video] = await Promise.all([
    apiUpload(form.thumbnail!, "image"),
    apiUpload(form.video!, "video")
  ])
  return await databases.createDocument(
    config.databaseId,
    config.videoCollectionId,
    ID.unique(),
    {
      creator: form.userId,
      title: form.title,
      prompt: form.prompt,
      thumbnail,
      video
    }
  )
}

/**
 * 上传文件
 * @param {ImagePickerAsset} file - 文件
 * @param {string} type - 文件类型
 */
export const apiUpload = async (file: ImagePickerAsset, type: string) => {
  if (!file) return
  
  const uploadFile = await storage.createFile(
    config.storageId,
    ID.unique(),
    {
      name: file.fileName!,
      type: file.mimeType!,
      size: file.fileSize!,
      uri: file.uri
    }
  )
  return await apiGetFilePreview(uploadFile.$id, type)
}

/**
 * 预览图片
 * @param {string} fileId
 * @param {string} type
 */
export const apiGetFilePreview = async (fileId: string, type: string) => {
  if (type === "video") {
    return storage.getFileView(config.storageId, fileId)
  }
  if (type === "image") {
    return storage.getFilePreview(
      config.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    )
  }
}

/**
 * 登出
 */
export const apiSignOut = async () => {
  return await account.deleteSession("current")
}
