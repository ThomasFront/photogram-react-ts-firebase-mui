
import { Box } from '@mui/system';
import Navbar from '../../components/Navbar/Navbar';
import MainContext from '../../components/MainContext/MainContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Suggestions from '../../components/Suggestions/Suggestions';
import { Outlet, useLocation } from 'react-router-dom';

export const Home = () => {
  const location = useLocation()
  return (
    <Box sx={{ display: { md: 'flex' }, justifyContent: { md: "space-between" } }}>
      <Sidebar />
      <Navbar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        pt: 6,
      }}>
        <Outlet />
      </Box>
      <Suggestions />
    </Box>
  )
}
