import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Paper } from '@mui/material';

const YearPicker = ({ label, onInputChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const printDate = (date) => {
    onInputChange(date.format('YYYY'));
  };
  return (
    <Paper
      elevation={isHovered ? 10 : 3} // Change elevation on hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: isHovered ? '15px' : '10px', // Adjust padding on hover
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: '#fafaf7',
        transition: 'all 0.3s ease-in-out', // Add a transition effect
      }}
    >
      <div style={{ marginRight: '20px', backgroundColor: '#fafaf7' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label={label} views={['year']} onChange={printDate} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </Paper>
  );
};

export default YearPicker;
