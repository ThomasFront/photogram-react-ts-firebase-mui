import { Box, Divider, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { UserInfoType } from '../../store/slices/userSlice'
import { db } from '../../firebase/firebase'
import LastUser from '../LastUser/LastUser'
import Loader from '../Loader/Loader'
import { postsLoading } from '../../store/slices/postsSlice'
import { useLocation } from 'react-router-dom'

const Suggestions = () => {
  const location = useLocation()
  const [lastUsers, setLastUsers] = useState<Array<UserInfoType>>([])
  const [loading, setLoading] = useState(true)
  const postsLoader = useSelector(postsLoading)

  const handleOpacity = () => {
    if (location.pathname === '/home') {
      return 1
    } else {
      return 0
    }
  }

  const getLastUsers = async () => {
    setLoading(true)
    const q = query(collection(db, "users"), limit(4));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setLastUsers(prev => [
        ...prev,
        doc.data() as UserInfoType
      ])
    })
    setLoading(false)
  }

  useEffect(() => {
    getLastUsers()
  }, [])

  return (
    <Box sx={{
      display: { xs: 'none', md: "block" },
      width: { xs: '50%', lg: '40%', xl: '40%' },
      mt: 16,
      mr: 4,
      p: 2,
      ml: { md: 2, lg: 0 },
      textAlign: { md: "center", lg: "left" },
      opacity: handleOpacity
    }}
    >
      {loading ?
        <Loader />
        :
        <>
          <Typography fontSize="14px">
            Najnowsi użytkownicy:
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            my: 0.5,
          }}>
            {lastUsers.map(user => <LastUser key={user.uid} userInfo={user} />)}
          </Box>
        </>
      }
    </Box>
  )
}

export default Suggestions