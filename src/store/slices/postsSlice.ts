import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type PostType = {
  description: string
  postId: string,
  addedById: string,
  addedByName: string,
  timestamp: number | string,
  url: string
}

type PostsType = Array<PostType>

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
export const { addPost, clearPosts, addPostToTop, loadingOff } = postsSlice.actions
export default postsSlice.reducer