import React, { useState } from 'react';
import { useRecoilState, useRecoilValue,useRecoilCallback } from 'recoil';
import { Box, Button, Grid, Typography,Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TfiClose } from "react-icons/tfi";

import { addressState, cartItemState, petState, selectedItemState, totalPriceState } from '../../store/products';
import useHttpRequest from '../../hook/use-http';

export default function SwiperNavigation({ startTime, dayTime, productIds, setSnackbar,toggleDrawer }) {
  const [cartItem, setCartItem] = useRecoilState(cartItemState);
  const [open, setOpen] = useState(false);
  const { isLoading, sendPostRequest } = useHttpRequest();
  const selectedItems = useRecoilValue(selectedItemState)
  const serviceIds = selectedItems?.map(item => item.serviceId);
  const totalPrice = useRecoilValue(totalPriceState);
  const pickupInfo = useRecoilValue(addressState)
  const petId = useRecoilValue(petState);
  const navigate = useNavigate();

  //에러처리
  const errorMessage = responseData => {
    if (responseData.success === false) {
      if (responseData.data.result.reservationId) {
        return setSnackbar({ children: '예약 실패', severity: 'error' });
      }
      setSnackbar({ children: '예약이 불가한 시간입니다.', severity: 'error' });
      return
    } else if (responseData.success === true) {
      if (responseData.data.result.reservationId) {
        const reservationId= responseData.data.result.reservationId
        return navigate(`/payment/${reservationId}`);
      }
      setSnackbar({ children: '장바구니에 상품이 담겼습니다.', severity: 'success' });
      return
    }
  }

  const addCartHandler = async (boolean) => {
    // setCartItem(selectedItems);
    toggleDrawer(boolean);
    await sendPostRequest({
      endpoint: '/members/reservation/cart',
      bodyData:
      {
        "startTime": startTime,
        "dayTime": dayTime.format('YYYY-MM-DD'),
        "serviceIds": serviceIds,
        "petId": petId,
        "pickUpId" : pickupInfo.pickUpId
      },
    }, (response) => {
      errorMessage(response);
    })
  }

  const ReservationHandler = async (boolean) => {
    await sendPostRequest({
      endpoint: '/members/reservation',
      bodyData: {
        "startTime": startTime,
        "dayTime": dayTime.format('YYYY-MM-DD'),
        "serviceIds": serviceIds,
        "petId": petId,
        "pickUpId" : pickupInfo.pickUpId
      },
    }, (response) => {
      errorMessage(response);
    })
    toggleDrawer(boolean);
  }

  const removeSelectedItem = useRecoilCallback(({ snapshot, set }) => async (itemId) => {
    set(selectedItemState, (prevSelectedItems) =>
      prevSelectedItems.filter((item) => item.serviceId !== itemId)
    );

    const totalPrice = await snapshot.getPromise(totalPriceState);
    const removedItem = selectedItems.find((item) => item.serviceId === itemId);
    if (removedItem) {
      const newTotalPrice = totalPrice - removedItem.price;
      set(totalPriceState, newTotalPrice);
      if (newTotalPrice <= 0) {
        toggleDrawer(false);
      }
    }
  });

  return (
    <>
      <Box>
        {selectedItems.map((item) => (
          <Paper key={item.serviceId} elevation={2} sx={{ m: '20px 0', p: '10px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
              <div>
                <Typography fontWeight="700">{item?.serviceType}</Typography>
                {/* <Typography fontSize="13px" mt="8px">{item?.productDescription}</Typography> */}
              </div>
              <TfiClose onClick={() => removeSelectedItem(item.serviceId)} color="#B4B4B4" />
              
            </div>
            <Typography fontWeight="700">{item?.price}원</Typography>
          </Paper>
        ))}
        <br /><br /><br /><br />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          borderTop: '1px solid #F4F4F4',
          height: '100px',
          backgroundColor: 'white',
          boxSizing: 'content-box',
          p: '10px 0'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }} >
          <Typography fontWeight="700" sx={{ color: '#ACB3BF', mr: '15px' }}>총 {selectedItems.length}개의 상품</Typography>
          <Typography fontWeight="700" sx={{ color: '#FD2323' }}><span style={{ color: 'black' }}>총금액  </span>{totalPrice}원</Typography>
        </div>
        <div style={{ width: '100%' }}>
          <Grid container spacing={2} fontWeight="800" sx={{ fontSize: '16px', m: '10px 0', width: '100%', pr: '16px' }}>
            <Grid item xs={6}>
              <Button
                onClick={() => addCartHandler(false)}
                sx={{
                  width: '100%',
                  color: 'black',
                  // backgroundColor: '#FCC400',
                  height: '52px',
                  fontWeight: '800',
                  border: '1px solid #ACB3BF',
                }} > 장바구니</Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => { ReservationHandler(false) }}
                sx={{
                  width: '100%',
                  color: 'black',
                  backgroundColor: '#FCC400',
                  height: '52px',
                  fontWeight: '800',
                  '&:hover': {
                    backgroundColor: 'rgb(252 196 0 / 60%)'
                  }
                }} > 바로예약</Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
}