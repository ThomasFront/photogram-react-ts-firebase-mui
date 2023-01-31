import { Box } from '@mui/system'
import React from 'react'
import { allPosts } from '../../store/slices/postsSlice'
import AddPostModal from '../AddPostModal/AddPostModal'
import SinglePost from '../SinglePost/SinglePost'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

const Posts = () => {
  const posts = useSelector(allPosts)
  return (
    <Box>
      <AddPostModal />
      {!posts.length &&
        <Typography fontSize="14px" textAlign="center">
          Brak postów... Bądź pierwszy i dodaj post!
        </Typography>
      }
      {posts.map(post => <SinglePost key={post.postId} post={post} />)}
    </Box>
  )
}

export default Posts