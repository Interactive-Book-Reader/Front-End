import React, { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import SubTopic from 'src/components/Topic/SubTopic';
import { Paper } from '@mui/material';

const TextBox = ({ inputText, label, width, type, isMultiline, onInputChange, defaultValue }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onInputChange(newValue); // Call the callback with the new value
  };

const TextBox = ({inputText,label, width,type, isMultiline}) => {
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
            {inputText}
          </Typography>
          <TextField
            id="outlined-basic"
            label={label}
            type={type}
            variant="outlined"
            multiline={isMultiline}
            sx={{ width: '100%' }}
          />
        </div>
    )
}
}
export default TextBox;

