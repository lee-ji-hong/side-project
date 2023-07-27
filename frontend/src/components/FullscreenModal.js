import React, { useEffect, useState } from 'react';
import { Box, Slide, AppBar, Dialog, Button, Toolbar, Typography, IconButton, Divider, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useHttpRequest from '../hook/use-http';
import Rating from '../components/Rating';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, reservationId }) {
  const { isLoading, sendPostFileRequest } = useHttpRequest();
  const [value, setValue] = useState(0);
  const [reviewHead, setReviewHead] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //에러처리
  const errorMessage = responseData => {
    console.log(responseData)
    if (responseData.success === false) {
      return
    } else if (responseData.success === true) {
      handleClose()
      return
    }
  }

  const handleFileChange = (event) => {

    const { files, id: targetId } = event.target;
    console.log(files[0])
    setFile({ ...file, [targetId]: files[0] });
  };

  const handleSubmit = async () => {
    // 첨부파일 첨부
    const boundary = '----WebKitFormBoundary' + Math.random().toString(16).substr(2);
    const formData = new FormData();
    for (const key in file) {
      if (file.hasOwnProperty(key)) {
        const imageFile = file[key];
        formData.append("images", imageFile, `${key}.${imageFile.type.replace('image/', '')}`);
      }
    }
    // 텍스트 데이터 추가
    formData.append("review", JSON.stringify({
      "rating": value,
      "reviewText": reviewText,
      "reviewHead": reviewHead,
      "reservationId": reservationId
    }));
    await sendPostFileRequest({
      endpoint: `/members/review`,
      bodyData: formData
    }, (response) => {
      errorMessage(response);
    })
  };

  return (
    <>
      {!isLoading && (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open full-screen dialog
          </Button>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative', boxShadow: 'none', backgroundColor: '#ffe27e', color: 'black' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
                  리뷰 작성
                </Typography>
                <Button autoFocus color="inherit" onClick={() => handleSubmit()}>
                  작성완료
                </Button>
              </Toolbar>
            </AppBar>
            <Box>
              <Rating value={value} setValue={setValue} />
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <TextField
                  id="review-head"
                  label="리뷰 제목"
                  value={reviewHead}
                  onChange={(event) => setReviewHead(event.target.value)}
                  sx={{ width: '90%' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <TextField
                  id="outlined-multiline-static"
                  label="리뷰 내용"
                  multiline
                  rows={4}
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  sx={{ width: '90%' }}
                />
              </div>
              <input
                type="file"
                id="reviewAttachment"
                name="reviewAttachment"
                accept=".jpg, .jpeg, .png, .PNG, .pdf"
                onChange={handleFileChange}
              />
            </Box>
          </Dialog>
        </>
      )}
    </>
  );
}