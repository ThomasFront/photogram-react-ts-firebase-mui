import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
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
      <Typography sx={{ minWidth: '16%' }} fontWeight="bold">{comment.addedBy}</Typography>
      <Box>
        <Typography sx={{ minWidth: '84%' }}>{comment.comment}</Typography>
      </Box>
    </Box>
  )
}

export default SingleComment