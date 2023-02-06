import { Button, TextField, Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import userPhoto from '../../assets/images/user.png'
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { addCommentToPost, addLikeToPost, PostType } from '../../store/slices/postsSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts } from '../../store/slices/postsSlice'
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import SingleComment from '../SingleComment/SingleComment';
import { Link } from 'react-router-dom';
import { userInfoSelector } from '../../store/slices/userSlice';

type PostProps = {
  post: PostType
}

const SinglePost = ({ post }: PostProps) => {
  const { description, addedById, addedByName, timestamp, url, avatarUrl, likes, postId, comments } = post
  const [user] = useAuthState(auth)
  const [isLiked, setIsLiked] = useState(false)
  const posts = useSelector(allPosts)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const userInfo = useSelector(userInfoSelector)

  useEffect(() => {
    if (likes.includes(user?.uid as string)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [])

  const handleComment = async () => {
    if (comment) {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef) as any;
      const commentsArray = docSnap.data().comments

      commentsArray.unshift({
        comment,
        addedBy: userInfo?.name,
        addedById: user?.uid,
        timestamp: Date.now()
      })

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: commentsArray
      });

      dispatch(addCommentToPost({
        newCommentsArray: commentsArray,
        postId
      }))

      setComment('')
    }
  }


  const handleLike = async () => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef) as any;
    const likesArray = docSnap.data().likes
    const isUserInArray = likesArray.findIndex((id: string) => id === user?.uid)

    if (isUserInArray === -1) {
      likesArray.push(user?.uid)
    } else {
      const userIdToDelete = likesArray.findIndex((id: string) => id === user?.uid)
      likesArray.splice(userIdToDelete, 1)
    }

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likes: likesArray
    });

    dispatch(addLikeToPost({
      newLikesArray: likesArray,
      postId
    }))

    setIsLiked(prev => !prev)
  }

  const showLikes = () => {
    const postIndex = posts.findIndex(post => post.postId === postId)
    const allLikes = posts[postIndex].likes
    const isUserInArray = allLikes.includes(user?.uid as string)

    if (isUserInArray && allLikes.length === 1) {
      return 'Lubisz to'
    } else if (isUserInArray && allLikes.length > 1) {
      return `Ty i ${allLikes.length - 1}`
    }
    return allLikes.length
  }

  return (
    <Card sx={{
      maxWidth: 500,
      minWidth: { xs: 240, sm: 500, md: 400, lg: 650, xl: 700 },
      mb: 6,
      wordBreak: 'break-all',
    }}
    >
      <CardHeader
        avatar={
          <Avatar src={avatarUrl ? avatarUrl : userPhoto} />
        }
        title={user?.uid === addedById ? `Ty (${addedByName})` : addedByName}
        subheader={timestamp}
        component={Link}
        to={`/profile/${addedById}`}
        sx={{ color: 'black', textDecoration: 'none' }}
      />
      {url && <CardMedia
        component="img"
        height="400"
        image={url}
        alt="Przykładowe zdjęcie"
      />}
      <CardContent>
        <Typography variant="body2" color="black">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleLike}
          aria-label="add like"
          sx={{ color: `${isLiked && 'rgb(227, 41, 27)'}` }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography>{showLikes()}</Typography>
        <IconButton
          aria-label="add comment"
        >
          <ModeCommentIcon />
        </IconButton>
      </CardActions>
      <Box sx={{
        display: 'flex'
      }}>
        <TextField
          label="Napisz komentarz..."
          variant="filled"
          sx={{ width: '70%' }}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <Button variant='contained' size='small' sx={{ width: { xs: '50%', sm: '30%', md: '32%', lg: '30%' }, fontSize: { xs: '9px', sm: '12px', md: '10px', lg: '12px' } }} onClick={handleComment}>Dodaj komentarz</Button>
      </Box>
      {comments.length > 0 &&
        <Box sx={{ p: '10px' }}>
          {comments.map(comment => <SingleComment key={comment.comment} comment={comment} />)}
        </Box>
      }
    </Card>
  )
}

export default SinglePost