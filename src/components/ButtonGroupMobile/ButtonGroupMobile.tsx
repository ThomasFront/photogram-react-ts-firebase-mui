import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../../store/slices/categorySlice'
import { Link } from 'react-router-dom';

export const ButtonGroupMobile = () => {
  const dispatch = useDispatch()


  return (
    <ButtonGroup
      variant="contained"
      size='small'
      color='info'
    >
      <Button
        sx={{ fontSize: { xs: '8px', sm: '12px' } }}
      >
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="/home">Posty</Link>
      </Button>
      <Button
        sx={{ fontSize: { xs: '8px', sm: '12px' } }}
      >
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="/users">Społeczność</Link>
      </Button>
      <Button
        sx={{ fontSize: { xs: '8px', sm: '12px' } }}
      >
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="/profile">Profil</Link>
      </Button>
    </ButtonGroup>
  );
}

export default ButtonGroupMobile