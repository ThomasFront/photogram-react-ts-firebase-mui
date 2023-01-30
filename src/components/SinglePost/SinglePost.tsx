import { Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserPhoto from '../../assets/images/user.png'
import ModeCommentIcon from '@mui/icons-material/ModeComment';

type PostProps = {
  post: {
    id: number,
    desc: string,
    url: string,
    user: string
  }
}

const SinglePost = ({ post }: any) => {
  const { desc, url, user } = post

  return (
    <Card sx={{ maxWidth: 500, mb: 6 }}>
      <CardHeader
        avatar={
          <Avatar src={UserPhoto} />
        }
        title={user}
        subheader="January 14, 2023"
      />
      {url && <CardMedia
        component="img"
        height="194"
        image={url}
        alt="Przykładowe zdjęcie"
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
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