import { useState } from "react";
import TimeValidationMinTime from "./SwiperTimePicker";
import dayjs from 'dayjs';

const PickupTime = () => {
  const [selectedTime, setSelectedTime] = useState(dayjs());
console.log(selectedTime)
  return (
    <div>
      <TimeValidationMinTime setSelectedTime={setSelectedTime} selectedTime={selectedTime}/>
    </div>
  )
}

export default PickupTime;