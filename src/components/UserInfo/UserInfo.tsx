import { Box } from '@mui/system';
import React from 'react'
import { UserInfoType } from '../../store/slices/userSlice';
import userAvatar from '../../assets/images/user.png'
import { Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

type UserInfoProps = {
  userInfo: UserInfoType
}

export const UserInfo = ({ userInfo }: UserInfoProps) => {
  const [user] = useAuthState(auth)

  return (
    <Box sx={{
      display: 'flex',
      alignItems: "center",
      gap: 2,
      my: 0.4,
    }}>
      <img
        style={{ width: '36px' }}
        src={userAvatar}
        alt="Default user avatar"
      />
      <Typography>
        {userInfo.uid === user?.uid ? `Ty (${userInfo.name})` : userInfo.name}
      </Typography>
    </Box>
  )
}
