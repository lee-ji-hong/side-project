import React,{ useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';



export default function TimeValidationMinTime({setSelectedTime,selectedTime}) {


  const handleTimeChange = (time) => {
    setSelectedTime(time);
    // 추가로 수행할 작업
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        sx={{ width: '100%' }}
        value={selectedTime}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>
  );
}