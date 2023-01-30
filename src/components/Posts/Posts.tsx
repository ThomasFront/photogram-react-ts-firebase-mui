import { Box } from '@mui/system'
import React from 'react'
import { examplePosts } from '../../helpers'
import AddPostModal from '../AddPostModal/AddPostModal'
import SinglePost from '../SinglePost/SinglePost'

const Posts = () => {
  return (
    <Box>
      <AddPostModal />
      {examplePosts.map(post => <SinglePost key={post.id} post={post} />)}
    </Box>
  )
}

export default Posts