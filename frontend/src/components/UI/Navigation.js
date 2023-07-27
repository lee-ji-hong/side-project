import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import SwipeableEdgeDrawer from '../SwiperDrawer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedItemState, totalPriceState } from '../../store/products';
import SwiperNavigation from './SwiperNavigation';

export default function Navigation({ onClickHandler, open, setOpen, title, startTime, dayTime, setSnackbar, toggleDrawer }) {
  const totalPrice = useRecoilValue(totalPriceState);
  const selectedItems = useRecoilValue(selectedItemState)
  const productIds = selectedItems?.map(item => item.serviceId);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        display: selectedItems ? 'flex' : 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid #F4F4F4',
        height: '60px',
        backgroundColor: 'white',
        boxSizing: 'content-box',
        maxWidth: '900px',
        margin: '0 -24px'
      }}
    >
      <div style={{ boxSizing: 'content-box', width: '100%', left: 0, right: 0, }}>
        <Grid container spacing={2} fontWeight="800" sx={{ fontSize: '16px', m: '10px 0', width: '100%' }}>
          <Grid item xs={6} sx={{ paddingRight: '17px', display: 'flex', alignItems: 'center',paddingTop: '0 !important' }} >
            <Typography fontWeight="800" sx={{ color: '#ACB3BF', mr: '15px' }}>총 결제금액</Typography>
            <Typography fontWeight="800">{totalPrice?.toLocaleString()}원</Typography>
          </Grid>
          <Grid item xs={5.7} sx={{ paddingTop: '0 !important'}} >
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
            >{title}</Button>
          </Grid>
        </Grid>
        {open &&
          <SwipeableEdgeDrawer
            open={open}
            setOpen={setOpen}
            startTime={startTime}
            dayTime={dayTime}
            productIds={productIds}
            setSnackbar={setSnackbar}
          >
            <SwiperNavigation
              setSnackbar={setSnackbar}
              startTime={startTime}
              dayTime={dayTime}
              productIds={productIds}
              toggleDrawer={toggleDrawer}
            />
          </SwipeableEdgeDrawer>
        }
      </div>
    </Box >
  );
}