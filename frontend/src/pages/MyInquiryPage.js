import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttpRequest from '../hook/use-http';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import Information from '../components/UI/Information';
const MyInquiryPage = () => {
  const [inquiry, setInquiry] = useState([]);
  const { isLoading, sendGetRequest } = useHttpRequest();
  const navigate = useNavigate();
  dayjs.locale('ko');

  const inquiryInfo = [
    {
      id: 1,
      category: '이용문의',
      status: '문의둥록',
      title: '이거 예약 어케함?',
      date: '2023.07.03',
      time: '17:18:00'
    },
    {
      id: 2,
      category: '이용문의',
      status: '문의둥록',
      title: '문의드려요',
      date: '2023.07.03',
      time: '17:18:00'
    },
    {
      id: 3,
      category: '이용문의',
      status: '문의둥록',
      title: '삼빠',
      date: '2023.07.03',
      time: '17:18:00'
    },
  ]

  const handleToggle = (item, value) => () => {
    navigate(`/myinquiry/detail/${item.id}`)
  };

  const onClickHandler = () => {
    console.log('z클릭')
  }


  useEffect(() => {
    const MemberinquiryHandler = data => {
      setInquiry(data.data.resultList)
      console.log(data.data.resultList);
    };
    sendGetRequest(`/members/inquiries`, MemberinquiryHandler);
  }, []);

  const detail = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const secondary = (item) => {
    return (
      <>
        <div style={detail}>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', mr: '4px', color: '#ACB3BF' }}>
              {item.inquiryHead}
            </Typography>
          </div>
          <Typography sx={{ fontSize: '10px', backgroundColor: '#ACB3BF', borderRadius: '12px', color: 'white', p: '4px' }}>
            {item.status}
          </Typography>
        </div>
        <div style={detail}>
          <Typography sx={{ color: 'grey', fontSize: '14px', mt: 1 }}>
            작성일 {dayjs(item.inquiryTime).format('YY/MM/DD (ddd)')} 
          </Typography>
        </div>

      </>
    )
  }

  return (
    <>
      {!isLoading && (
        <Box m="40px 0">
          <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>
            총 {inquiry?.length}건
          </Typography>
          <Divider width="100%" />
          {inquiry?.length > 0 ?
            (
              <List >
                {inquiry.map((item, index) => {
                  return (
                    <React.Fragment key={item.id}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleToggle(item, index)} dense>
                          <ListItemText>{secondary(item)}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                      <Divider width="100%" />
                    </React.Fragment>
                  );
                })}
                <Grid container spacing={2} fontWeight="800" sx={{ fontSize: '16px', m: '10px 0', width: '100%' }}>
                  <Grid item xs={12}>
                    <Button
                      // onClick={() => { setOpen(!open) }}
                      onClick={onClickHandler}
                      sx={{
                        width: '100%',
                        color: 'black',
                        backgroundColor: '#FCC400',
                        height: '52px',
                        fontWeight: '800',
                        '&:hover': {
                          backgroundColor: 'rgb(252 196 0 / 60%)'
                        }
                      }}
                    > 새 문의 작성
                    </Button>
                  </Grid>
                </Grid>
              </List>
            ) : (
              <>
                <Box m="150px 0">
                  <Information></Information>
                  <Typography>1:1문의 내역이 없습니다.</Typography>
                  <br /><br />
                  <Button onClick={() => { alert('준비중입니다') }} sx={{ border: '1px solid #FCC400' }}>
                    예약하러가기
                  </Button>
                </Box>
                <Divider width="100%" />
              </>
            )}
        </Box>
      )}
    </>
  )
}

export default MyInquiryPage;

