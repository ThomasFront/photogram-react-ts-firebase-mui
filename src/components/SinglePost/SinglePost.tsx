import { Typography } from '@mui/material'
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
import { addLikeToPost, PostType } from '../../store/slices/postsSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts } from '../../store/slices/postsSlice'
import { useEffect, useState } from 'react';

type PostProps = {
  post: PostType
}

const SinglePost = ({ post }: PostProps) => {
  const { description, addedById, addedByName, timestamp, url, avatarUrl, likes, postId } = post
  const [user] = useAuthState(auth)
  const [isLiked, setIsLiked] = useState(false)
  const posts = useSelector(allPosts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (likes.includes(user?.uid as string)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [])


  const handleLike = async (postId: string) => {
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
      wordBreak: 'break-all'
    }}
    >
      <CardHeader
        avatar={
          <Avatar src={avatarUrl ? avatarUrl : userPhoto} />
        }
        title={user?.uid === addedById ? `Ty (${addedByName})` : addedByName}
        subheader={timestamp}
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
          onClick={() => handleLike(postId)}
          aria-label="add like"
          sx={{ color: `${isLiked && 'rgb(227, 41, 27)'}` }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography>{showLikes()}</Typography>
        <IconButton aria-label="add comment">
          <ModeCommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default SinglePost