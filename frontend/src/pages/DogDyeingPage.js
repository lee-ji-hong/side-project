import React, { useEffect }  from 'react';
import ProductListComponent from '../components/ProductListComponent';
import useHttpRequest from '../hook/use-http';
const DogDyeingPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  // const [itemInfo,setItemInfo] = useState([]);
  const itemInfo = [
    {
      product_id: 13,
      product_name: '디자인 얼굴컷(대형견)',
      product_discount: 10,
      price: 42300,
    },
    {
      product_id: 14,
      product_name: '디자인 얼굴컷(중형견)',
      product_discount: 12,
      price: 39300,
    },
    {
      product_id: 15,
      product_name: '디자인 얼굴컷(소형견)',
      product_discount: 15,
      price: 25000,
    },
    {
      product_id: 16,
      product_name: '디자인 얼굴컷(특수동물)',
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
    <ProductListComponent itemInfo={itemInfo} />
  )
}

export default DogDyeingPage;
