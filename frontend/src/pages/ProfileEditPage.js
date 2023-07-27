import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Link, Grid, Container, Typography, CssBaseline, Button } from '@mui/material';

import useHttpRequest from '../hook/use-http';
import AuthContext from '../store/auth-context';
import MemberForm from '../components/UI/MemberForm';
import CustomButton from '../components/UI/CustomButton';
const ProfileEditPage = () => {

  const [errors, setErrors] = useState({ username: '', password: '', name: '', phoneNumber: '' });
  const [inputs, setInputs] = useState({ username: '', password: '', name: '', phoneNumber: '' });
  const { isLoading, sendGetRequest } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const inputFields = [
    {
      id: 'username',
      label: '아이디(이메일)',
      autoComplete: 'username',
      type: 'text',
    },
    {
      id: 'password',
      label: '비밀번호',
      autoComplete: 'current-password',
      type: 'password',
    },
    {
      id: 'name',
      label: '이름',
      autoComplete: 'name',
      type: 'text',
    },
    {
      id: 'phoneNumber',
      label: '전화번호',
      autoComplete: 'tel',
      type: 'tel',
    }
  ];

  const logoutHandler = () => {
    authCtx.logout();
    navigate(`/`);
  };


  useEffect(() => {
    const getMemberInfoHandler = data => {
      // setErrors({ ...errors, phoneNumber: '전화번호를 입력해주세요' });
      setInputs({
        username: data.data.result.user.name,
        password: data.data.result.password,
        name: data.data.result.user.name,
        phoneNumber: data.data.result.user.phoneNumber
      })

    };
    sendGetRequest(`/members/user/info`, getMemberInfoHandler);
  }, []);

  return (
    <>
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >


            <MemberForm
              errors={errors}
              setErrors={setErrors}
              inputs={inputs}
              setInputs={setInputs}
              inputFields={inputFields}
            />
            <Button>변경완료 버튼 </Button>
            {/* <CustomButton
              label="변경완료"
              inputs={inputs}
              errors={errors}
              setErrors={setErrors}
              disabled={errors.username === '' && errors.password === '' && errors.name === '' && errors.phoneNumber === '' && inputs.username !== '' && inputs.password !== '' && inputs.name !== '' && inputs.phoneNumber !== '' ? false : true}
            /> */}
            <Grid container>
              <Grid item type="button">
                <Button sx={{ fontWeight: 'bold', fontSize: '14px' }} onClick={logoutHandler}>
                  로그아웃
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
}

export default ProfileEditPage;