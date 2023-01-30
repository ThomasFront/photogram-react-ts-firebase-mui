import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, TextareaAutosize } from '@mui/material';

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            />
            <Box sx={{
              display: 'flex',
              flexDirection: "column"
            }}>
              <Button>Wybierz zdjęcie</Button>
              <Button variant='contained'>Dodaj post</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddPostModal