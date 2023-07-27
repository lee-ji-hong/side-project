import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Navigation from '../components/UI/Navigation';
import { addressState, pickupState, totalPriceState } from '../store/products';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';

import DistanceDrawer from '../components/DistanceDrawer';
import useHttpRequest from '../hook/use-http';
import TimePicker from '../components/TimePicker';
import SwiperTimePicker from '../components/SwiperTimePicker';
import Modal from '../components/Modal';

const PaymentPage = () => {
  const [checked, setChecked] = useRecoilState(pickupState);
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [pickUpData,setPickUpData] = useState({});
  const [navOpen, setNavOpen] = useState(false);
  const [member, setMember] = useState({});
  const [open, setOpen] = useState(false);
  const { reservationId } = useParams();

  const onClickHandler = () => { alert('결제 완료!') };

  const updatePickupState = (newOpen) => {
    setChecked(newOpen)
    setNavOpen(newOpen)
  };
  const timePicker = () => {
    return <SwiperTimePicker />
  }

  // pickUpData.duration 분 단위 데이터
  const durationInMinutes = pickUpData.duration;

  // 시간과 분으로 변환하여 출력
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  // 미터를 킬로미터와 미터로 변환하는 함수
  const formatDistance = (distanceInMeters) => {
    const km = Math.floor(distanceInMeters / 1000);
    const m = distanceInMeters % 1000;
    let formattedDistance = '';
    if (km > 0) {
      formattedDistance += km;
      if (m >= 100) {
        formattedDistance += (m / 1000).toFixed(1) + 'km';
      }
    }
    else {
      formattedDistance += m + 'm';
    }
    return formattedDistance.trim();
  };

  useEffect(() => {
    const memberInfo = data => {
      setMember(data.data.result);
      setPickUpData(data.data.result.pickup);
      setTotalPrice(data.data.result.totalServiceFare  + data.data.result.pickup?.fare)
    };
    sendGetRequest(`/members/payment/page/get/${reservationId}`, memberInfo);
  }, []);

  return (
    <>
      {!isLoading && member && (
        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            이용자 정보
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label={member.name}
            name="username"
            autoComplete="username"
            autoFocus
            // onChange={validateInput}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label={member.phoneNumber}
            name="phoneNumber"
            autoFocus
            // onChange={validateInput}
            disabled
          />
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="/line.png" style={{ opacity: '0.5' }} />
          </div>
          {/* <FormControlLabel control={<Checkbox checked={open} onChange={() => { setOpen(!open) }} />} label="예약자 정보와 동일합니다" /> */}
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            예약 정보
          </Typography>
          <Divider width="100%" />
          <Grid container sx={{ textAlign: 'left', m: '20px 0' }}>
            <Grid item xs={2} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>날짜/시간</Typography>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>선택메뉴</Typography>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>가격</Typography>
            </Grid>
            <Grid item xs={10} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{member.dayTime} {member.startTime}</Typography>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{member.services?.[0].serviceName}</Typography>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{member.totalServiceFare?.toLocaleString()}원</Typography>
            </Grid>
          </Grid>
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="/line.png" style={{ opacity: '0.5' }} />
          </div>
          {member.pickup && (
            <>
              <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
                픽업 정보
              </Typography>
              <Divider width="100%" />
              <Grid container sx={{ textAlign: 'left', m: '20px 0' }}>
                <Grid item xs={2} sx={{ textAlign: 'left' }}>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>출발지</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>예약시간</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>도착지</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>거리(m)</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>시간(분)</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>요금(원)</Typography>
                </Grid>
                <Grid item xs={10} sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{pickUpData.startLocation}</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{member.dayTime} {member.startTime}</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{pickUpData.endLocation}</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{formatDistance(pickUpData.distance)}</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{hours}시간 {minutes}분</Typography>
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{pickUpData.fare?.toLocaleString()}원</Typography>
                </Grid>
              </Grid>
              <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
                <img alt="구분선" src="/line.png" style={{ opacity: '0.5' }} />
              </div>
            </>
          )}

          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            결제 정보
          </Typography>
          <Divider width="100%" />
          <Grid container sx={{ textAlign: 'left', m: '20px 0' }}>
            <Grid item xs={2} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>메뉴가격</Typography>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>픽업 서비스</Typography>
            </Grid>
            <Grid item xs={10} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{member.totalServiceFare?.toLocaleString()}원</Typography>
              <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{pickUpData.fare?.toLocaleString()}원</Typography>
            </Grid>
          </Grid>
          <br /><br /><br /><br /><br /><br />
        </Box>
      )}
      <Navigation onClickHandler={onClickHandler} open={open} setOpen={setOpen} title={"결제하기"} />
      {/* {navOpen && <DistanceDrawer open={navOpen} setOpen={setNavOpen} />} */}
      {navOpen &&
        <Modal
          open={navOpen}
          setOpen={setNavOpen}
          title={"예약 취소"}
          content={timePicker()}
          // endpoint={`/members/reservation/1`}
          button={'완료'}
        />}
    </>
  )
}

export default PaymentPage;
