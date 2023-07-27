import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useHttpRequest from '../hook/use-http';

const options = [
  '삭제',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ reviewId, setSnackbar }) {
  const { sendDelRequest } = useHttpRequest();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateHandler = async (option) => {
    setSnackbar({ children: '삭제가 완료되었습니다.', severity: 'success' });
    await sendDelRequest({
      endpoint: `/members/review/${reviewId}`,
    }, (response) => {
      if (response.success === true) {
        setSnackbar({ children: '삭제가 완료되었습니다.', severity: 'success' });
      } else {
        setSnackbar({ children: '실패했습니다. 다시 시도해주세요!', severity: 'error' });
      }
    })
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => { updateHandler(option) }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}