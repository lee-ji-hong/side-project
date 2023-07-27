import * as React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import { Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import useHttpRequest from '../hook/use-http';
import AuthContext from '../store/auth-context';
import { selectedItemState, totalPriceState } from '../store/products';

export default function ProductListComponent({ product }) {
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const { isLoading } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const products = product.basicFees;
  const navigate = useNavigate();
  
  const handleToggle = (item, value) => () => {
    const newSelectedItems = [...selectedItem];
    // let discountPrice = item.price - (item.price * item.productDiscount)
    const itemIndex = newSelectedItems.findIndex(
      (selectedItem) => selectedItem.serviceId === item.serviceId
    );
    if (itemIndex === -1) {
      newSelectedItems.push(item);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
    } else {
      newSelectedItems.splice(itemIndex, 1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
    }

    setSelectedItem(newSelectedItems);
  };

  const detail = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const secondary = (item) => {
    // let discountPrice = item.price - (item.price * item.productDiscount)
    return (
      <>
        <div style={detail}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
            {item.serviceType}
          </Typography>
          <Typography sx={{ fontSize: '14px', textAlign: 'right' }}>
            {item.price}원
          </Typography>
        </div>
      </>
    )
  }

  return (
    <>
      {!isLoading && products?.length > 0 && (
        <List>
          {products?.map((item, index) => {
            return (
              <ListItem
                key={item.serviceId}
                disablePadding
              >
                <ListItemButton onClick={handleToggle(item, index)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItem.some((selected) => selected.serviceId === item.serviceId)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText>{secondary(item)}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}

