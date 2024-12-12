// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Core/HomePage';
import Login from './Core/Login';
import RegisterPage from './Core/RegisterPage';
import ForgotPassword from './Core/ForgotPassword';
import MoviePage from './components/MoviePage';
import ResetPasswordPage from './Core/ResetPasswordPage';
import MovieDetailPage from './components/MovieDetailPage';
import TrailerPage from './components/TrailerPage';
import Indrajala from './Core/Indrajala';
import { ThemeProvider } from 'styled-components';
import theme from './StyleSheets/theme';
import LandingPage from './Core/LandingPage';



import Profile from './Core/Profile';
import PayScreen from './Payments/SubscriptionPage';
import Checkout from './Payments/CheckOutInd';
import RazorPay from './Payments/OrdersRazorPay';
import Broke from './Payments/Broken';

import PayInd from './Payments/AppPayInd';
import PayNonInd from './Payments/AppPayNonIND';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/reset-password" exact element={<ResetPasswordPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        

          <Route path="/Subscribe" element={<PayScreen />} />
          <Route path="/checkout/:id" element={<Checkout />} /> 
          <Route path="/pay/:id" element={<RazorPay />} /> 
          <Route path="/Broke" element={<Broke />} /> 
          <Route path="/Profile" element={<Profile />} /> 
          



          <Route path="/Home" exact element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          
          
            <Route path="/Movie/" element={<MoviePage />} />    
          <Route path="/movie/:url" element={<MovieDetailPage />} />
          <Route path="/trailer/*" element={<TrailerPage />} /> 
          <Route path="/trailer/:movieId" element={<TrailerPage />} />


          <Route path="/DoPayIndian/:id" element={<PayInd/>} />    
          <Route path="/DoPayNonIndian/:id" element={<PayNonInd/>} />


    
          

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;