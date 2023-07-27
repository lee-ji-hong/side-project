import React, { useState, useEffect, useContext } from 'react';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs'; import 'dayjs/locale/ko';
import { useNavigate } from 'react-router-dom';

import SelectItem from '../components/UI/SelectItem';
import Progressbar from '../components/Progress_bar'
import AuthContext from '../store/auth-context';
import MenuButton from '../components/ItemMenu'
import useHttpRequest from '../hook/use-http';

const ReviewPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [select, setSelect] = useState('');
  const [review, setReview] = useState({});
  const [reviewContent, setReviewContent] = useState({});
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  dayjs.locale('ko');


  const rating = (score) => {
    // console.log(typeof score);
    // console.log(score);
    let star = [];

    if (score === 0.0) {
      star = ['empty', 'empty', 'empty', 'empty', 'empty'];
    } else if (score > 0.0 && score <= 0.5) {
      star = ['half', 'empty', 'empty', 'empty', 'empty'];
    } else if (score > 0.5 && score <= 1.0) {
      star = ['full', 'empty', 'empty', 'empty', 'empty'];
    } else if (score > 1.0 && score <= 1.5) {
      star = ['full', 'half', 'empty', 'empty', 'empty'];
    } else if (score > 1.5 && score <= 2.0) {
      star = ['full', 'full', 'empty', 'empty', 'empty'];
    } else if (score > 2.0 && score <= 2.5) {
      star = ['full', 'full', 'half', 'empty', 'empty'];
    } else if (score > 2.5 && score <= 3.0) {
      star = ['full', 'full', 'full', 'empty', 'empty'];
    } else if (score > 3.0 && score <= 3.5) {
      star = ['full', 'full', 'full', 'half', 'empty'];
    } else if (score > 3.5 && score <= 4.0) {
      star = ['full', 'full', 'full', 'full', 'empty'];
    } else if (score > 4.0 && score <= 4.5) {
      star = ['full', 'full', 'full', 'full', 'half'];
    } else if (score > 4.5 && score <= 5.0) {
      star = ['full', 'full', 'full', 'full', 'full'];
    }

    return star.map((rate, index) => (
      <img key={index} alt="star" src={`./${rate}_star.png`} />
    ));
  }


  const reviews = [
    {
      id: 1,
      name: '김버블',
      rating: 3.5,
      reviewHead: '꼼꼼해요!',
      reviewText: '꼼꼼하게 커팅 잘해주셔서 너무 마음에 들어요.',
      date: '2023-07-05T09:30:00'
    },
    {
      id: 2,
      name: '김버블',
      rating: 3.5,
      reviewHead: '친절해요!',
      reviewText: '친절하게 커팅 잘해주셔서 너무 마음에 들어요.',
      date: '2023-07-05T09:30:00'
    },
    {
      id: 3,
      name: '김버블',
      rating: 3.5,
      reviewHead: '믿음직스러워요!',
      reviewText: '꼼꼼하고 친절한 커팅 감사합니다.',
      date: '2023-07-05T09:30:00'
    },
  ]

  const scoreAvg = (scores) => {
    if (review.scores) {
      const totalSum = Object.values(review.scores).reduce((sum, value) => sum + value, 0);
      const percentages = {};
      for (const key in review.scores) {
        const scoreCount = scores[key];
        const percentage = Math.floor((scoreCount / totalSum) * 100);
        percentages[key] = percentage // Round the percentage to two decimal places
      }

      function scoreName(name) {
        switch (name) {
          case '1_star':
            return '별로에요';
          case '2_star':
            return '그냥 그래요';
          case '3_star':
            return '보통이에요';
          case '4_star':
            return '맘에 들어요';
          case '5_star':
            return '아주 좋아요';
          default:
            return '';
        }
      }

      return Object.entries(percentages).map(([score, percentage]) => (
        <div key={score} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography minWidth="100px">{scoreName(score)}:</Typography>
          <Progressbar bgcolor="orange" progress={percentage} height={10} />
          <Typography >{percentage}%</Typography>
        </div>
      ));
    }
  }



  useEffect(() => {
    const getMemberReviewsHandler = data => {
      setReview(data.data.result)
      console.log(data.data.result)
    };

    if (!authCtx.isLoggedIn) {
      alert('로그인 먼저 진행해주세요')
      navigate(`/signin`);
      return
    }
    sendGetRequest(`/reviews/total/score`, getMemberReviewsHandler);
  }, []);

  useEffect(() => {
    const getMemberReviewsHandler = data => {
      setReviewContent(data.data.result)
      console.log(data.data.result)
    };
    sendGetRequest(`/members/reviews`, getMemberReviewsHandler);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <SelectItem setSelect={setSelect} select={select} />
          <Grid container spacing={2} fontWeight="800" sx={{ fontSize: '16px', m: '10px 0', width: '100%', alignItems: 'center' }}>
            <Grid item xs={6} md={2.5}>
              {rating(parseFloat(review.totalAvgScore).toFixed(1))}
            </Grid>
            <Grid item xs={6} md={2.9}>
              <Paper elevation={0} sx={{ width: '113px', height: '113px', backgroundColor: '#ffe9ef', borderRadius: '10px' }} >
                <Typography sx={{ color: '#FF2359', fontSize: '54px', lineHeight: '2.0' }}>{(review.totalAvgScore)?.toFixed(1)}</Typography>
              </Paper>
            </Grid>
            <Divider md={0.1} orientation="vertical" flexItem />
            <Grid item xs={12} md={6.5}>
              {scoreAvg(review.scores)}
            </Grid>
          </Grid>
          <Divider width="100%" />
          <Grid container>
            {Array.isArray(reviewContent) && reviewContent.length > 0 && (
              reviewContent.map((item) => (
                <React.Fragment key={item.reviewId}>
                  <Grid item xs={12} sx={{ textAlign: 'left', m: '10px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography fontWeight="bold">{item.reviewHead}</Typography>
                      <MenuButton reviewId={item.reviewId} />
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
                  {item.reviewImages?.length > 0 ?
                    (
                      item.reviewImages?.map((image, index) => {
                        const imageData = `data:image/jpeg;base64,${image}`;
                        return (
                          <div key={index}>
                            <img
                              style={{ maxWidth: '200px', height: 'auto' }}
                              src={imageData}
                              alt={`이미지 ${index + 1}`}
                            />
                          </div>
                        )
                      })
                    ) : (
                      <Grid item xs={12} sx={{ textAlign: 'left', m: '20px 0' }}>
                        <img alt="image_loading" src="./image_loading.png" style={{ marginRight: '8px' }} />
                        <img alt="image_loading" src="./image_loading.png" style={{ marginRight: '8px' }} />
                      </Grid>
                    )}
                  <Divider width="100%" />
                </React.Fragment>
              ))
            )}
          </Grid>
        </>
      )}
    </>
  )
}

export default ReviewPage;
