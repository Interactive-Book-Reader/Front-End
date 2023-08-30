import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

const YearPicker= ({ label,onInputChange}) => {
  
  return (
    <div style={{ marginRight: '20px' }}>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <TextField
                  required
                  fullWidth
                  id="date"
                  label="Date of birth"
                  type="date"
                  name="birthday"
                  autoComplete="family-name"
                  onChange={(event) => onInputChange(event.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default YearPicker;
