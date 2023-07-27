import { Divider, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useHttpRequest from '../hook/use-http';

const ReservationInfoDetailPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [totalPrice, setTotalPrice] = useState(0);
  const [pickUpData, setPickUpData] = useState({});
  const [reservation, setReservation] = useState({});
  const { reservationId } = useParams();
  const navigate = useNavigate();
  dayjs.locale('ko');

  useEffect(() => {
    const reservationHandler = data => {
      setReservation(data.data.result)
      setPickUpData(data.data.result.pickUp);
      setTotalPrice(data.data.result.totalServiceFare + data.data.result.pickup?.fare)
    };
    sendGetRequest(`/members/reservation/${reservationId}`, reservationHandler);
  }, []);

  // pickUpData.duration 분 단위 데이터
  const durationInMinutes = reservation.pickUp?.duration;

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

  return (
    <>
      {!isLoading && reservation && (
        <>
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            예약 정보
          </Typography>
          <Divider width="100%" />
          <Grid container mt="14px">
            <Grid item xs={3} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>예약 번호</Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>날짜/시간</Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>상태</Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>선택메뉴</Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>가격</Typography>
            </Grid>
            <Grid item xs={9} sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{reservationId} </Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{dayjs(reservation.dayTime).format('YY/MM/DD (ddd)')} {reservation.startTime} </Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{reservation.reservationStatus} </Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{reservation.services?.[0].serviceName} </Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{reservation.service?.[0].serviceFare?.toLocaleString()}원 </Typography>
            </Grid>
          </Grid>
          <div style={{ margin: '0 -24px', overflow: 'hidden' }}>
            <img alt="구분선" src="/line.png" style={{ opacity: '0.5' }} />
          </div>
          {reservation.pickUp !== null && (
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
                  <Typography sx={{ fontSize: '13px', m: '2px 0' }}>?</Typography>
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
          <Grid container mt="14px">
            <Grid item xs={8} sx={{ textAlign: 'left' }}>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>메뉴 가격</Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0' }}>총 결제금액</Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{reservation.service?.[0].serviceFare?.toLocaleString()}원 </Typography>
              <Typography sx={{ fontSize: '13px', m: '6px 0', color: '#6f737b' }}>{pickUpData !== null ? pickUpData.fare?.toLocaleString()+'원' : '픽업정보가 없습니다.'}</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ReservationInfoDetailPage;