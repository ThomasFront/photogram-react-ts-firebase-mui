import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type UserInfoType = {
  uid: string,
  email: string,
  name: string,
  avatarUrl?: string
}

export interface UserState {
  userInfo: null | UserInfoType
}

const initialState: UserState = {
  userInfo: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if(state.userInfo){
        state.userInfo.avatarUrl = action.payload
      }
    },
    clearUser: (state) => {
      state.userInfo = null
    },
  },
})

export const userInfoSelector = (state: RootState) => state.user.userInfo
export const { updateUser, clearUser, updateAvatar} = userSlice.actions
export default userSlice.reducer