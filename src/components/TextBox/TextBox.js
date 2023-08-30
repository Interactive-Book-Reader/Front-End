import { Typography, TextField } from '@mui/material';
import React from 'react';

const TextBox = ({inputText,label, width,type, isMultiline,defaultValue,onInputChange}) => {

  const handleInputChange = (event) => {
    const newValue = event.target.value;  
    onInputChange(newValue); // Call the callback with the new value
  };
  
    return(
        <div style={{ width: width, marginRight: '20px' }}>
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
            {inputText}:   {defaultValue}
          </Typography>
          <TextField
            id="outlined-basic"
            label={label}
            type={type}
            variant="outlined"
            multiline={isMultiline}
            onChange={handleInputChange}
            sx={{ width: '100%' }}
          />
        </div>
    )
}

export default TextBox;