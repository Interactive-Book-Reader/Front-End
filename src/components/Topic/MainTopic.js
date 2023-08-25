import React from 'react';
import { Typography } from '@mui/material';

const MainTopic = ({text}) => {
    return (
        <>
         <Typography
        variant="h5"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {text}
      </Typography>
      </>
       
    );
};

export default MainTopic;