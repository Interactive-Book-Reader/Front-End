import { Typography, TextField } from '@mui/material';
import React from 'react';

const TextBox = ({inputText,label, width}) => {
    return(
        <div style={{ width: {width}, marginRight: '20px' }}>
          <Typography
            variant="h7"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: '20px',
              color: 'black',
              textAlign: 'justify',
              marginLeft: '10px',
              marginTop: '10px',
            }}
          >
            {inputText}
          </Typography>
          <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            sx={{ width: '100%' }}
          />
        </div>
    )
}

export default TextBox;