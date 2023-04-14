import React, { useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations';

import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/logo/mainLogo.png'
import EmailIcon from '@mui/icons-material/Email';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [MessageError, setMessageError] = useState('');
    const [email, setEmail] = useState('');

    const handleForm = () => {
        setEmailError('');
        setMessageError('');
        const user = {
            email: email,
        }
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email === '') {
            setEmailError("Email is Empty");
        } else if (regex.test(email) === false) {
            setEmailError("Email is not valid");
        } else if (email !== '') {
            navigate('/Verify_OTP', { state: { email: email } });
            axios.post("http://localhost:8082/auth/verifyEmail", user)
                .then((response) => {
                    console.log(response);
                    if (response.data.data) {
                        console.log(response.data.data)
                        navigate('/Verify_OTP', { state: { email: email } });
                    } else {
                        setMessageError(response.data.message);
                    }
                })
        }
    }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <StyleRoot>
            <div className="test" style={styles.bounce}>
                <Typography onClick={() => { navigate('/login') }}
                    sx={{ ml: "65px", mt: '50px', cursor: 'pointer' }}  >
                    <ArrowBackIosIcon sx={{width:'20px', height:'20px' }}width="20px" height="20px"
                    />
                </Typography>

                <Grid align='center' >
                    <Grid align='center' spacing={0} >
                        <img style={avatarStyle} width='140px' height='105px' src={mainLogo} />
                    </Grid >
                    <Grid align='center' spacing={0} >
                        <br />
                        <text style={{
                            align: 'center', color: '#2348A2', fontWeight: '600',
                            fontSize: '35px'
                        }}>Forget Password</text>
                        <br />
                        <h6 style={{
                            fontWeight: '500', fontSize: '12px',
                            marginTop: '5px'
                        }}>Enter Email Address to get Verification code on it!</h6>
                    </Grid >
                    <Stack
                        // component="form"
                        sx={{
                            width: '40ch',
                            align: 'center',
                            mt: 10
                        }}
                        align='center'
                        spacing={3}
                        noValidate
                    >
                        <TextField
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            borderRadius='15px'

                            style={{ width: '400px', borderRadius: '35px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#032C94' }} />
                                    </InputAdornment>
                                ),
                            }}
                            autoComplete='email'
                            placeholder='Email Address' required />
                        <span style={{ color: '#FF0000' }}>{emailError}</span>
                        <span style={{ color: '#FF0000' }}>{MessageError}</span>
                    </Stack>
                    <Button onClick={() => { handleForm() }} type='submit' color='primary'
                        variant="contained"
                        style={{
                            textTransform: 'none', borderRadius: '10px',
                            marginTop: '110px', background: '#032C94', width: "400px", height: '45px'
                        }}
                    >Send Code</Button>
                </Grid>
            </div >
        </StyleRoot >
    )
    // return (
    //     <Grid  >
    //         <Paper elevation={10} style={paperStyle}>
    //             <Grid align='center'>
    //                 <img style={avatarStyle} src={mainLogo} />
    //                 <h2 style={{ color: '#4061AE', fontSize: '20px' }}>Forget Password</h2>
    //                 <Typography  > Enter Email Address to get Verification code on it!
    //                 </Typography>
    //             </Grid >
    //             <TextField
    //                 onChange={(event) => {
    //                     setEmail(event.target.value);
    //                 }}
    //                 sx={{ mt: 15, ml: 25 }}
    //                 style={{ width: "490px" }}
    //                 InputProps={{
    //                     startAdornment: (
    //                         <InputAdornment position="start">
    //                             <EmailIcon color="primary" />
    //                         </InputAdornment>
    //                     ),
    //                 }}

    //                 placeholder='Email Address' fullWidth required />
    //             <Button onClick={() => { handleForm() }} type='submit' color='primary' variant="contained" sx={{ mt: 10, ml: 25 }}
    //                 style={{ width: "490px" }}
    //             >Send Code</Button>
    //         </Paper>
    //     </Grid>
    // )
}

export default ForgetPassword


const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}