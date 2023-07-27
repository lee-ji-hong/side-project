import React, { useState, useEffect } from 'react';

import { Box, Link, Grid, Container, CssBaseline, Divider, Typography } from '@mui/material';

import MemberForm from '../UI/MemberForm';
import CustomButton from '../UI/CustomButton';
import useHttpRequest from '../../hook/use-http';

const SignIn = () => {
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const { isLoading, sendGetRequest } = useHttpRequest();

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
  ];

  // const naverLoginHandler = () => {
  //   window.location.href = 'http://210.180.118.201:8080/naver/login';
  // }

  const naverLoginHandler = () => {
    const memberInfo = data => {
      // setMember(data.data.result);
    };
    sendGetRequest(`/naver/login`, memberInfo);
  }

  return (

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
        <CustomButton
          endpoint="/users/login"
          label="로그인하기"
          inputs={inputs}
          errors={errors}
          setErrors={setErrors}
        // disabled={errors.username === '' && errors.password === '' && inputs.username !== '' && inputs.password !== '' ? false : true}
        />
        <center>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"회원 가입을 진행하시겠어요?"}
              </Link>
            </Grid>
          </Grid>
        </center>
        <br />
        {/* <Divider width="100%" /> */}
        <Grid container p="20px">
          {['google', 'kakaotalk', 'naver'].map((image) => (
            <Grid key={image} item xs={4} onClick={() => naverLoginHandler()}>
              <img alt={image} src={`./${image}.png`} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );

}

export default SignIn;