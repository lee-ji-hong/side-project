import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';

import { Alert, Box, Button, Checkbox, Divider, FormControlLabel, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DistanceDrawer from '../components/DistanceDrawer';
import Navigation from '../components/UI/Navigation';
import { selectedItemState } from '../store/products';
import { Snackbars } from '../styles/GlobalStyle';
import { addressState } from '../store/products';
import useHttpRequest from '../hook/use-http';

const ReservationPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const selectedItems = useRecoilValue(selectedItemState);
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [snackbar, setSnackbar] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  const productIds = selectedItems.map(item => item.serviceId);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null)
  };
  const navigate = useNavigate();
  const onClickHandler = () => {
    setNavOpen(!navOpen)
  };

  const toggleDrawer = () => {
    setNavOpen(!navOpen)
  };

  const handleSelectTime = async (time) => {
    setSelectedTime(time);

    const selectTimeHandler = data => {
      if (selectedTime !== '' && data.success === true) {
        setSnackbar({ children: '처리 완료되었습니다.', severity: 'success' });
      } else
        setSnackbar({ children: '예약이 불가한 시간입니다.', severity: 'error' });
    };
    sendGetRequest(`/members/timeslot2/${productIds}?dayTime=${selectedDate.format('YYYY-MM-DD')}&reserveTimeStr=${time}`
      , selectTimeHandler,
      errorMessage)

  };

  //에러처리
  const errorMessage = responseData => {
    if (responseData.success === false) {
      setSnackbar({ children: responseData.error.description, severity: 'error' });
    } return
  }

  useEffect(() => {
    const getMemberInfoHandler = data => {
      setAvailableTime(data.data.availableTime);
    };
    sendGetRequest(`/members/send/available/day/${productIds}?dayTime=${selectedDate.format('YYYY-MM-DD')}`,
      getMemberInfoHandler,
      errorMessage);
  }, [selectedDate]);


  const resevationTime = [
    {
      available: "y",
      time: "08:00"
    },
    {
      available: "y",
      time: "08:30"
    },
    {
      available: "y",
      time: "09:00"
    },
    {
      available: "y",
      time: "09:30"
    },
    {
      available: "n",
      time: "10:00"
    },
    {
      available: "y",
      time: "10:30"
    },
    {
      available: "y",
      time: "11:30"
    },
    {
      available: "y",
      time: "12:00"
    },
    {
      available: "n",
      time: "12:30"
    },
  ]

  return (
    <>
      {!isLoading ? (
        <>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            날짜 선택
          </Typography>
          <Divider width="100%" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
            sx={{ display: 'flex' }} 
            value={selectedDate} 
            onChange={handleDateChange} 
            disablePast/>
          </LocalizationProvider>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            시간 선택
          </Typography>
          <Divider width="100%" />
          <Box sx={{ m: '40px 0' }}>
            <Grid container>
              {availableTime?.length > 0 && availableTime?.map((time) => (
                <Grid item xs={2} md={1} key={time.time}>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                      p: '15px 0',
                      mb: '5px',
                      backgroundColor: time.time === selectedTime ? '#FCC400' : 'transparent',
                      color: time.time === selectedTime ? 'white' : '',
                    }}
                    // disabled={time.time === selectedTime}
                    onClick={() => handleSelectTime(time.time)}
                  >
                    {time.time}
                  </Button>
                </Grid>
              ))}
              {availableTime?.length <= 0 && (
                <Grid item xs={2} >
                  <Button sx={{ backgroundColor: '#f4f4f4', color: '#ff695b', mb: '5px' }}>예약마감</Button>
                </Grid>
              )}
            </Grid>
          </Box>
          <Navigation
            onClickHandler={onClickHandler}
            open={navOpen}
            setOpen={setNavOpen}
            title={"예약하기"}
            startTime={selectedTime}
            dayTime={selectedDate}
            productIds={productIds}
            setSnackbar={setSnackbar}
            toggleDrawer={toggleDrawer}
          />
          {!navOpen && snackbar && (
            <Snackbars
              open
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={handleCloseSnackbar}
              autoHideDuration={2000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbars>
          )}
        </>
      ) : (
        <div>
          대기중
        </div>
      )}

    </>
  )
}

export default ReservationPage;
