import { Box } from '@mui/system'
import React from 'react'
import { allPosts } from '../../store/slices/postsSlice'
import AddPostModal from '../AddPostModal/AddPostModal'
import SinglePost from '../SinglePost/SinglePost'
import { useSelector } from 'react-redux'

const Posts = () => {
  const posts = useSelector(allPosts)
  return (
    <Box>
      <AddPostModal />
      {posts.map(post => <SinglePost key={post.postId} post={post} />)}
    </Box>
  )
}

export default Posts