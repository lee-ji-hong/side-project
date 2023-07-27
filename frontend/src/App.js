import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Layout from './layout/Layout';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import MainPage from './pages/Mainpage';
import Mypage from './pages/Mypage';
import ShopsPage from './pages/ShopsPage';
import SelfGroomingPage from './pages/SelfGroomingPage';
import MobileGroomingPage from './pages/MobileGroomingPage';
import DogHotelPage from './pages/DogHotelPage';
import DogDyeingPage from './pages/DogDyeingPage';
import { RecoilRoot } from 'recoil';
import ProductStorePage from './pages/ProductStorePage';
import CartPage from './pages/CartPage';
import ReservationPage from './pages/ReservationPage';
import PaymentPage from './pages/PaymentPage';
import ReviewPage from './pages/ReviewPage';
import ProfileEditPage from './pages/ProfileEditPage';
import InquiryPage from './pages/InquiryPage';
import MyInquiryPage from './pages/MyInquiryPage';
import MyInqueryDetailPage from './pages/MyInqueryDetailPage';
import ReservationInfoPage from './pages/ReservationInfoPage';
import ReservationInfoDetailPage from './pages/ReservationInfoDetailPage';
import MyReviewPage from './pages/MyReviewPage';
import PetResevationPage from './pages/PetResevationPage';
import PetInfoPage from './pages/PetInfoPage';
import AddPetPage from './pages/AddPetPage';
function App() {
  const theme = createTheme({
    typography: {
      fontFamily:"'Noto Sans KR', sans-serif"
    },
    palette: {
      primary: {
        // light: '#FFF9E6',
        light: '#f4de96',
        main: '#FCC400',
        dark: '#FCC400',
        contrastText: 'white',
      },
      secondary: {
        light: '#A48FFA',
        main: '#FCC400',
        dark: '#A48FFA',
        contrastText: '#000',
      },
    },
  });

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <div className="App" >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="mypage" element={<Mypage />} />
              <Route path="store" element={<ProductStorePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="payment/:reservationId" element={<PaymentPage />} />
              <Route path="reservation" element={<ReservationPage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="inquiry" element={<InquiryPage />} />
              <Route path="myinquiry" element={<MyInquiryPage />} />
              <Route path="myinquiry/detail/:inquiryId" element={<MyInqueryDetailPage />} />
              <Route path="profile" element={<ProfileEditPage />} />
              <Route path="myreview" element={<MyReviewPage />} />
              <Route path="pet-select" element={<PetResevationPage />} />
              <Route path="pet-info" element={<PetInfoPage />} />
              <Route path="registration" element={<AddPetPage />} />
              <Route path="reservationInfo" element={<ReservationInfoPage />} />
              <Route path="reservationInfo/:reservationId" element={<ReservationInfoDetailPage />} />
              <Route path="shops" element={<ShopsPage />}>
                <Route path="self-grooming" element={<SelfGroomingPage />} />
                <Route path="mobile-grooming" element={<MobileGroomingPage />} />
                <Route path="pet-hotel" element={<DogHotelPage />} />
                <Route path="pet-dyeing" element={<DogDyeingPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </RecoilRoot >
  );
}

export default App;
