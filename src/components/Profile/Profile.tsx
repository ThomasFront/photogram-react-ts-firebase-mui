import { Box, Button, Divider, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../firebase/firebase'

const Profile = () => {
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column"
      }}>
      <Typography variant='h5'>
        Profil użytkownika:
      </Typography>
      <Divider light />
      <Button
        onClick={() => signOut(auth)}
        variant="contained"
        sx={{ mt: 4 }}
      >
        Wyloguj się
      </Button>
    </Box>
  )
}

export default Profile