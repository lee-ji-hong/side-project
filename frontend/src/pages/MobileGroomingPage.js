import React, { useEffect } from 'react';
import ProductListComponent from '../components/ProductListComponent';
import useHttpRequest from '../hook/use-http';

const MobileGroomingPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  // const [itemInfo,setItemInfo] = useState([]);
  const itemInfo = [
    {
      product_id: 5,
      product_name: '기계컷(대형견)',
      product_discount: 10,
      price: 42300,
    },
    {
      product_id: 6,
      product_name: '기계컷(중형견)',
      product_discount: 12,
      price: 39300,
    },
    {
      product_id: 7,
      product_name: '기계컷(소형견)',
      product_discount: 15,
      price: 25000,
    },
    {
      product_id: 8,
      product_name: '기계컷(특수동물)',
      product_discount: 20,
      price: 17000,
    },
  ];

    // useEffect(() => {
  //   const getMemberInfoHandler = data => {
    // setItemInfo(data.data)
  //     console.log(data.data.availableTime);
  //   };
  //   sendGetRequest(`/send/available/day/1/2023-06-24`, getMemberInfoHandler);
  // }, []);

  return (
    <>
    {!isLoading && (<ProductListComponent itemInfo={itemInfo} />)}
    </>
  )
}

export default MobileGroomingPage;
