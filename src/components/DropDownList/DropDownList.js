import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropDownList = ({ label,items,onchange}) => {
  const handleChange = (event) => {
    onchange(event.target.value); // Update the selectedValue state when the value changes
  };  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange} // Attach the handleChange event handler to the onChange event of Select
          sx={{
            '&:hover': {
              fontSize: '16px', // Increase the font size
            },
          }}
        >
          {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownList;
