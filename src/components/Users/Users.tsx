import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { UserInfoType } from '../../store/slices/userSlice'
import Loader from '../Loader/Loader'
import { UserInfo } from '../UserInfo/UserInfo'


const Users = () => {
  const [users, setUsers] = useState<Array<UserInfoType>>([])
  const [loading, setLoading] = useState(true)

  const getAllUsers = async () => {
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(doc => {
      setUsers(prev => [
        ...prev,
        doc.data() as UserInfoType
      ])
    })
    setLoading(false)
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Box
      sx={{
        p: 4,
      }}>
      {loading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <Loader />
        </Box>
        :
        <>
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
        </>
      }

    </Box>
  )
}

export default Users