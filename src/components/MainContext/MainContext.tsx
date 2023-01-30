import { Box, Container } from '@mui/material'
import React from 'react'
import AddPostModal from '../AddPostModal/AddPostModal'
import SinglePost from '../SinglePost/SinglePost'
import { useSelector } from 'react-redux'
import { selectedCategory } from '../../store/slices/categorySlice'
import Posts from '../Posts/Posts'
import Users from '../Users/Users'
import Profile from '../Profile/Profile'

const MainContext = () => {
  const chosenCategory = useSelector(selectedCategory)

  return (
    <Container
      sx={{
        my: 6,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}>
      {chosenCategory === 'All' && <Posts />}
      {chosenCategory === 'Users' && <Users />}
      {chosenCategory === 'Profile' && <Profile />}
    </Container>
  )
}

export default MainContext