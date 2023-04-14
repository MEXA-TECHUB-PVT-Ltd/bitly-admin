import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Modal, Fade, Backdrop, Avatar } from "@mui/material";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./data.json";

import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import { useNavigate, useLocation } from 'react-router-dom';
import mainLogo from '../../assets/logo/mainLogo.png'
import { MuiOtpInput } from 'mui-one-time-password-input'

const VerificationCode = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ButtonText, setButton] = useState('');
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState('');
  const navigate = useNavigate();

  const [OTPError, setOTPError] = useState('');
  const location = useLocation();
  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  const handleMessageButton = () => {
    if (ButtonText === 'Reset Password') {
      navigate('/resetPassword', { state: { email: location.state.email } });
    } else if (ButtonText === 'Try Again') {
      handleClose()
    }
  }

  const handleForm = () => {
    setOTPError('');
    const user = {
      email: location.state.email,
      otp: otp,


    }
    if (otp === '') {
      setOTPError("OTP is Empty");
    } else {
      axios.post("https://staging-bitly-be.mtechub.com/auth/verifyOTP", user)
        .then((response) => {
          if (response.data.result) {
            setMessage("Success");
            setMessageData("Code Verified Successfully");
            setButton("Reset Password");
            handleOpen();

          } else {
            setMessage("Wrong OTP!");
            setMessageData("OTP Incorrect, Please Try Again");
            setButton("Try Again");
            handleOpen();
          }
        })
      console.log(user);
    }
  }
  const paperStyle = { borderRadius: '10px', padding: 20, height: '50vh', width: 480, margin: "40px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  return (

    <StyleRoot>
      <div className="test" style={styles.bounce}>

        {/* message */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={open}>
          <Grid
              container style={{
                height: '400px', width: '550px', 
                marginTop: "190px", marginLeft: '445px',
                borderRadius: '20px'}}
              position='absolute'   >
              <Paper  style={{
                height: '400px', width: '550px', 
                borderRadius: '20px',
              }}>
                <Grid align='right'>
                  <CloseIcon sx={{mt:'15px', mr:'15px', cursor: "pointer" }} onClick={() => { handleClose() }} />
                </Grid >
                <div align='center'>
                  <Lottie
                    align="center"
                    style={{ height: '100px', width: "150px" }}
                    animationData={groovyWalkAnimation} />
                </div >
                <Typography align='center' sx={{mt:'40px'}} variant="h5" fontWeight={700}>
                  {message}</Typography>
                <Typography align='center' sx={{ mt: '30px' }} variant="h6" fontWeight={400}>
                  {messageData}</Typography>
                <Button onClick={() => { handleMessageButton() }} color='primary'
                  variant="contained" align='center'
                  style={{borderRadius:'8px', background: '#032C94', width: "380px", height: "45px"}} 
                  sx={{ textTransform: 'none', ml: '80px', mt: '45px' }}
                >{ButtonText}</Button>
              </Paper>
            </Grid>
          </Fade>
        </Modal>


        <Grid marginTop={9} align='center' >
          <Grid align='center' spacing={0} >
            <img style={avatarStyle} width='140px' height='105px' src={mainLogo} />
          </Grid >
          <Grid align='center' spacing={0} >
            <br />
            <text style={{
              align: 'center', color: '#2348A2', fontWeight: '600',
              fontSize: '35px'
            }}>Verification</text>
            <br />
            <h6 style={{
              fontWeight: '500', fontSize: '12px',
              marginTop: '5px'
            }}>Enter OTP code you received on your Email Address</h6>
          </Grid >
          <span style={{ mt: 2, color: '#FF0000' }}>{OTPError}</span>
          <Grid sx={{ mt: 14 }} align='center' spacing='100'>
            <MuiOtpInput
              value={otp}
              input
              onChange={handleChange}
              // sx={{ ml: 2 }}
              style={{
                width: "300px",
                height: "20px",
                maxHeight:'20px',
                display: 'flex',
                gap: '30px',
                maxWidth: '650px',
                marginInline: 'auto'
              }}
            />
          </Grid>

          <Button onClick={() => { handleForm() }} type='submit' variant="contained"
            style={{
              textTransform: 'none', borderRadius: '10px',
              marginTop: '140px', background: '#032C94', width: "400px", height: '45px'
            }}
          >Verify</Button>
        </Grid>
      </div>
    </StyleRoot >)
}

export default VerificationCode
const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}