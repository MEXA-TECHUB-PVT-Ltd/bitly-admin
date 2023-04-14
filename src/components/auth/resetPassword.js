import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./data.json";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate, useLocation } from 'react-router-dom';
import mainLogo from '../../assets/logo/mainLogo.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Modal, Fade, Backdrop } from "@mui/material";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [confirmPasswordError, SetConfirmPasswordError] = useState('');
    const [passwordError, SetPasswordError] = useState('');
    const [MessageError, SetMessageError] = useState('');
    const [oldPasswordError, SetOldPasswordError] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ButtonText, setButton] = useState('');
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');

    const handlePassword = () => {
        if (passwordType === 'text') {
            setPasswordType('password');
        } else if (passwordType === 'password') {
            setPasswordType('text');

        }
    }


    const handleMessageButton = () => {
        if (ButtonText === 'Go to Sign in') {
            navigate('/dashboard');
        } else if (ButtonText === 'Try Again') {
            handleClose()
        }
    }

    const handleForm = () => {
        SetPasswordError('');
        SetConfirmPasswordError('');
        SetMessageError('');
        if(oldPassword === ''){
            SetOldPasswordError("Old Password is Empty");
        } else 
        if (password === '') {
            SetPasswordError("Password is Empty");
        } else if (confirmPassword === '') {
            SetConfirmPasswordError("Password is Empty");
        } else if (password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                const user = {
                    email: window.localStorage.getItem('email'),
                    password:oldPassword,
                    newPassword: password,
                }            
                axios.post("http://localhost:8082/auth/resetPassword", user)
                    .then((response) => {
                        if (response.data.result) {
                            setMessage("Success");
                            setMessageData("Password Reset Successfully");
                            setButton("Go to Dashboard");
                            handleOpen();
                        } else {
                            SetMessageError(response.data.message);
                        }
                    })
            } else {
                setMessage("Alert");
                setMessageData("Password & Confirm Password Must be Same");
                setButton("Try Again");
                handleOpen();
            }
        }
    }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (

        <StyleRoot>


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
                        container
                        position='absolute' style={{
                            height: '400px', width: '550px',
                            marginTop: "190px", marginLeft: '445px',
                        }}>
                        <Paper style={{
                            height: '400px', width: '550px',
                            borderRadius: '20px',
                        }}>
                            <Grid align='right'>
                                <CloseIcon sx={{ mt: '15px', mr: '15px', cursor: "pointer" }} onClick={() => { handleClose() }} />
                            </Grid >
                            <div align='center'>
                                <Lottie
                                    align="center"
                                    style={{ height: '100px', width: "150px" }}
                                    animationData={groovyWalkAnimation} />
                            </div >
                            <Typography align='center' sx={{ mt: '40px' }} variant="h5" fontWeight={700}>
                                {message}</Typography>
                            <Typography align='center' sx={{ mt: '30px' }} variant="h6" fontWeight={400}>
                                {messageData}</Typography>
                            <Button onClick={() => { handleMessageButton() }} color='primary'
                                variant="contained" align='center'
                                style={{ borderRadius: '8px', background: '#032C94', width: "380px", height: "45px" }}
                                sx={{ textTransform: 'none', ml: '80px', mt: '45px' }}
                            >{ButtonText}</Button>
                        </Paper>
                    </Grid>
                </Fade>
            </Modal>
            <div
            // className="test" style={styles.bounce}
            >

                <Grid marginTop={9} align='center' >
                    <Grid align='center' spacing={0} >
                        <img style={avatarStyle} width='140px' height='105px' src={mainLogo} />
                    </Grid >
                    <Grid align='center' spacing={0} >
                        <br />
                        <text style={{
                            align: 'center', color: '#2348A2', fontWeight: '600',
                            fontSize: '35px'
                        }}>Reset Password</text>
                        <br />
                        <h6 style={{
                            fontWeight: '500', fontSize: '12px',
                            marginTop: '5px'
                        }}>Enter New Password for Your Account!</h6>
                    </Grid >
                    <Stack
                        // component="form"
                        sx={{
                            width: '40ch',
                            align: 'center',
                            mt: 8
                        }}
                        align='center'
                        spacing={1}
                        noValidate
                    >
                        <TextField
                            style={{ size: 'small', width: "400px" }}
                            sx={{ width: "400px", size: 'small' }}
                            placeholder='Old Password'
                            type={passwordType}
                            autoComplete='password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#032C94' }} />
                                    </InputAdornment>
                                ), endAdornment: (
                                    <InputAdornment position="end">
                                        <VisibilityIcon onClick={() => { handlePassword() }} sx={{ cursor: "pointer", color: '#032C94' }} />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(event) => {
                                setOldPassword(event.target.value);
                            }}
                            required />
                        <span style={{ color: '#FF0000' }}>{passwordError}</span>

                        <TextField
                            style={{ size: 'small', width: "400px" }}
                            sx={{ width: "400px", size: 'small' }}
                            placeholder='New Password'
                            type={passwordType}
                            autoComplete='password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#032C94' }} />
                                    </InputAdornment>
                                ), endAdornment: (
                                    <InputAdornment position="end">
                                        <VisibilityIcon onClick={() => { handlePassword() }} sx={{ cursor: "pointer", color: '#032C94' }} />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            required />
                        <span style={{ color: '#FF0000' }}>{passwordError}</span>
                        <TextField
                            style={{ width: "400px" }}
                            sx={{ size: 'small' }}
                            placeholder='Confirm Password'
                            type={passwordType}
                            autoComplete='confirm password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#032C94' }} />
                                    </InputAdornment>
                                ), endAdornment: (
                                    <InputAdornment position="end">
                                        <VisibilityIcon onClick={() => { handlePassword() }} sx={{ cursor: "pointer", color: '#032C94' }} />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(event) => {
                                SetConfirmPassword(event.target.value);
                            }}
                            required />
                        <span style={{ color: '#FF0000' }}>{confirmPasswordError}</span>
                        <span style={{ color: '#FF0000' }}>{MessageError}</span>
                        <Button onClick={() => { handleForm() }} type='submit' color='primary' variant="contained"
                            style={{
                                textTransform: 'none',
                                marginTop: '80px', borderRadius: '10px',
                                background: '#032C94', width: "400px", height: '45px'
                            }}
                        >Reset Password</Button>
                    </Stack>
                </Grid>

            </div>
        </StyleRoot >
    )
}

export default ResetPassword

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}
