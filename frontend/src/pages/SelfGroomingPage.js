import React, { useEffect } from 'react';
import ProductListComponent from '../components/ProductListComponent';
import useHttpRequest from '../hook/use-http';

const SelfGroomingPage = () => {

  const { isLoading, sendGetRequest } = useHttpRequest();
  // const [itemInfo,setItemInfo] = useState([]);
  const itemInfo = [
    {
      product_id: 1,
      product_name: '셀프 목욕(대형견)',
      product_discount: 10,
      price: 42300,
    },
    {
      product_id: 2,
      product_name: '셀프 목욕(중형견)',
      product_discount: 12,
      price: 39300,
    },
    {
      product_id: 3,
      product_name: '셀프 목욕(소형견)',
      product_discount: 15,
      price: 25000,
    },
    {
      product_id: 4,
      product_name: '셀프 목욕(특수동물)',
      product_discount: 20,
      price: 17000,
    },
  ];

  // useEffect(() => {
  //   const getMemberInfoHandler = data => {
  //    setItemInfo(data.data)
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

export default SelfGroomingPage;
