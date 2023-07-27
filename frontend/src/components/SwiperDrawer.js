import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Global } from '@emotion/react';
import PropTypes from 'prop-types';

import { SwipeableDrawer, Typography, Grid, Skeleton, Box, Button, CssBaseline, Paper } from '@mui/material';
import { Puller, Root, StyledBox } from '../styles/GlobalStyle';
import { cartItemState, selectedItemState, sizeState, totalPriceState, weightState } from '../store/products';
import useHttpRequest from '../hook/use-http';

const drawerBleeding = 56;

function SwipeableEdgeDrawer({ children, window, open, setOpen, startTime, dayTime, productIds, setSnackbar }) {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemState);
  const totalPrice = useRecoilValue(totalPriceState);
  const { sendPostRequest } = useHttpRequest();
  const sizeId = useRecoilValue(sizeState);
  const weightId = useRecoilValue(weightState);
  const navigate = useNavigate();

  useEffect(() => { setOpen(open) }, [open, setOpen]);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={() => toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
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
          <Typography sx={{ p: 2, fontWeight: 'bold', fontSize: '20px' }}>선택</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            // backgroundColor: '#F4F4F4'
          }}
        >
          {selectedItems && (
            <>
            { children }
            </>
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default SwipeableEdgeDrawer;
