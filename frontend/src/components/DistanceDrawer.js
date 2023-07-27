import { SwipeableDrawer, Typography, Grid, Skeleton, Box, Button, CssBaseline, Paper, Divider, TextField } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Global } from '@emotion/react';
import PropTypes from 'prop-types';

import { addressState, cartItemState, petState, pickupTimeState, selectedItemState } from '../store/products';
import { Puller, Root, StyledBox } from '../styles/GlobalStyle';
import useHttpRequest from '../hook/use-http';
import Post from './UI/Post';

const drawerBleeding = 56;

function DistanceDrawer({ window, modalOpen, setModalOpen }) {
  const [enroll_company, setEnroll_company] = useRecoilState(addressState);
  const selectedItem = useRecoilValue(selectedItemState);
  const selectedTime = useRecoilValue(pickupTimeState);
  const { isLoading, sendPostRequest } = useHttpRequest();
  const [address,setAddress] = useState('');
  const [popup, setPopup] = useState(false);
  const petId = useRecoilValue(petState);
  const totalPrice = selectedItem?.price || 0;
  const navigate = useNavigate();


  const handleInput = (e) => {
    setAddress(e.target.value)
  }

  const handleComplete = (data) => {
    setPopup(!popup);
  }

  //에러처리
  const errorMessage = responseData => {
    if (responseData.success === false) {
      return
    } else if (responseData.success === true) {
      setEnroll_company(responseData.data.result)
      return
    }
  }

  const toggleDrawer = (newOpen) => {
    setModalOpen(newOpen);
  };

  const fetchData = async () => {
    try {
      const response = await sendPostRequest({
        endpoint: '/members/pickup',
        bodyData: {
          "startLocation": address,
          "reservationHopeTime": selectedTime,
          "petId": petId,
        },
      }, (response) => {
        errorMessage(response);
      });
      
    } catch (error) {
      // 에러 처리
      console.error(error);
    }
  };

  useEffect(() => { setModalOpen(modalOpen); }, [modalOpen, setModalOpen]);

  useEffect(() => {
    if (address !== '' && popup === true) {
      toggleDrawer(false)
      fetchData()
    }
  }, [address]);

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(12% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      {!isLoading && (
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={modalOpen}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <TextField
              placeholder="출발지를 입력해주세요 "
              type="text"
              required={true}
              name="address"
              onClick={handleComplete}
              onChange={handleInput}
              value={address}
              sx={{ color: '#ACB3BF', border: 'none', border: 'none', width: '100%' }}
            />
          </StyledBox>
          <Divider width="100%" />
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: '100%',
              overflow: 'auto',
            }}
          >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
              <Typography sx={{ mr: '15px' }}>도착지 : 버블샵 </Typography>
            </div>
          </StyledBox>
          {popup && <Post company={address} setcompany={setAddress}></Post>} 
          {/* address,setAddress */}
        </SwipeableDrawer>
      )}

    </Root>
  );
}

DistanceDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default DistanceDrawer;
