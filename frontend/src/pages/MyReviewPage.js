import { Divider, Grid, Typography,Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; import 'dayjs/locale/ko';
import useHttpRequest from '../hook/use-http';
import MenuButton from '../components/ItemMenu'
import { Snackbars } from '../styles/GlobalStyle';

const MyReviewPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [snackbar, setSnackbar] = useState(null);
  const [review, setReview] = useState([]);
  const navigate = useNavigate();
  dayjs.locale('ko');

  const rating = (score) => {
    let star = []

    switch (score) {
      case 0.0:
        star = ['empty', 'empty', 'empty', 'empty', 'empty'];
        break;
      case 0.5:
        star = ['half', 'empty', 'empty', 'empty', 'empty'];
        break;
      case 1.0:
        star = ['full', 'empty', 'empty', 'empty', 'empty'];
        break;
      case 1.5:
        star = ['full', 'half', 'empty', 'empty', 'empty'];
        break;
      case 2.0:
        star = ['full', 'full', 'empty', 'empty', 'empty'];
        break;
      case 2.5:
        star = ['full', 'full', 'half', 'empty', 'empty'];
        break;
      case 3.0:
        star = ['full', 'full', 'full', 'empty', 'empty'];
        break;
      case 3.5:
        star = ['full', 'full', 'full', 'half', 'empty'];
        break;
      case 4.0:
        star = ['full', 'full', 'full', 'full', 'empty'];
        break;
      case 4.5:
        star = ['full', 'full', 'full', 'full', 'half'];
        break;
      case 5.0:
        star = ['full', 'full', 'full', 'full', 'full'];
        break;
    }

    return star.map((rating, index) => (
      <img key={index} alt="star" src={`./${rating}_star.png`} />
    ))
  }
  const handleCloseSnackbar = () => { setSnackbar(null) };
  
  useEffect(() => {
    const getMemberReviewsHandler = data => {
      setReview(data.data.result)
    };
    sendGetRequest(`/members/reviews`, getMemberReviewsHandler);
  }, [snackbar]);

  return (
    <>{!isLoading && (
      <>
        <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
          리뷰 {review?.length}개
        </Typography>
        <Divider width="100%" />
        <Grid container>
          {review?.map((item) => (
            <React.Fragment key={item.reviewId}>
              <Grid item xs={12} sx={{ textAlign: 'left', m: '10px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontWeight="bold">{item.reviewText}</Typography>
                  <MenuButton reviewId={item.reviewId} setSnackbar={setSnackbar}/>
                </div>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'left' }}>
                {rating(item.rating)}
              </Grid>
              <Grid item xs={8} sx={{ textAlign: 'right' }}>
                {dayjs(item.date).format('YY/MM/DD (ddd) HH:mm:ss')}
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'left', m: '20px 0' }}>
                {item.reviewText}
              </Grid>
              {item.reviewImages?.length > 0 && (
                <Grid item xs={12} sx={{ textAlign: 'left', m: '20px 0' }}>
                  <img alt="image_loading" src="./image_loading.png" style={{ marginRight: '8px' }} />
                  <img alt="image_loading" src="./image_loading.png" style={{ marginRight: '8px' }} />
                </Grid>
              )}
              <Divider width="100%" />
            </React.Fragment>
          ))}
        </Grid>
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

export default MyReviewPage;