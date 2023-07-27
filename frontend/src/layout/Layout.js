import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Userform from '../components/UI/UserForm';

const Layout = () => {
  return (
    <>
      <Userform>
        <Header />
        <Outlet />
      </Userform>
    </>
  );
}

export default Layout;