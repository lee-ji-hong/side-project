import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHttpRequest from '../hook/use-http';

import { Box, Divider, Grid, Typography } from '@mui/material';
import Information from './UI/Information';
import Footer from '../layout/Footer';
import ImageSlider from './ImageSlider';

export default function MainpageComponent({ children, title }) {

  const categories = [
    { root: `/shops`, name: '소형견' },
    { root: '/shops', name: '중형견' },
    { root: '/shops', name: '특수견' },
  ];

  const images = [
    'banner1.png',
    'banner2.png',
    'banner3.png',
  ];

  const { isLoading, sendGetRequest } = useHttpRequest();
  const [reviewContent, setReviewContent] = useState({});

  const handleCategoryClick = (index) => {
    console.log(index)
    // setSelectedTab(index);
  };

  useEffect(() => {
    const getMemberReviewsHandler = data => {
      setReviewContent(data.data.result.content)
      console.log(data.data.result)
    };
    sendGetRequest(`/reviews/all/view`, getMemberReviewsHandler);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <div>
            <ImageSlider images={images} />
          </div>
          {/* <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '20px', mt: '32px' }}>
            바로예약
          </Typography>
          <Grid container spacing={2} fontWeight="800" sx={{ fontSize: '16px', m: '10px 0', width: '100%' }}>
            {categories.map((category, index) => (
              <Grid
                item key={category.name}
                component={Link} to={category.root}
                xs={4}
                sx={{ paddingRight: '16px', textDecoration: 'none', color: 'inherit' }}
                onClick={() => handleCategoryClick(index)}
              >
                <div>
                  <img alt={category.name} src="./selectIcon.png" />
                  <Typography fontWeight="800" >{category.name}</Typography>
                </div>
              </Grid>
            ))}
          </Grid> */}
          <br /><br />
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0 ' }}>
            <Typography fontWeight="800" sx={{ fontSize: '20px' }}>
              후기
            </Typography>
            <Link to="/review" style={{ textDecoration: 'none' }}>
              <Typography sx={{ fontSize: '16px', color: '#ACB3BF' }}>
                더보기 {'>'}
              </Typography>
            </Link>
          </div>
          <Grid container>
            {Array.isArray(reviewContent) && reviewContent.length > 0 ? (
              reviewContent.map((item) => (
                <Grid item xs={4} key={item.reviewId} sx={{ maxWidth: '275px', maxHeight: '275px', overflow: 'hidden' }}>
                  {item.reviewImages?.length > 0 ? (
                    item.reviewImages?.map((image, index) => {
                      const imageData = `data:image/jpeg;base64,${image}`;
                      return (
                        <Box className="pet-box"
                          onClick={() => alert('클릭')}
                        >
                          <img src={imageData} alt={`이미지 ${index + 1}`} style={{ width: '100%' }} />
                        </Box>
                      )
                    })
                  ) : (
                    <div style={{ display: 'grid', marginRight: '10px',marginBottom:'210px' }}>
                      <img alt="review1" src="./review1.png" />
                      <img alt="review1" src="./reviewtext.png" />
                    </div>
                  )
                  }
                </Grid>
              ))
            ) : (
              <Box m="150px 0" sx={{ backgroundColor: 'white' }}>
                <Information></Information>
                <Typography>아직 후기가 없어요.</Typography>
              </Box>
            )}
          </Grid>
          {/* <div style={{ display: 'grid', marginRight: '10px' }}>
              <img alt="review1" src="./review1.png" />
              <img alt="review1" src="./reviewtext.png" />
            </div>
            <div style={{ display: 'grid', marginRight: '10px' }}>
              <img alt="review1" src="./review2.png" />
              <img alt="review1" src="./reviewtext.png" />
            </div>
            <div style={{ display: 'grid', marginRight: '10px' }}>
              <img alt="review1" src="./review3.png" />
              <img alt="review1" src="./reviewtext.png" />
            </div>
          </ㅎ>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'grid', marginRight: '10px' }}>
              <img alt="review1" src="./review1.png" />
              <img alt="review1" src="./reviewtext.png" />
            </div>
            <div style={{ display: 'grid', marginRight: '10px' }}>
              <img alt="review1" src="./review2.png" />
              <img alt="review1" src="./reviewtext.png" />
            </div>
            <div style={{ display: 'grid', marginRight: '10px' }}>
              <img alt="review1" src="./review3.png" />
              <img alt="review1" src="./reviewtext.png" />
            </div>
          </div> */}
          <br /><Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <Typography fontWeight="800" sx={{ fontSize: '20px' }}>
              버블샵 ONLY
            </Typography>
            <Link to="#" style={{ textDecoration: 'none' }}>
              <Typography sx={{ fontSize: '16px', color: '#ACB3BF' }}>
                더보기 {'>'}
              </Typography>
            </Link>
          </div>
          <Box m="150px 0" sx={{ backgroundColor: 'white' }}>
            <Information></Information>
            <Typography>상품 준비중입니다.</Typography>
          </Box>
          <Footer />
        </>
      )
      }
    </>
  );
}