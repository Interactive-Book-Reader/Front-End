import { Typography, TextField } from '@mui/material';
import React,{useState} from 'react';

const TextBox = ({inputText,label, width,type, isMultiline,defaultValue}) => {
  const [value, setValue] = useState(defaultValue);
  const handleInputChange = (event) => {
    setValue(event.target.value);
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
            defaultValue={value}
            sx={{ width: '100%' }}
          />
        </div>
    )
}

export default TextBox;