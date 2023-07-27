import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Userform({ children, title }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{backgroundColor:'white'}}>
        <Box sx={{ height: '100%', minHeight: '100vh', pt: 1 }} >
          {children}
        </Box>
      </Container>
    </>
  );
}