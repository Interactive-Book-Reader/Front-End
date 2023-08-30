import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const YearPicker= ({ label,onInputChange}) => {
  const printDate = (date) => {
    onInputChange(date.format('YYYY'));
  };
  return (
    <div style={{ marginRight: '20px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={label} views={['year']} onChange={printDate}/>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default YearPicker;
