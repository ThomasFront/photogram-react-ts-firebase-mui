import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import { CommentType } from '../../store/slices/postsSlice'

type SingleComment = {
  comment: CommentType
}

const SingleComment = ({ comment }: SingleComment) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '10px',
      p: '5px'
    }}>
      <Typography
        fontWeight="bold"
        component={Link}
        to={`/profile/${comment.addedById}`}
        sx={{ color: 'black', textDecoration: 'none', minWidth: '16%' }}
      >
        {comment.addedBy}
      </Typography>
      <Box>
        <Typography sx={{ minWidth: '84%' }}>{comment.comment}</Typography>
      </Box>
    </Box>
  )
}

export default SingleComment