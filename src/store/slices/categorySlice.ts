import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CategoryState {
  selectedCategory: string
}

const initialState: CategoryState = {
  selectedCategory: 'All',
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
  },
})

export const selectedCategory = (state: RootState) => state.category.selectedCategory
export const { changeCategory } = categorySlice.actions
export default categorySlice.reducer