import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { SlHome } from "react-icons/sl";
import { SlHandbag } from "react-icons/sl";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useHttpRequest from '../hook/use-http';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

const Header = ({ initValue = 0 }) => {
  const category = ['버블샵', '로그인', '회원가입', '카테고리', '예약', '결제', '마이페이지', '내 정보 변경', '장바구니', '예약 내역', '스토어', '후기', '문의사항', '1:1 문의내역', 'MY후기', '반려동물 정보','반려동물 등록']
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [value, setValue] = useState(initValue);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  const headerContent = () => {
    if (window.location.pathname === '/') { return setValue(0); }
    else if (window.location.pathname === '/signin') { return setValue(1); }
    else if (window.location.pathname === '/signup') { return setValue(2); }
    else if (window.location.pathname === `/shops`) { return setValue(3); }
    else if (window.location.pathname === `/reservation`) { return setValue(4); }
    else if (window.location.pathname === `/payment`) { return setValue(5); }
    else if (window.location.pathname === `/mypage`) { return setValue(6); }
    else if (window.location.pathname === `/profile`) { return setValue(7); }
    else if (window.location.pathname === `/cart`) { return setValue(8); }
    else if (window.location.pathname === `/reservationInfo`) { return setValue(9); }
    else if (window.location.pathname === `/store`) { return setValue(10); }
    else if (window.location.pathname === `/review`) { return setValue(11); }
    else if (window.location.pathname === `/inquiry`) { return setValue(12); }
    else if (window.location.pathname === `/myinquiry`) { return setValue(13); }
    else if (window.location.pathname === `/myreview`) { return setValue(14); }
    else if (window.location.pathname === `/pet-info`) { return setValue(15); }
    else if (window.location.pathname === `/registration`) { return setValue(16); }
  }

  useEffect(() => {
    // console.log(window.location.pathname)
    headerContent()
  }, [headerContent]);

  useEffect(() => {
    const memberCart = data => {
      setCartItem(data.data.result)

    };
    sendGetRequest(`/members/reservations/cart/check`, memberCart);
  }, [setCartItem]);

  if (window.location.pathname === '/searchId') return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant="outLine" sx={{ boxShadow: 'none' }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: 'white',
            borderBottom: 'solid 1px #f4f4f4',
            '@media (min-width: 10px)': {
              minHeight: '56px',
              padding: "0"
            }
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeftIcon sx={{ display: window.location.pathname === '/' ? 'none' : '' }} />
          </IconButton>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
            {category[value] === '버블샵' ? <img alt="logo" src={`/logo22.png`} style={{ height: '52px' }} /> : category[value]}
          </Typography>
          <div>
            <IconButton onClick={() => navigate('/')} color="inherit" sx={{ display: window.location.pathname === '/' ? 'none' : '' }}>
              <SlHome size='1.5rem' color="black" />
            </IconButton>
            <IconButton onClick={() => navigate('/cart')} color="inherit">
              <Badge badgeContent={cartItem.length} color="secondary">
                <SlHandbag size='1.5rem' color="black" />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default Header;