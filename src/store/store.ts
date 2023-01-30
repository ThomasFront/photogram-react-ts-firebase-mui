import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice'
import userReducer from './slices/userSlice'
import postsReducer from './slices/postsSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer,
    posts: postsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch