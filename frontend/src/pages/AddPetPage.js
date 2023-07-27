import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Link, Grid, Container, Typography, CssBaseline } from '@mui/material';

import MemberForm from '../components/UI/MemberForm';
import CustomButton from '../components/UI/CustomButton';

const AddPetPage = () => {
  const [errors, setErrors] = useState({ petName: '', petBirthdate: '', breed: '', weight: '', size: '', infectiousDiseaseText: '', temperamentText: '', otherText: '' });
  const [inputs, setInputs] = useState({ petName: '', petBirthdate: '', breed: '', weight: '', size: '', infectiousDiseaseText: '', temperamentText: '', otherText: '' });
  const inputFields = [
    {
      id: 'petName',
      label: '반려동물 이름',
      autoComplete: 'petName',
      type: 'text',
    },
    {
      id: 'petBirthdate',
      label: '반려동물 생년월일(YYYYMMDD)',
      autoComplete: 'petBirthdate',
      type: 'number',
    },
    {
      id: 'breed',
      label: '반려동물 품종',
      autoComplete: 'breed',
      type: 'text',
    },
    {
      id: 'weight',
      label: '반려동물 몸무게(kg)',
      autoComplete: 'weight',
      type: 'number',
    },
    {
      id: 'size',
      label: '반려동물 크기',
      autoComplete: 'size',
      type: 'select',
    },
    {
      id: 'infectiousDiseaseText',
      label: '전염병 또는 질병 유무',
      autoComplete: 'infectiousDiseaseText',
      type: 'text',
    },
    {
      id: 'temperamentText',
      label: '성격(입질 또는 짖음이 심한 정도)',
      autoComplete: 'temperamentText',
      type: 'text',
    },
    {
      id: 'otherText',
      label: '기타(그 외 매장에 알리고 싶은 내용 자유롭게 기술)',
      autoComplete: 'otherText',
      type: 'text',
    },
  ];

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log(value)
    setInputs(prevInputs => ({ ...prevInputs, [id]: value }));
  };

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
        <div >
          <img alt="profile" src={`petProfile2.png`} style={{ width: '100px' }} />
        </div>
        <MemberForm
          errors={errors}
          setErrors={setErrors}
          inputs={inputs}
          setInputs={setInputs}
          inputFields={inputFields}
          handleInputChange={handleInputChange}
        />
        <CustomButton
          label="반려동물 등록"
          inputs={inputs}
          errors={errors}
          setErrors={setErrors}
          disabled={
            errors.petName === '' &&
              errors.petBirthdate === '' &&
              errors.breed === '' &&
              errors.weight === '' &&
              errors.size === '' &&
              errors.infectiousDiseaseText === '' &&
              errors.temperamentText === '' &&
              errors.otherText === '' &&
              inputs.petName !== '' &&
              inputs.petBirthdate !== '' &&
              inputs.breed !== '' &&
              inputs.weight !== '' &&
              inputs.size !== '' &&
              inputs.infectiousDiseaseText !== '' &&
              inputs.temperamentText !== '' &&
              inputs.otherText !== '' ? false : true}
        />
        <Grid container>
          <Grid item>
            <Link href="/signin" variant="body2">
              {"로그인 페이지로 이동하시겠어요?"}
            </Link>
          </Grid>
        </Grid>
        <br /><br />
      </Box>
    </Container>
  )
}

export default AddPetPage;

