import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import AuthContext from '../../store/auth-context';
import useHttpRequest from '../../hook/use-http';

const CustomButton = ({ endpoint,label, inputs, disabled, errors, setErrors,callback }) => {
  const { sendPostRequest } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  //에러처리
  const errorMessage = responseData => {
    // console.log(responseData)
    if (responseData.success === false) {
      return setErrors({ ...errors, username: responseData.errorData.message });
    } else if (responseData.success === true) {
      navigate(`/signin`);
      setErrors({ ...errors, username: '' });
      return
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await sendPostRequest({
      endpoint: '/users/signup',
      bodyData: {
        username: inputs.username,
        password: inputs.password,
        name: inputs.name,
        phoneNumber: inputs.phoneNumber,
      },
    }, (response) => {
      errorMessage(response);
    })
  }

  const handlePetRegistration = async (event) => {
    event.preventDefault();
    await sendPostRequest({
      endpoint: '/members/pet/create',
      bodyData: {
        "petName": inputs.petName,
        "petBirthdate":  dayjs(inputs.petBirthdate).format('YYYY-MM-DD'),
        "breed": inputs.breed,
        "weight": parseFloat(inputs.weight),
        "size": inputs.size,
        "infectiousDiseaseText": inputs.infectiousDiseaseText,
        "temperamentText": inputs.temperamentText,
        "otherText": inputs.otherText,
      },
    }, (response) => {
      if (response.success === false) {
        return alert('등록에 실패했습니다! 다시 시도해주세요')
      } else if (response.success === true) {
        alert('반려동물 추가 완료하였습니다.')
        navigate(`/mypage`);
        return
      }
    })
  }

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    authCtx
      .login(endpoint,inputs.username, inputs.password)
      .then(data => {
        if (data.error) {
          throw new Error();
        } else if (data.success === false) {
          alert('인증정보가 올바르지 않습니다.');
          return;
        } else {
          if (callback) {
            callback();
          } else {
            navigate('/');
          }
          return;
        }
      })
      .catch(event => {
        alert('인증이 실패했거나 오류가 발생했습니다!');
      });
    return;
  };


  return (
    <Button
      data-testid="custom-button"
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={
        window.location.pathname === '/signin' ? handleSubmitLogin :
        window.location.pathname === '/registration' ? handlePetRegistration :
        handleSubmit}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
