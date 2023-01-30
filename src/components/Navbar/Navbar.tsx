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
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
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
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 2,
            display: "flex",
            fontFamily: 'Dancing Script, cursive, sans-seriff',
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
            fontSize: { xs: '20px', sm: '26px' }
          }}
        >
          Photogram
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
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