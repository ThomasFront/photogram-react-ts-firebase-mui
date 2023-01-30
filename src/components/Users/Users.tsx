import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Users = () => {
  return (
    <Box
      sx={{
        p: 4,
      }}>
      <Typography variant='h5'>
        Wszyscy użytkownicy:
      </Typography>
      <Divider light />
    </Box>
  )
}

export default Users