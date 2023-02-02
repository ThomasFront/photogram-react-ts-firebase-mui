import { Box } from '@mui/system'
import React from 'react'
import { allPosts, postsLoading } from '../../store/slices/postsSlice'
import AddPostModal from '../AddPostModal/AddPostModal'
import SinglePost from '../SinglePost/SinglePost'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import Loader from '../Loader/Loader'

const Posts = () => {
  const posts = useSelector(allPosts)
  const postsLoader = useSelector(postsLoading)
  return (
    <>
      {postsLoader ?
        <Box mt={20}>
          <Loader />
        </Box>
        :
        <Box sx={{ px: 1 }}>
          <AddPostModal />
          {!posts.length &&
            <Typography fontSize="14px" textAlign="center">
              Brak postów... Bądź pierwszy i dodaj post!
            </Typography>
          }
          {posts.map(post => <SinglePost key={post.postId} post={post} />)}
        </Box>
      }
    </>
  )
}

export default Posts