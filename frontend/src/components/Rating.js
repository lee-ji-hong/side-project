import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: '별로에요',
  1: '별로에요',
  1.5: '그냥 그래요',
  2: '그냥 그래요',
  2.5: '보통이에요',
  3: '보통이에요',
  3.5: '맘에 들어요',
  4: '맘에 들어요',
  4.5: '아주 좋아요',
  5: '아주 좋아요',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({value,setValue}) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        // width: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'column',
        margin:'30px'
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        sx={{ fontSize: '48px' }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2,mt:2,color:'#ACB3BF' }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}