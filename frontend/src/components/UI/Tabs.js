import * as React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from './TabPanel';
import useHttpRequest from '../../hook/use-http';
import { reservationProductState } from '../../store/products';


export default function BasicTabs({ initValue = 0, tabsData }) {
  const [value, setValue] = useState(initValue);
  const [productData, setProductData] = useRecoilState(reservationProductState);
  const { sendPostRequest } = useHttpRequest();

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const fetchDataHandler = () => {
    //setProductData('테스트2')
    sendPostRequest({
      endpoint: "/users/login",
      bodyData: {
        "username": "01051691911",
        "password": "1234"
      }
    }, (response) => {
      setProductData('테스트')
      console.log(response);
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
    // fetchDataHandler()
  };

  // TabPanel 조건 추가
  const renderTabPanel = (tabData) => {
    return (
      <TabPanel key={tabData.index} value={value} index={tabData.index}>
        {tabData.panelContent}
      </TabPanel>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}
          sx={{
            '& .MuiTabs-scroller': {
              display: 'flex',
              justifyContent: 'center'
            },
          }}>
          {tabsData.map((tabData) => (
            <Tab
              key={tabData.index}
              label={tabData.label}
              index={tabData.index}
              component={Link}
              to={tabData.path}
              {...a11yProps(tabData.index)}
            />
          ))}
        </Tabs>
      </Box>
      {tabsData.map((tabData) => renderTabPanel(tabData))}
    </Box>
  );
}