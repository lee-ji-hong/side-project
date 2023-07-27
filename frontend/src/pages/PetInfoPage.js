import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Card, Divider, Grid, Skeleton, Typography,Alert } from '@mui/material';
import useHttpRequest from '../hook/use-http';
import { Snackbars } from '../styles/GlobalStyle';
const PetInfoPage = () => {
  const { isLoading, sendGetRequest,sendDelRequest } = useHttpRequest();
  const [snackbar, setSnackbar] = useState(null);
  const [petInfo, setPetInfo] = useState([]);
  const navigate = useNavigate();
  
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const diffMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (years === 0) {
      return `${months}개월`;
    } else {
      return `${years}년 ${months}개월`;
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar(null)
  };

  const deleteHandler = async (petId) => {
    await sendDelRequest({
      endpoint: `/members/pet/delete/${petId}`,
    }, (response) => { 
      if(response.success === true){
        setSnackbar({ children: '삭제가 완료되었습니다.', severity: 'success' });
      }else{
        setSnackbar({ children: '실패했습니다. 다시 시도해주세요!', severity: 'error' });
      }
     })
  }

  const EditHandler = () => {
alert('수정번튼')
  }

  useEffect(() => {
    const getPetInfoHandler = data => {
      setPetInfo(data.data.result);
    };
    sendGetRequest(`/members/pet/all/view`, getPetInfoHandler);
  }, [snackbar]);

  return (
    <>
      {!isLoading ? (
        <>
          {petInfo?.map((pet) => (
            <Card key={pet.petId} height='235px' sx={{ boxShadow: '1px 2px 9px 3px rgb(205 205 205 / 27%)', mt: '15px' }} >
              <Box sx={{ margin: 2, display: 'flex', alignItems: 'flex-start' }}>
                <Box width="90%" textAlign="left">
                  <Typography fontWeight="bold" sx={{ fontSize: '18px' }}>{pet.petName}</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#ACB3BF' }}>{calculateAge(pet.petBirthdate)}</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#ACB3BF' }}>{pet.size} {pet.weight}</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#ACB3BF' }}>{pet.breed}</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#ACB3BF' }}>{pet.infectiousDiseaseText}</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#ACB3BF' }}>{pet.temperamentText}</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#ACB3BF' }}>{pet.otherText}</Typography>
                </Box>
                {/* <Skeleton variant="circular" >
                  <Avatar />
                </Skeleton> */}
                <img alt="profile" src={`petProfile2.png`} style={{ width: '52px' }} />
              </Box>
              <Divider width="100%" color="#f6f6f6" />
              <Grid container m="5px">
                <Grid item xs={6}>
                  <Button onClick={() => deleteHandler(pet.petId)}>삭제</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={() => EditHandler()}>수정</Button>
                </Grid>
              </Grid>
            </Card>
          ))}
          < Card height='235px' sx={{ boxShadow: '1px 2px 9px 3px rgb(205 205 205 / 27%)', mt: '15px' }} >
            <Box sx={{ margin: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                type="button"
                sx={{
                  fontSize: '14px',
                  color: '#ACB3BF',
                  backgroundColor: '#f4f4f4',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%'
                }}>
                {'+'}
              </Typography>
              <Typography type="button"  onClick={() => { navigate('/registration') }} sx={{ textAlign: 'left', width: '60%', fontSize: '14px', color: '#ACB3BF' }}>
                반려동물 추가하기
              </Typography>
            </Box>
          </Card>
        </>

      ) : (
        <Card height='235px' sx={{ boxShadow: '1px 2px 9px 3px rgb(205 205 205 / 27%)', mt: '15px' }} >
          <Box sx={{ margin: 2, display: 'flex', alignItems: 'center' }}>
            <Box width="90%">
              {[0, 1, 2, 3, 4].map((item => (
                <Skeleton width="10%" key={item}>
                  <Typography>.</Typography>
                </Skeleton>
              )))}
            </Box>
            <Skeleton variant="circular" >
              <Avatar />
            </Skeleton>
          </Box>
          <Divider width="100%" color="#f2f2f2" />
          <br />
          <br />
        </Card>
      )}
      <br />
      {snackbar && (
            <Snackbars
              open
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={handleCloseSnackbar}
              autoHideDuration={2000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbars>
          )}
    </>
  )
}

export default PetInfoPage;
