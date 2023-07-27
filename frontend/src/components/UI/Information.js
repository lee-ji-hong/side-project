import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Information({ children, title }) {
  return (
    <>
      {children ? children
        : <img alt="정보 없음" src="./alert.png" style={{ width: '64px' }} />
      }
    </>
  )
}