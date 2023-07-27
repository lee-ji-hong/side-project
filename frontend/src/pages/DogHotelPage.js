import React, { useEffect } from 'react';
import ProductListComponent from '../components/ProductListComponent';
import useHttpRequest from '../hook/use-http';
const DogHotelPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  // const [itemInfo,setItemInfo] = useState([]);
  const itemInfo = [
    {
      product_id: 9,
      product_name: '기본 얼굴컷(대형견)',
      product_discount: 10,
      price: 42300,
    },
    {
      product_id: 10,
      product_name: '기본 얼굴컷(중형견)',
      product_discount: 12,
      price: 39300,
    },
    {
      product_id: 11,
      product_name: '기본 얼굴컷(소형견)',
      product_discount: 15,
      price: 25000,
    },
    {
      product_id: 12,
      product_name: '기본 얼굴컷(특수동물)',
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

export default DogHotelPage;
