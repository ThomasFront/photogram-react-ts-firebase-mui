import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { UserInfoType } from '../../store/slices/userSlice'
import { UserInfo } from '../UserInfo/UserInfo'


const Users = () => {
  const [users, setUsers] = useState<Array<UserInfoType>>([])

  const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(doc => {
      setUsers(prev => [
        ...prev,
        doc.data() as UserInfoType
      ])
    })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <Typography variant='h5'>
        Wszyscy użytkownicy:
      </Typography>
      <Divider light />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "flex-start",
        flexDirection: "column",
        p: 1,
      }}>
        {users.map(user => <UserInfo key={user.uid} userInfo={user} />)}
      </Box>
    </Box>
  )
}

export default Users