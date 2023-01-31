import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../../store/slices/categorySlice'

export const ButtonGroupMobile = () => {
  const dispatch = useDispatch()

  const handleCategory = (category: string) => {
    dispatch(changeCategory(category))
  }

  return (
    <ButtonGroup
      variant="contained"
      size='small'
      color='info'
    >
      <Button
        sx={{ fontSize: { xs: '8px', sm: '12px' } }}
        onClick={() => handleCategory('All')}
      >
        Posty
      </Button>
      <Button
        sx={{ fontSize: { xs: '8px', sm: '12px' } }}
        onClick={() => handleCategory('Users')}
      >
        Społeczność
      </Button>
      <Button
        sx={{ fontSize: { xs: '8px', sm: '12px' } }}
        onClick={() => handleCategory('Profile')}
      >
        Profil
      </Button>
    </ButtonGroup>
  );
}

export default ButtonGroupMobile