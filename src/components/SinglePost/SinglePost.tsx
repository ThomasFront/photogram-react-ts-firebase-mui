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
import { PostType } from '../../store/slices/postsSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

type PostProps = {
  post: PostType
}

const SinglePost = ({ post }: PostProps) => {
  const { description, addedById, addedByName, timestamp, url, avatarUrl } = post
  const [user] = useAuthState(auth)

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
        <IconButton aria-label="add like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="add comment">
          <ModeCommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default SinglePost