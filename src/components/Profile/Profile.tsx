import { Box, Button, Divider, Typography } from '@mui/material'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db, storage } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { clearUser, updateAvatar, userInfoSelector } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { clearPosts } from '../../store/slices/postsSlice'
import userAvatar from '../../assets/images/user.png'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

const Profile = () => {
  const userInfo = useSelector(userInfoSelector)
  const dispatch = useDispatch()
  const [file, setFile] = useState<null | File>(null)
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const handleLogout = () => {
    dispatch(clearPosts())
    dispatch(clearUser())
    signOut(auth)
  }

  const updateUserAvatar = async () => {
    if (!file || !imageTypes.includes(file.type) || !userInfo) {
      return 'error'
    }

    const avatarRef = ref(storage, `avatars/${userInfo.uid}/avatar.jpg`);
    await uploadBytes(avatarRef, file)
    const avatarUrl = await getDownloadURL(avatarRef)

    const userRef = doc(db, "users", userInfo.uid);
    await updateDoc(userRef, {
      avatarUrl
    });

    dispatch(updateAvatar(avatarUrl))
    setFile(null)
  }

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        mt: 4,
      }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2
      }}>
        <img
          src={userInfo?.avatarUrl ? userInfo.avatarUrl : userAvatar}
          alt="Default user avatar"
          style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <Typography variant='h5' fontSize="20px">
            Cześć <span style={{ fontWeight: "bold" }}>{userInfo?.name}</span>!
          </Typography>
          <Typography variant='h6' sx={{ textAlign: "center" }} fontSize="16px">
            {userInfo?.email}
          </Typography>
        </Box>
      </Box>
      <Button component="label" sx={{ mt: 3 }}>
        Dodaj avatar
        <input hidden accept="image/*" multiple type="file" onChange={e => e.target.files?.length && setFile(e.target.files[0] as File)} />
      </Button>
      {file &&
        <Typography fontSize="12px">Wybrano: <span style={{ fontWeight: "bold" }}>{file.name}</span></Typography>
      }
      <Button variant="contained" color="secondary" onClick={updateUserAvatar}>
        Ustaw avatar
      </Button>
      <Button
        onClick={handleLogout}
        variant="contained"
        sx={{ mt: 4 }}
      >
        Wyloguj się
      </Button>
    </Box>
  )
}

export default Profile