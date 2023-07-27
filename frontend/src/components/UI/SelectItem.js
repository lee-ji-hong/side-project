import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectItem = ({select, setSelect}) => {
  // const [select, setSelect] = useState('');

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <Box sx={{ textAlign: 'left', fontSize: '20px', m: '20px 0', maxWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="select"
            onChange={handleChange}
          >
            <MenuItem value={'전체'}>전체</MenuItem>
            <MenuItem value={'미용'}>미용</MenuItem>
            <MenuItem value={'염색'}>염색</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default SelectItem;
