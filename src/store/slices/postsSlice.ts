import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type PostType = {
  description: string
  id: string,
  addedBy: string,
  timestamp: number
}

type PostsType = Array<PostType>

export interface PostsSlice {
  posts: PostsType
}

const initialState: PostsSlice = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostType>) => {
      state.posts.push(action.payload)
    },
  },
})

export const allPosts = (state: RootState) => state.posts.posts
export const { addPost } = postsSlice.actions
export default postsSlice.reducer