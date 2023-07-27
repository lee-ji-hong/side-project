import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography, Divider, ButtonBase, IconButton } from '@mui/material';
import dayjs from 'dayjs';

import DogHotelPage from './DogHotelPage';
import DogDyeingPage from './DogDyeingPage';
import useHttpRequest from '../hook/use-http';
import SelfGroomingPage from './SelfGroomingPage';
import Navigation from '../components/UI/Navigation';
import MobileGroomingPage from './MobileGroomingPage';
import SwiperTimePicker from '../components/SwiperTimePicker';
import { weightState, sizeState, petState, pickupState, addressState, pickupTimeState } from '../store/products';
import ProductListComponent from '../components/ProductListComponent';
import Modal from '../components/Modal';
import TimePickerComponent from '../components/TimePicker';
import SwipeableEdgeDrawer from '../components/SwiperDrawer';
import PickupTime from '../components/PickupTime';
import DistanceDrawer from '../components/DistanceDrawer';

const ShopsPage = () => {
  const [selectedTime, setSelectedTime] = useRecoilState(pickupTimeState);
  const [checked, setChecked] = useRecoilState(pickupState);
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [weight, setWeight] = useRecoilState(weightState);
  const [breed, setBreed] = useRecoilState(sizeState);
  const [modalOpen, setModalOpen] = useState(false);
  const pickUpData = useRecoilValue(addressState)
  const [navOpen, setNavOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const petId = useRecoilValue(petState);
  const navigate = useNavigate();

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
    const infoHandler = data => {
      setProduct(data.data.result);
    };
    sendGetRequest(`/members/service/price/${petId}`, infoHandler);
  }, []);

  const onClickHandler = () => { navigate('/reservation') };

  const timePicker = () => {
    return (
      <div>
        <SwiperTimePicker setSelectedTime={setSelectedTime} selectedTime={selectedTime} />
      </div>
    )
  }

  const submitDetailHandler = () => {
    setModalOpen(true)
  };

  const updatePickupState = (newOpen) => {
    setChecked(newOpen)
    setNavOpen(newOpen)
  };

  return (
    <>{!isLoading && (
      <>
        <div className="pickup">
          <Typography className="pickup-text">
            <span>픽업 서비스</span>이용할게요
          </Typography>
          <FormControlLabel control={<Checkbox checked={checked} onChange={() => { updatePickupState(!checked) }} />} label="선택" />
        </div>
        {checked && pickUpData.startLocation !== '' && (
          // 시간과 분으로 변환하여 출력
          <>
            <div className="pickup-time">
              <Typography>출발지</Typography>
              <Typography>{pickUpData.startLocation}</Typography>
            </div>
            <div className="pickup-time">
              <Typography>예약시간</Typography>
              <Typography>{dayjs(selectedTime).format('HH:mm a')}</Typography>
            </div>
            <div className="pickup-time">
              <Typography>도착지</Typography>
              <Typography>{pickUpData.endLocation}</Typography>
            </div>
            <div className="pickup-time">
              <Typography>거리(m)</Typography>
              <Typography>{formatDistance(pickUpData.distance)}</Typography>
            </div>
            <div className="pickup-time">
              <Typography>시간(분)</Typography>
              <Typography>{hours}시간 {minutes}분</Typography>
            </div>
            <div className="pickup-time">
              <Typography>요금(원)</Typography>
              <Typography>{pickUpData.fare?.toLocaleString()}원</Typography>
            </div>
          </>
        )}
        {/* <div>
          {navOpen &&
            <TimePickerComponent />
            <SwiperTimePicker setSelectedTime={setSelectedTime} selectedTime={selectedTime}/> 
          }
        </div> */}
        <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
          <img alt="구분선" src="./line.png" style={{ opacity: '0.5' }} />
        </div>
        <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '17px', m: '20px 0' }}>
          컷
        </Typography>
        {
          !isLoading && (
            <>
              <ProductListComponent product={product} />
            </>
          )
        }
        <br /><br /><br />
        <Navigation onClickHandler={onClickHandler} open={open} setOpen={setOpen} title={"선택완료"} />
        {/* {setModalOpen &&
          <SwipeableEdgeDrawer
            open={modalOpen}
            setOpen={setModalOpen}
          // startTime={startTime}
          // dayTime={dayTime}
          // productIds={productIds}
          // setSnackbar={setSnackbar}
          >
            <PickupTime/>
          </SwipeableEdgeDrawer>} */}
        {navOpen &&
          <Modal
            open={navOpen}
            setOpen={setNavOpen}
            title={"예약 시간"}
            content={<>{timePicker()}</>}
            // endpoint={`/members/reservation/1`}
            submitDetailHandler={submitDetailHandler}
            button={'선택완료'}
          />}
      </>
    )}
      {modalOpen && <DistanceDrawer modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </>
  )
}

export default ShopsPage;
