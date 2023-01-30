import { Box, Typography } from '@mui/material'
import { selectedCategory } from '../../store/slices/categorySlice'
import { useSelector } from 'react-redux'

const Suggestions = () => {
  const chosenCategory = useSelector(selectedCategory)
  return (
    <Box sx={{
      display: { xs: 'none', md: "block" },
      width: { xs: '50%', lg: '40%', xl: '40%' },
      mt: 16,
      mr: 4,
      p: 2,
      ml: { md: 2, lg: 0 },
      textAlign: { md: "center", lg: "left" }
    }}
    >
      {chosenCategory === 'All' && <Typography>
        Propozycje dla Ciebie:
      </Typography>}
    </Box>
  )
}

export default Suggestions