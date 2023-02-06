import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import userAvatar from '../../assets/images/user.png'
import { auth, storage } from '../../firebase/firebase'
import { UserInfoType } from '../../store/slices/userSlice'

type UserInfoProps = {
  userInfo: UserInfoType
}

const LastUser = ({ userInfo }: UserInfoProps) => {
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

  if (user?.uid === userInfo.uid) return <></>

  return (
    <Box sx={{
      display: 'flex',
      alignItems: "center",
      gap: 2,
      my: 0.4,
    }}>
      <img
        style={{ width: '24px', height: '24px', borderRadius: '50%' }}
        src={avatar ? avatar : userAvatar}
        alt="Default user avatar"
      />
      <Typography
        component={Link}
        to={`/profile/${userInfo.uid}`}
        sx={{ color: 'black', textDecoration: 'none' }}>
        {userInfo.name}
      </Typography>
    </Box>
  )
}

export default LastUser