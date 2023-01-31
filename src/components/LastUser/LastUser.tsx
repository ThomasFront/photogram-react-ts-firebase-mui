import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import userAvatar from '../../assets/images/user.png'
import { auth } from '../../firebase/firebase'
import { UserInfoType } from '../../store/slices/userSlice'

type UserInfoProps = {
  userInfo: UserInfoType
}

const LastUser = ({ userInfo }: UserInfoProps) => {
  const [user] = useAuthState(auth)

  if (user?.uid === userInfo.uid) return <></>

  return (
    <Box sx={{
      display: 'flex',
      alignItems: "center",
      gap: 2,
      my: 0.4,
    }}>
      <img
        style={{ width: '24px' }}
        src={userAvatar}
        alt="Default user avatar"
      />
      <Typography>
        {userInfo.name}
      </Typography>
    </Box>
  )
}

export default LastUser