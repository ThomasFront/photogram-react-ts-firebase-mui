import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/material';
import uniqid from 'uniqid';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from 'react-redux'
import { addPost, addPostToTop, PostType } from '../../store/slices/postsSlice';
import { userInfoSelector } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux'
import { format } from 'date-fns';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export const AddPostModal = () => {
  const [description, setDescription] = React.useState('')
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userInfo = useSelector(userInfoSelector)

  const handlePost = async () => {
    const post = {
      description,
      postId: uniqid(),
      addedById: user?.uid,
      addedByName: userInfo?.name,
      timestamp: Date.now()
    }
    await setDoc(doc(db, "posts", uniqid()), post);
    dispatch(addPostToTop({
      ...post as PostType,
      timestamp: format(post.timestamp, 'Pp')
    }))
    setDescription("")
    handleClose()
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={handleOpen}
        sx={{
          fontWeight: 'bold',
          fontSize: "24px",
          mb: 4,
        }}
      >
        Dodaj post
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              Opis:
            </Typography>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Dodaj opis do swojego posta..."
              style={{ maxWidth: "365px", width: "100%", minHeight: "100px" }}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <Box sx={{
              display: 'flex',
              flexDirection: "column"
            }}>
              <Button>Wybierz zdjęcie</Button>
              <Button
                onClick={handlePost}
                variant='contained'
              >
                Dodaj post
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddPostModal