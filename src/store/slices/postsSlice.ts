import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CommentType = {
  comment: string,
  addedBy: string,
  timestamp: number
}

export type PostType = {
  description: string
  postId: string,
  addedById: string,
  addedByName: string,
  timestamp: number | string,
  url: string,
  avatarUrl: string | null,
  likes: Array<string>,
  comments: Array<CommentType>
}

type PostsType = Array<PostType>

type LikesType = {
  newLikesArray: Array<string>,
  postId: string
}

export interface PostsSlice {
  posts: PostsType
  loading: boolean
}

const initialState: PostsSlice = {
  posts: [],
  loading: true,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostType>) => {
      const indexToSplice = state.posts.findIndex(post => post.timestamp < action.payload.timestamp)
      if(indexToSplice === -1){
        state.posts.push(action.payload)
      } else {
        state.posts.splice(indexToSplice, 0, action.payload)
      }
    },
    addPostToTop: (state, action: PayloadAction<PostType>) => {
      state.posts.unshift(action.payload)
    },
    addLikeToPost: (state, action: PayloadAction<LikesType>) => {
      const indexToEdit = state.posts.findIndex(post => post.postId === action.payload.postId)
      state.posts[indexToEdit].likes = action.payload.newLikesArray
    },
    addCommentToPost: (state, action: PayloadAction<any>) => {
      const indexToEdit = state.posts.findIndex(post => post.postId === action.payload.postId)
      state.posts[indexToEdit].comments = action.payload.newCommentsArray
    },
    clearPosts: (state) => {
      state.posts = []
    },
    loadingOff: (state) => {
      state.loading = false
    },
  },
})

export const allPosts = (state: RootState) => state.posts.posts
export const postsLoading = (state: RootState) => state.posts.loading
export const { addPost, clearPosts, addPostToTop, loadingOff, addLikeToPost, addCommentToPost } = postsSlice.actions
export default postsSlice.reducer