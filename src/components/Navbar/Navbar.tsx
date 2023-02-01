import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { avatarMenuOptions } from '../../helpers';
import UserAvatar from '../../assets/images/user.png'
import { signOut } from '@firebase/auth';
import { auth, db, storage } from '../../firebase/firebase';
import { useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, userInfoSelector, UserInfoType } from '../../store/slices/userSlice';
import { addPost, loadingOff, PostType } from '../../store/slices/postsSlice'
import { format } from 'date-fns';
import ButtonGroupMobile from '../ButtonGroupMobile/ButtonGroupMobile';
import { getDownloadURL, ref } from 'firebase/storage';

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const userInfo = useSelector(userInfoSelector)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const getFirebasePosts = async () => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const newPost = doc.data() as PostType
      const imageRef = ref(storage, `images/${newPost.addedById}/${doc.id}.jpg`)
      const url = await getDownloadURL(imageRef)
      dispatch(addPost({
        ...newPost,
        postId: doc.id,
        url,
        timestamp: format(doc.data().timestamp, 'Pp')
      }))
    })
    dispatch(loadingOff())
  }

  const getFirebaseUser = async () => {
    try {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const docs = await getDocs(q)
        dispatch(updateUser(docs.docs[0].data() as UserInfoType))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFirebaseUser()
    if (user) {
      getFirebasePosts()
    }
    if (!user) {
      navigate("/")
    }
  }, [user])


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (setting: string) => {
    if (setting === 'Wyloguj') {
      await signOut(auth)
      navigate("/")
    } else if (setting === 'Mój profil') {
      navigate("/profile")
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ display: { md: 'none' } }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <ButtonGroupMobile />

        <Box>
          <Box sx={{
            flexGrow: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
          >
            {userInfo &&
              <Typography
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {userInfo.name}
              </Typography>
            }
            <Tooltip title="Ustawienia">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Default user avatar"
                  src={UserAvatar}
                  sx={{
                    width: { xs: '30px', sm: '40px' },
                    height: { xs: '30px', sm: '40px' }
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={!!anchorElUser}
            onClose={handleCloseUserMenu}
          >
            {avatarMenuOptions.map((setting) => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Container>
    </AppBar >
  );
}
export default Navbar;