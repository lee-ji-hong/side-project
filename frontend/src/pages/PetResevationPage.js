import React, { useState, useEffect, useContext } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import AuthContext from '../store/auth-context';
import useHttpRequest from '../hook/use-http';
import { petState } from '../store/products';


const PetResevationPage = () => {
  const { isLoading, sendGetRequest } = useHttpRequest();
  const [selectedPetId, setSelectedPetId] = useRecoilState(petState);
  const [petInfo, setPetInfo] = useState([]);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getPetInfoHandler = data => {
      setPetInfo(data.data.result);
    };
    if (!authCtx.isLoggedIn) {
      alert('로그인 먼저 진행해주세요')
      navigate(`/signin`);
      return
    }
    sendGetRequest(`/members/pet/check/page`, getPetInfoHandler);
  }, []);

  const handleItemClick = (petId) => {
    setSelectedPetId(petId);
  };

  const completeHandler = () => {
    if (selectedPetId == undefined) {
      return alert('펫을 선택해주세요.')
    }
    navigate('/shops')
  }

  return (
    <>
      {!isLoading && (
        <>
          <br /><br /><br />
          <Typography sx={{ fontSize: '18px', color: '#a3a3a3' }}>미용할 반려동물을 선택해주세요</Typography>
          <br />

          <Grid container m="5px">
            {petInfo?.map((pet) => (
              <Grid key={pet.petId} item xs={2.8} >
                <Box className="pet-box"
                  sx={{ border: selectedPetId === pet.petId ? '2px solid #FCC400' : '1px solid #ddd' }}
                  onClick={() => handleItemClick(pet.petId)}
                >
                  <img src={`/profile.png`} alt="프로필" style={{ width: '100%' }} />
                </Box>
                <center>
                  <Typography color="#FCC400">{pet.petName}</Typography>
                </center>
              </Grid>
            ))}
          </Grid>
          <br /><br></br>
          <div className="btn-wrap">
            <button
              className="btn-long btn-middle btn-bgwhite"
              id="editCompleteBtn"
              onClick={() => completeHandler()}
            >완료</button>
          </div>
        </>
      )}</>
  )
}

export default PetResevationPage;
