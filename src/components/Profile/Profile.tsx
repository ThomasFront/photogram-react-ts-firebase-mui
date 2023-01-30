import { Box, Button, Divider, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { clearUser, userInfoSelector } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { clearPosts } from '../../store/slices/postsSlice'
import { clearCategory } from '../../store/slices/categorySlice'

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
        p: 4,
        display: "flex",
        flexDirection: "column"
      }}>
      <Typography variant='h5'>
        Cześć <span style={{ fontWeight: "bold" }}>{userInfo?.name}</span>!
      </Typography>
      <Typography variant='h6' sx={{ textAlign: "center" }}>
        {userInfo?.email}
      </Typography>
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