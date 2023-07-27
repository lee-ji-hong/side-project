import React from 'react';
import TabPanel from '../components/UI/Tabs';
import MainpageComponent from '../components/MainpageComponent';

const MainPage = () => {
  const tabsData = [
    { label: '홈', path: '/', index: 0, panelContent: (<MainpageComponent />) },
    { label: '예약', path: '/pet-select', index: 1 },
    { label: '용품샵', path: '/store', index: 2 },
    { label: '리뷰', path: '/review', index: 3 },
    { label: '마이', path: '/mypage', index: 4 },
  ];
  return (
    <TabPanel tabsData={tabsData} />
  )
}

export default MainPage;
