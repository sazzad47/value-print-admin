import { Box, useTheme } from '@mui/material'
import React from 'react'

const Placeholder = ({text}) => {
    const theme = useTheme();
    console.log('placeholder')
  return (
    <Box
          component="div"
          sx={{
            position: "absolute",
            top: "40px",
            left: "-15px",
            width: "280px",
            height: "50px",
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[200],
            borderRadius: "30px",
            borderBottomLeftRadius: "0",
            "::before": {
              content: '""',
              position: "absolute",
              top: "50px",
              width: "15px",
              height: "30px",
              backgroundColor: theme.palette.primary[400],
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              zIndex: "2",
            },
            "::after": {
              content: '""',
              position: "absolute",
              top: "50px",
              width: "15px",
              height: "15px",
              backgroundColor: theme.palette.background.alt,
            },
          }}
        >
          <div className="capitalize text-bold w-full h-full flex items-center justify-center px-5">
           Choose {text}
          </div>
        </Box>
  )
}

export default Placeholder