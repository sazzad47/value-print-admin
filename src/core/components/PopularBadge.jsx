import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const GridWithBox = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '5',
        mt: '100px',
        p: '5',
      }}
      component="div"
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '56px',
          height: '56px',
          bg: 'white',
          border: '1px solid',
        }}
        component="div"
      >
        <Box
          sx={{
            position: 'absolute',
            left: '0',
            top: '0',
            height: '16px',
            width: '16px',
          }}
          component="div"
        >
          <Typography
            sx={{
              position: 'absolute',
              transform: 'rotate(-45deg)',
              bg: 'gray.600',
              color: 'white',
              fontWeight: 'bold',
              py: '1',
              left: '-34px',
              top: '32px',
              width: '170px',
            }}
            component="div"
            variant="subtitle1"
          >
            Popular
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GridWithBox;
