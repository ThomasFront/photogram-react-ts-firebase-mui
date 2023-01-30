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
import UserAvatar from '../../assets/images/user.png'
import { Avatar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux/es/exports';
import { changeCategory } from '../../store/slices/categorySlice';
import PeopleIcon from '@mui/icons-material/People';

export const Sidebar = () => {
  const dispatch = useDispatch()

  return (
    <Box sx={{
      display: { xs: "none", md: "block" },
      width: '100%',
      maxWidth: 360,
      height: '100vh'
    }}
    >
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
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
            onClick={() => dispatch(changeCategory('All'))}
            disablePadding
            sx={{ mt: 2 }}
          >
            <ListItemButton component="a">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Wszystkie posty" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => dispatch(changeCategory('Followers'))}
            disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <Diversity1Icon />
              </ListItemIcon>
              <ListItemText primary="Posty osób obserwowanych" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => dispatch(changeCategory('Users'))}
            disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Społeczność" />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => dispatch(changeCategory('Profile'))}
            disablePadding
          >
            <ListItemButton component="a">
              <ListItemIcon>
                <Avatar
                  alt="Default user avatar"
                  src={UserAvatar}
                  sx={{
                    width: 24,
                    height: 24
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Profil" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default Sidebar