import React, { useState, useEffect, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import Information from '../components/UI/Information';
import { cartItemState } from '../store/products';
import AuthContext from '../store/auth-context';
import useHttpRequest from '../hook/use-http';
import Modal from '../components/Modal';

const CartPage = () => {
  const { isLoading, sendGetRequest, sendDelRequest } = useHttpRequest();
  const [cartItem, setCartItem] = useState([]);
  const [open, setOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const goToPayment = (reservationId) => {
    if (!authCtx.isLoggedIn) {
      alert('로그인 먼저 진행해주세요')
      navigate(`/signin`);
      return
    }
    navigate(`/payment/${reservationId}`);
  }

  const submitDetailHandler = async (reservationId) => {
    await sendDelRequest({
      endpoint: `/members/reservation/${reservationId}`,
    }, (response) => {
      setCartItem((prevCartItems) =>
        prevCartItems.filter((item) => item.reservationId !== reservationId)
      );
    })
  };

  useEffect(() => {
    const memberCart = data => {
      setCartItem(data.data.result)
    };
    sendGetRequest(`/members/reservations/cart/check`, memberCart);
  }, [setCartItem]);

  return (
    <>
      {!isLoading && (
        <>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '20px', m: '20px 0' }}>
            버블샵
          </Typography>
          {cartItem.length > 0 ? (
            <Box m="30px 0">
              {cartItem.map((item) => (
                <React.Fragment key={item.reservationId}>
                  <Grid container sx={{ borderTop: '1px solid #e5e5e5', p: '10px 0' }}>
                    <Grid item xs={3} sx={{ textAlign: 'left' }}>
                      <Typography>날짜/시간</Typography>
                      <Typography>선택메뉴</Typography>
                      <Typography>상태</Typography>
                    </Grid>
                    <Grid item xs={9} sx={{ textAlign: 'left' }}>
                      <Typography>{item.dayTime} </Typography>
                      <Typography> {item.serviceNames[0]}</Typography>
                      <Typography>{item.reservationStatus} </Typography>
                    </Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2}>
                      <Button onClick={() => setOpen(true)}>예약취소</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button onClick={() => { goToPayment(item.reservationId) }}>예약하러가기</Button>
                    </Grid>
                  </Grid>
                  {open &&
                    <Modal
                      open={open}
                      setOpen={setOpen}
                      title={"예약 취소"}
                      content={"예약을 취소하시겠습니까?"}
                      submitDetailHandler={() => submitDetailHandler(item.reservationId)}
                      button={"취소하기"}
                    />}
                </React.Fragment>
              ))}
              <Divider width="100%" />
            </Box>
          ) : (
            <Box m="150px 0">
              <Information></Information>
              <Typography>장바구니가 비어있습니다.</Typography>
              <br /><br />
              <Button onClick={() => { navigate(`/pet-select`) }} sx={{ border: '1px solid #FCC400' }}>
                예약하러가기
              </Button>
            </Box>
          )}
        </>
      )}
    </>

  )
}

export default CartPage;
