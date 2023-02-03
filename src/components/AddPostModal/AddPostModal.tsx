import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/material';
import uniqid from 'uniqid';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from 'react-redux'
import { addPost, addPostToTop, PostType } from '../../store/slices/postsSlice';
import { userInfoSelector } from '../../store/slices/userSlice';
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  bgcolor: 'background.paper',
  border: '1px solid #ababab',
  borderRadius: '6px',
  boxShadow: 24,
  p: 2,
};

export const AddPostModal = () => {
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState<null | File>(null)
  const userInfo = useSelector(userInfoSelector)
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const handlePost = async () => {
    if (!description || !file || !imageTypes.includes(file.type) || !user || !userInfo) {
      return setError(true)
    }
    const post = {
      description,
      addedById: user.uid,
      addedByName: userInfo.name,
      timestamp: Date.now(),
      likes: [],
    }

    const doc = await addDoc(collection(db, "posts"), post);

    const imageRef = ref(storage, `images/${user.uid}/${doc.id}.jpg`);
    await uploadBytes(imageRef, file)
    const url = await getDownloadURL(imageRef)

    dispatch(addPostToTop({
      ...post,
      postId: doc.id,
      url,
      avatarUrl: userInfo?.avatarUrl || null,
      timestamp: format(post.timestamp, 'Pp')
    }))

    setDescription("")
    setError(false)
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
            {error &&
              <Typography sx={{ color: 'crimson', fontSize: '12px' }}>Nie możesz dodać postu bez treści lub zdjęcia</Typography>
            }
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
              {file &&
                <Typography fontSize="12px">Wybrano: <span style={{ fontWeight: "bold" }}>{file.name}</span></Typography>
              }
              <Button variant="contained" component="label" color='secondary' sx={{ my: 2 }}>
                Dodaj zdjęcie
                <input hidden accept="image/*" type="file" onChange={e => e.target.files?.length && setFile(e.target.files[0] as File)} />
              </Button>
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