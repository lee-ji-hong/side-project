import React, { useEffect, useState } from 'react';
import useHttpRequest from '../hook/use-http';
import { useParams } from 'react-router-dom';
import { Box, Button, DialogContent, Grid, Typography } from '@mui/material'
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Modal from '../components/Modal';

export default function MyInqueryDetailPage() {
  const { isLoading, sendGetRequest,sendDelRequest } = useHttpRequest();
  const [inquiry, setInquiry] = useState({});
  const [open, setOpen] = useState(false);
  const { inquiryId } = useParams();
  dayjs.locale('ko');

  const submitDetailHandler = async () => {
    await sendDelRequest({
      endpoint: `/members/inquiry/${inquiryId}`,
    }, (response) => {
      console.log(response)
    })
  };

  useEffect(() => {
    const MemberinquiryHandler = data => {
      setInquiry(data.data.resultList.filter((inquiry) => inquiry.id === parseInt(inquiryId)));
      console.log(data.data.resultList.filter((inquiry) => inquiry.id === parseInt(inquiryId)));
    };
    sendGetRequest(`/members/inquiries`, MemberinquiryHandler);
  }, []);

  return (
    <>{!isLoading && (
      <Box m="40px 0">
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item type="text" xs={9}>
            <Typography fontWeight="800" sx={{ textAlign: 'left', fontSize: '16px', m: '20px 0' }}>문의
              <span style={{ color: '#FCC400', fontWeight: '400', marginLeft: '10px', fontSize: '14px', border: '1px solid #FCC400', borderRadius: '12px', padding: '4px' }}>{inquiry[0]?.status}</span>
            </Typography>
          </Grid>
          <Grid item type="text" xs={3} textAlign='right'>
            <span style={{ color: '#ACB3BF', fontWeight: '400', marginLeft: '10px' }}>{dayjs(inquiry[0]?.inquiryTime).format('YY/MM/DD (ddd)')}</span>
          </Grid>
          <DialogContent dividers >
            <Grid item xs={12} sx={{ m: '60px 0' }}>
              <Typography>
                {inquiry[0]?.inquiryContent}
              </Typography>
            </Grid>
          </DialogContent>
          <Grid item type="button" xs={12} textAlign="right">
            <Button onClick={() => setOpen(true)} sx={{ fontWeight: 'bold', fontSize: '14px', mt: '10px' }}>삭제 </Button>
          </Grid>
        </Grid>
      </Box>
    )}
      {open &&
        <Modal
          open={open}
          setOpen={setOpen}
          title={"문의 삭제"}
          content={"문의를 삭제하시겠습니까?"}
          submitDetailHandler={() =>submitDetailHandler }
          button={"삭제하기"}
        />}
    </>
  )
}

