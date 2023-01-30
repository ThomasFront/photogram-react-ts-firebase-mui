import { signOut } from '@firebase/auth';
import { Box } from '@mui/system';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../../components/Navbar/Navbar';
import MainContext from '../../components/MainContext/MainContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Suggestions from '../../components/Suggestions/Suggestions';
import { auth } from '../../firebase/firebase';

export const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user)
  return (
    <>
      <Box sx={{ display: { md: 'flex' }, justifyContent: { md: "space-between" } }}>
        <Sidebar />
        <Navbar />
        <MainContext />
        <Suggestions />
      </Box>
    </>
  )
}
