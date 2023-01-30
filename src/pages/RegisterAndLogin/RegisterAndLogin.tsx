import { AccountCircle, Phone } from '@mui/icons-material'
import { TextField, Container, Typography, Button, InputAdornment } from '@mui/material'
import { Box } from '@mui/system'
import KeyIcon from '@mui/icons-material/Key';
import PhoneLogo from '../../assets/images/mainpagePhone.png'
import Typewriter from 'typewriter-effect';
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from 'react';
import { typeWriterOptions } from '../../helpers';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { auth, db } from '../../firebase/firebase';
import { useNavigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { addDoc, collection, doc, setDoc } from '@firebase/firestore';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

type Inputs = {
  name: string,
  email: string,
  password: string,
};

const RegisterAndLogin = () => {
  const [registerForm, setRegisterForm] = useState(false)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/home")
    }
  }, [user])

  const handleNameValidation = () => {
    if (registerForm) {
      return yup.string().required('Nazwa użytkownika jest wymagana').min(6, 'Nazwa musi się składać z min. 6 znaków').max(20, 'Nazwa może zawierać max. 20 znaków')
    }
    return yup.string()
  }

  const schema = yup.object().shape({
    name: handleNameValidation(),
    email: yup.string().email('Wprowadź prawidłowy schemat email').required('Email jest wymagany'),
    password: yup.string().required('Hasło jest wymagane').min(6, 'Hasło musi się składać z min. 6 znaków').max(20, 'Hasło może zawierać max. 20 znaków'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, name }) => {
    try {
      if (registerForm) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name,
          email,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate("/home")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
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
          borderRadius: "38px",
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
            mb: 2,
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {registerForm &&
              <TextField
                {...register("name")}
                label="Nazwa użytkownika"
                type="text"
                variant="filled"
                sx={{ width: '80%', m: '0 auto' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendarIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            }
            <TextField
              {...register("email")}
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
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
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
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              sx={{ width: '80%', m: '20px auto' }}
              variant="contained"
              type='submit'
            >
              {registerForm ? 'Zarejestruj się' : 'Zaloguj się'}
            </Button>
          </form>
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
              onClick={registerForm ?
                () => setRegisterForm(false)
                :
                () => setRegisterForm(true)}
            >
              {registerForm ? 'Zaloguj się' : 'Zarejestruj się'}
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container >
  )
}

export default RegisterAndLogin