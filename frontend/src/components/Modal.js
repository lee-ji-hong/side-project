import React, { useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

import useHttpRequest from '../hook/use-http';

const div = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: 500
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Modal({ open, setOpen,title,content,endpoint,button,submitDetailHandler }) {
  const { isLoading, sendDelRequest } = useHttpRequest();

  const handleClose = () => { setOpen(false); };

  const handleSubmit = () => {
    submitDetailHandler()
    handleClose()
  };

  return (
    <>
      {!isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {title}
            </BootstrapDialogTitle>
            <DialogContent dividers >
              <Box m="40px 0">
                <Typography>{content}</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleSubmit}>
                {button}
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Box>
      )}
    </>
  );
}