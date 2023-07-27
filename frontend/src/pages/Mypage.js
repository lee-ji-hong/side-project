import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlBubbles, SlEarphonesAlt, SlMagicWand } from "react-icons/sl";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Alert, Box, Button, Card, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import { Snackbars } from '../styles/GlobalStyle';
import useHttpRequest from '../hook/use-http';
import AuthContext from '../store/auth-context';
import Modal from '../components/Modal';
const Mypage = () => {
  const { isLoading, sendGetRequest, sendDelRequest } = useHttpRequest();
  const [snackbar, setSnackbar] = useState(null);
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [review, setreview] = useState({});
  const [reservation, setReservation] = useState({});
  const [petInfo, setPetInfo] = useState([]);
  const navigate = useNavigate();

  const memberInfo = {
    name: '테스트',
    reservation: [{
      date: '6/30 (수) 오후 02:00',
      menu: '셀프 미용 (중형견)',
      etc: '예약 시간 30분 전 지정하신 위치로 모시러갈게요!'
    }],
    shopping: [],
    point: 1000,
  }

  const sliderRef = useRef(null);

  const handleSlideNext = () => {
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  const handleSlidePrev = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const handleCloseSnackbar = () => { setSnackbar(null) };

  const submitDetailHandler = async (reservationId) => {
    await sendDelRequest({
      endpoint: `/members/reservation/${reservationId}`,
    }, (response) => {
      if (response.success === true) {
        setSnackbar({ children: '삭제가 완료되었습니다.', severity: 'success' });
      } else {
        setSnackbar({ children: '실패했습니다. 다시 시도해주세요!', severity: 'error' });
      }
    })
  };

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      alert('로그인 먼저 진행해주세요')
      navigate(`/signin`);
    }
  }, []);

  useEffect(() => {
    const getMemberInfoHandler = data => {

      setInfo(data.data.result.user);
      setreview(data.data.result.review)
      setReservation(data.data.result.reservation)
    };
    sendGetRequest(`/members/user/info`, getMemberInfoHandler);
  }, [snackbar]);

  useEffect(() => {
    const getPetInfoHandler = data => {
      setPetInfo(data.data.result);
    };
    sendGetRequest(`/members/pet/all/view`, getPetInfoHandler);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <Typography fontWeight="800" sx={{ fontSize: '23px' }}>
              {info.name}님
            </Typography>
            <Typography type="button" onClick={() => { navigate('/profile') }} sx={{ fontSize: '16px', color: '#ACB3BF' }}>
              회원정보수정 {'>'}
            </Typography>
          </div>
          <Box m="40px 0">
            <Grid container>
              <Grid item xs={3.8}>
                <Typography>예약</Typography>
                <Typography mt="10px" fontWeight={700}>{reservation.numberOfReservations}</Typography>
              </Grid>
              <Grid item xs={0.1}>
              </Grid>
              <Grid item xs={4}>
                <Typography>리뷰</Typography>
                <Typography mt="10px" fontWeight={700}>{review.numberOfReviews}</Typography>
              </Grid>
              <Grid item xs={0.1}>
              </Grid>
              <Grid item xs={4}>
                <Typography>적립금</Typography>
                <Typography mt="10px" fontWeight={700}>{info.point}</Typography>
              </Grid>
            </Grid>
          </Box>
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="./line.png" style={{ opacity: '0.5' }} />
          </div>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '17px', m: '20px 0' }}>
            반려동물 {petInfo?.length}
          </Typography>
          {petInfo?.length > 0 && (
            <div
              style={{ overflowX: 'scroll' }}
              ref={sliderRef}>
              <Grid container style={{ flexWrap: 'nowrap' }}>
                {petInfo.map((pet, index) => (
                  <Grid item xs={6} key={index} sx={{ minWidth: '300px', marginRight: '10px' }}>
                    <Card sx={{ boxShadow: 'none', border: '1px solid #e5e5e5', m: '4px 5px', p: '35px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <img alt="pet_image" src='petProfile2.png' style={{ marginRight: '8px', width: '48px' }} />
                      <div style={{ width: '70%' }}>
                        <Typography textAlign="left" fontSize="14px" fontWeight='bold'>{pet.petName}</Typography>
                        <Typography sx={{ fontSize: '14px', color: '#ACB3BF', textAlign: 'left' }}>{pet.breed}</Typography>
                      </div>
                      <IconButton onClick={() => navigate('/pet-info')}>
                        <ChevronRightIcon />
                      </IconButton>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={6} sx={{ minWidth: '300px', marginRight: '10px' }}>
                  <Card sx={{ boxShadow: 'none', border: '1px solid #e5e5e5', m: '4px 5px', p: '40px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      type="button"
                      sx={{
                        fontSize: '14px',
                        color: '#ACB3BF',
                        backgroundColor: '#f4f4f4',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%'
                      }}>
                      {'+'}
                    </Typography>
                    <Typography type="button" sx={{ textAlign: 'left', width: '60%', fontSize: '14px', color: '#ACB3BF' }}>
                      반려동물 추가하기
                    </Typography>
                    <IconButton onClick={() => { navigate('/registration') }}>
                      <ChevronRightIcon />
                    </IconButton>
                  </Card>
                </Grid>
              </Grid>
            </div>
          )}
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="./line.png" style={{ opacity: '0.5' }} />
          </div>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '17px', m: '20px 0' }}>
            예약정보
          </Typography>
          {/* <Divider width="100%" /> */}
          {reservation.numberOfReservations > 0 ? (
            <>
              {reservation.reservationInfo
                .filter(reservation => reservation.reservationStatus === '예약중')
                .map(reservation => (
                  <div key={reservation.reservationId} style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: '10px 0 ' }}>
                    <Grid container>
                      <Grid item xs={2} sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: '13px', m: '2px 0' }}>날짜/시간</Typography>
                        <Typography sx={{ fontSize: '13px', m: '2px 0' }}>선택메뉴</Typography>
                        <Typography sx={{ fontSize: '13px', m: '2px 0' }}>기타</Typography>
                      </Grid>
                      <Grid item xs={10} sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{reservation.dayTime} {reservation.startTime}</Typography>
                        <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{reservation.reservationProducts?.length}</Typography>
                        <Typography sx={{ fontSize: '13px', m: '2px 0' }}>{reservation.reservationStatus}</Typography>
                      </Grid>
                    </Grid>
                    <div>
                      <Typography sx={{ fontSize: '15px', color: '#ACB3BF', textAlign: 'right' }}>
                        <Button onClick={() => setOpen(true)}>예약취소</Button>
                      </Typography>
                    </div>
                    {open &&
                      <Modal
                        open={open}
                        setOpen={setOpen}
                        title={"예약 취소"}
                        content={"예약을 취소하시겠습니까?"}
                        submitDetailHandler={() => submitDetailHandler(reservation.reservationId)}
                        button={'취소하기'}
                      />}
                  </div>
                ))}
            </>
          )
            : (
              <Box m="40px 0">
                <Typography sx={{ color: '#ACB3BF' }}>예약 내역이 없습니다.</Typography>
              </Box>
            )}
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="./line.png" style={{ opacity: '0.5' }} />
          </div>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '17px', mt: '20px' }}>
            버블샵
          </Typography>
          <List >
            <ListItem >
              <ListItemButton onClick={() => { navigate('/reservationInfo') }} >
                <ListItemText >
                  <Typography sx={{ fontSize: '13px' }}>예약/결제 내역</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ margin: '0 -24px' }} />
            <ListItem >
              <ListItemButton onClick={() => { navigate('/myreview') }} >
                <ListItemText>
                  <Typography sx={{ fontSize: '13px' }}>리뷰 관리</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ margin: '0 -24px' }} />
          </List>
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="./line.png" style={{ opacity: '0.5' }} />
          </div>
          <div>
            <Grid container m="20px 0">
              <Grid item xs={4} onClick={() => navigate('/myinquiry')}>
                <SlBubbles size='2rem' />
                <Typography sx={{ fontSize: '13px' }}>1:1 문의</Typography>
              </Grid>
              <Grid item xs={4} onClick={() => alert('준비중입니다.')}>
                <SlMagicWand size='2rem' />
                <Typography sx={{ fontSize: '13px' }}>이벤트</Typography>
              </Grid>
              <Grid item xs={4} onClick={() => navigate('/inquiry')}>
                <SlEarphonesAlt size='2rem' />
                <Typography sx={{ fontSize: '13px' }}>문의사항</Typography>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      {snackbar && (
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
  );
}

export default Mypage;