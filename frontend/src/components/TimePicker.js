import React, { useState } from 'react';
import { TimePicker } from 'react-ios-time-picker';
import '../styles/TimePicker.css';
import 'react-clock/dist/Clock.css';

const TimePickerComponent = () => {
  const [value, setValue] = useState('10:20 AM');

  const onChange = (timeValue) => {
    setValue(timeValue);
  }

  return (
    <div style={{margin:'150px'}}>
      <TimePicker 
      onChange={onChange} 
      value={value} 
      use12Hours 
      closeClock={true}
      />
    </div>
  );
}
export default TimePickerComponent;