
import { Box } from '@mui/system';
import Navbar from '../../components/Navbar/Navbar';
import MainContext from '../../components/MainContext/MainContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Suggestions from '../../components/Suggestions/Suggestions';

export const Home = () => {
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
