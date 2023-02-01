import { Box, Button, Divider, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { clearUser, userInfoSelector } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { clearPosts } from '../../store/slices/postsSlice'
import { clearCategory } from '../../store/slices/categorySlice'
import userAvatar from '../../assets/images/user.png'

const Profile = () => {
  const userInfo = useSelector(userInfoSelector)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearPosts())
    dispatch(clearCategory())
    dispatch(clearUser())
    signOut(auth)
  }

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        mt: 4,
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}>
        <img
          src={userAvatar}
          alt="Default user avatar"
          style={{ width: '56px' }}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <Typography variant='h5' fontSize="20px">
            Cześć <span style={{ fontWeight: "bold" }}>{userInfo?.name}</span>!
          </Typography>
          <Typography variant='h6' sx={{ textAlign: "center" }} fontSize="16px">
            {userInfo?.email}
          </Typography>
        </Box>
      </Box>
      <Divider light />
      <Button
        onClick={handleLogout}
        variant="contained"
        sx={{ mt: 4 }}
      >
        Wyloguj się
      </Button>
    </Box>
  )
}

export default Profile