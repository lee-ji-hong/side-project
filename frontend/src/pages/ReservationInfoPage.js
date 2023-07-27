import React, { useEffect, useState } from 'react';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography, Alert } from '@mui/material';


import FullscreenModal from '../components/FullscreenModal';
import Information from '../components/UI/Information';
import { Snackbars } from '../styles/GlobalStyle';
import useHttpRequest from '../hook/use-http';
import Modal from '../components/Modal';

const ReservationInfoPage = () => {
  const { isLoading, sendGetRequest, sendDelRequest } = useHttpRequest();
  const [openFullModal, setOpenFullModal] = useState(false);
  const [reservation, setReservation] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  dayjs.locale('ko');

  const item = [
    {
      "id": 1,
      "startTime": "09:00:00",
      "dayTime": "2023-07-04",
      "reservationStatus": "예약완료",
      "cart": null

    }
  ]

  const openReviewModalHandler = (reservationId) => {
    setOpenFullModal(true)
  }

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
    const reservationHandler = data => {
      setReservation(data.data.result)
    };
    sendGetRequest(`/members/reservations`, reservationHandler);
  }, [snackbar]);

  return (
    <>{!isLoading && (
      <>
        <div className="reservation-length-wrap" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <Typography sx={{ color: '#ACB3BF', mr: '15px', fontSize: '15px' }}>총 {reservation?.length}개</Typography>
          <FormControlLabel
            sx={{ fontSize: '15px' }}
            control={<Checkbox
            // checked={open} onChange={() => { setOpen(!open) }} 
            />} label="완료 예약 숨김" />
        </div>
        {reservation?.length > 0 ? (
          <Grid container>
            {reservation.map((item) => {
              return (
                <React.Fragment key={item.reservationId}>
                  <Grid item xs={4}>
                    <Typography sx={{ textAlign: 'left' }}>{dayjs(item.dayTime).format('YY/MM/DD (ddd)')} {item.startTime}</Typography>
                  </Grid>
                  <Grid item
                    onClick={() => { navigate(`/reservationInfo/${item.reservationId}`) }}
                    xs={12} sx={{ textAlign: 'left', border: '1px solid #ACB3BF', borderRadius: '8px', height: '56px', m: '8px 0 ', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '10px' }}>{item.reservationStatus}</span>
                  </Grid>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={12} sx={{ display: item.reservationStatus === '예약중' ? 'none' : 'flex', justifyContent: 'flex-end' }}>
                    <Typography
                      onClick={() => openReviewModalHandler(item.reservationId)}
                      sx={{
                        display: item.reviewWrittenStatus ? '' : 'none', textAlign: 'right',
                        color: '#ACB3BF',
                        fontSize: '12px'
                      }}
                    >
                      리뷰 쓰기
                    </Typography>
                    <Typography
                      onClick={() => alert('다시 예약은 지원하지 않습니다.')}
                      sx={{
                        display: item.reviewWrittenStatus ? 'none' : '', textAlign: 'right',
                        textAlign: 'right',
                        color: '#ACB3BF',
                        fontSize: '12px',
                        ml: '8px'
                      }}
                    >
                      리뷰 보기
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ display: item.reservationStatus === '예약완료' ? 'none' : 'flex', justifyContent: 'flex-end' }}>
                    <Typography onClick={() => setOpen(true)} sx={{ textAlign: 'right', color: '#ACB3BF', fontSize: '12px' }}>예약 취소</Typography>
                    <Typography onClick={() => alert('예약 수정은 지원하지 않습니다.')} sx={{ textAlign: 'right', color: '#ACB3BF', fontSize: '12px', ml: '8px' }}>예약 수정</Typography>
                  </Grid>
                  {open &&
                    <Modal
                      open={open}
                      setOpen={setOpen}
                      title={"예약 취소"}
                      content={"예약을 취소하시겠습니까?"}
                      submitDetailHandler={() => submitDetailHandler(item.reservationId)}
                      // endpoint={`/members/reservation/${item.id}`}
                      button={"취소하기"}
                    />}
                  {openFullModal && <FullscreenModal open={openFullModal} setOpen={setOpenFullModal} reservationId={item.reservationId} />}
                </React.Fragment>
              );
            })}
          </Grid>

        ) : (
          <Box m="150px 0">
            <Information></Information>
            <Typography>예약한 상품이 없습니다.</Typography>
            <br /><br />
            <Button onClick={() => { navigate(`/pet-select`) }} sx={{ border: '1px solid #FCC400' }}>
              예약하러가기
            </Button>
          </Box>
        )}
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

export default ReservationInfoPage;