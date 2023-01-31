import { Box, Divider, Typography } from '@mui/material'
import { selectedCategory } from '../../store/slices/categorySlice'
import { useSelector } from 'react-redux'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { UserInfoType } from '../../store/slices/userSlice'
import { db } from '../../firebase/firebase'
import LastUser from '../LastUser/LastUser'

const Suggestions = () => {
  const chosenCategory = useSelector(selectedCategory)
  const [lastUsers, setLastUsers] = useState<Array<UserInfoType>>([])

  const getLastUsers = async () => {
    const q = query(collection(db, "users"), limit(4));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      setLastUsers(prev => [
        ...prev,
        doc.data() as UserInfoType
      ])
    })
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
      textAlign: { md: "center", lg: "left" }
    }}
    >
      {chosenCategory === 'All' &&
        <>
          <Typography fontSize="14px">
            Propozycje dla Ciebie:
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