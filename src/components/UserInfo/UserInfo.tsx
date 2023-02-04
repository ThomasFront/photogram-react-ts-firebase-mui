import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { UserInfoType } from '../../store/slices/userSlice';
import userAvatar from '../../assets/images/user.png'
import { Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from '../../firebase/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

type UserInfoProps = {
  userInfo: UserInfoType
}

export const UserInfo = ({ userInfo }: UserInfoProps) => {
  const [user] = useAuthState(auth)
  const [avatar, setAvatar] = useState<string | null>(null)

  const getUserAvatar = async () => {
    const avatarRef = ref(storage, `avatars/${userInfo.uid}/avatar.jpg`);
    let avatarUrl = null

    try {
      avatarUrl = await getDownloadURL(avatarRef)
    } catch (err) {
      avatarUrl = null
    }
    setAvatar(avatarUrl)
  }

  useEffect(() => {
    getUserAvatar()
  }, [])

  return (
    <Box sx={{
      display: 'flex',
      alignItems: "center",
      gap: 2,
      my: 0.4,
    }}>
      <img
        style={{ width: '36px', height: '36px', borderRadius: '50%' }}
        src={avatar ? avatar : userAvatar}
        alt="Default user avatar"
      />
      <Typography>
        {userInfo.uid === user?.uid ? `Ty (${userInfo.name})` : userInfo.name}
      </Typography>
    </Box>
  )
}
