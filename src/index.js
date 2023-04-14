import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/login';
import ProtectedRoutes from './protectedRoutes';
import ForgetPassword from './components/auth/forgetPassword';
import ResetPassword from './components/auth/resetPassword';
import Signup from './components/auth/signup';
import Dashboard from './components/Dashboard/dashboard';
import VerifyOTP from './components/auth/verifyOTP';
import Help from './components/Dashboard/help/help';
import { Navigate } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <Routes>
      <Route path='/' element={window.localStorage.getItem('id') !==null ? <Navigate to="/dashboard" /> : <App />} />
        <Route path='/login' element={window.localStorage.getItem('id') !==null ? <Navigate to="/dashboard" /> : <Login />} />

        <Route path="/signUp" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/Verify_OTP" element={<VerifyOTP />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route element={<ProtectedRoutes auth={window.localStorage.getItem('id')!==null}/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>

);
