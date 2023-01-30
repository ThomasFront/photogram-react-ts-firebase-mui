import { AccountCircle, Phone } from '@mui/icons-material'
import { TextField, Container, Typography, Button, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import KeyIcon from '@mui/icons-material/Key';
import PhoneLogo from '../../assets/images/mainpagePhone.png'
import Typewriter from 'typewriter-effect';
import { useState } from 'react';

const typeWriterOptions = {
  strings: ['Dodawaj zdjęcia i posty...', 'Poznaj nowe osoby...', 'Lajkuj i komentuj...', 'Rozmawiaj ze znajomymi...'],
  autoStart: true,
  loop: true,
  pauseFor: 1000,
  delay: 70,
  deleteSpeed: 30
}

const Register = () => {
  const [registerForm, setRegisterForm] = useState(false)

  const handleLogin = () => {
    setRegisterForm(false)
  }

  const handleRegister = () => {
    setRegisterForm(true)
  }

  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
    >
      <Box
        component="img"
        sx={{
          display: { xs: "none", md: "block" },
          width: { md: "24%", lg: "22%" },
          mr: "40px",
          border: "1px solid #eaeaea",
          borderRadius: "28px"
        }}
        alt="Photogram logo"
        src={PhoneLogo}
      />
      <Box sx={{
        bgcolor: 'white',
        border: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        py: { sm: 4 },
        px: { sm: 8 },
        width: { md: "50%", lg: "45%" }
      }}
      >
        <Typography
          variant='h4'
          sx={{
            fontFamily: 'Dancing Script, cursive',
            mt: 4,
            fontSize: { sm: '42px' }
          }}
        >
          Photogram
        </Typography>
        <Box
          sx={{
            fontSize: { xs: "14px" },
            mt: 1,
            mb: 2
          }}
        >
          <Typewriter options={typeWriterOptions} />
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: '100%',
          mx: 8,
        }}
        >
          <TextField
            label="Email"
            type="email"
            variant="filled"
            sx={{ width: '80%', m: '0 auto' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Hasło"
            type="password"
            variant="filled"
            sx={{ width: '80%', m: '0 auto' }} InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{ width: '80%', m: '20px auto' }}
            variant="contained"
          >
            {registerForm ? 'Zarejestruj się' : 'Zaloguj się'}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mb: 4
          }}
        >
          <Typography
            textAlign="center"
          >
            {registerForm ? 'Masz juz konto? ' : 'Nie masz konta? '}
            <Button
              size="small"
              sx={{ display: "block" }}
              onClick={registerForm ? handleLogin : handleRegister}
            >
              {registerForm ? 'Zaloguj się' : 'Zarejestruj się'}
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container >
  )
}

export default Register