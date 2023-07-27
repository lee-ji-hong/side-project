import { styled } from '@mui/system';
import { Box, FormHelperText,Snackbar } from '@mui/material';
import { grey } from '@mui/material/colors';

export const MemberForm = styled(Box)`
  margin: 0 auto;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

export const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

export const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export const Snackbars = styled(Snackbar)`
top: 70px;
`