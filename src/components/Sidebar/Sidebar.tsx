import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import userAvatar from '../../assets/images/user.png'
import { Avatar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux/es/exports';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux'
import { userInfoSelector } from '../../store/slices/userSlice';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(userInfoSelector)

  return (
    <Box sx={{
      display: { xs: "none", md: "block" },
      width: '100%',
      maxWidth: 360,
      height: '100vh',
      position: "sticky",
      top: 0,
      left: 0
    }}
    >
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <Box>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/home"
              sx={{
                ml: 2,
                fontFamily: 'Dancing Script, cursive, sans-seriff',
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '32px',
              }}
            >
              Photogram
            </Typography>
          </Box>
          <ListItem
            disablePadding
            sx={{ mt: 2 }}
          >
            <ListItemButton component={Link} to="/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Wszystkie posty" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <Diversity1Icon />
              </ListItemIcon>
              <ListItemText primary="Posty osób obserwowanych" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding>
            <ListItemButton component={Link} to="/users">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Społeczność" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
          >
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon>
                <Avatar
                  alt="Default user avatar"
                  src={userInfo?.avatarUrl ? userInfo.avatarUrl : userAvatar}
                  sx={{
                    width: 24,
                    height: 24
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={`Profil (${userInfo?.name})`} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default Sidebar