import React, { useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
// import GoogleIcon from '@mui/icons-material/Google';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import mainLogo from '../../assets/logo/mainLogo.png'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Divider } from '@mui/material';
import GoogleIcon from '../../assets/logo/GoogleIcon.png';

const SignUp = () => {
    const navigate = useNavigate();
    const [userenameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [MessageError, setMessageError] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const handlePassword = () => {
        if (passwordType === 'text') {
            setPasswordType('password');
        } else if (passwordType === 'password') {
            setPasswordType('text');

        }
    }

    const handleForm = () => {
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setMessageError('');
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const user = {
            username: username,
            email: email,
            password: password,
            accountType: 'Free Account'
        }
        if (username === '') {
            setUsernameError("Username is Empty");

        } else if (email === '') {
            setEmailError("Email is Empty");
        } else if (password === '') {
            setPasswordError("Password is Empty");
        } else if (regex.test(email) === false) {
            setEmailError("Email is not valid");
        } else if (username !== '' && email !== '' && password !== '') {
            axios.post("https://staging-bitly-be.mtechub.com/auth/sign_up", user)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.result) {
                        localStorage.setItem("id", response.data.result[0].id);
                        localStorage.setItem("email", response.data.result[0].email);
                        localStorage.setItem("username", response.data.result[0].username);
                        localStorage.setItem("accountType", response.data.result[0].accounttype);
                        window.location.reload();
                        navigate('/');
                    } else {
                        setMessageError(response.data.message);
                    }
                })
        }
    }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <StyleRoot >
            <div className="test" style={styles.bounce}>

                <Grid marginTop={9} align='center' >
                    <Grid align='center' spacing={0} >
                        <img style={avatarStyle} width='140px' height='105px' src={mainLogo} />
                    </Grid >
                    <Grid align='center' spacing={0} >
                        <br />
                        <text style={{
                            align: 'center', color: '#2348A2', fontWeight: '600',
                            fontSize: '35px'
                        }}>Sign Up to Bitly</text>
                        <br />
                        <h6 style={{
                            fontWeight: '500', fontSize: '12px',
                            marginTop: '5px'
                        }}>Sign Up to bitly to crate multiple short links & generate QR-Codes</h6>
                    </Grid >
                    <Stack
                        // component="form"
                        sx={{
                            width: '40ch',
                            align: 'center'
                        }}
                        align='center'
                        spacing={1}
                        noValidate
                    >
                        <TextField
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            style={{ fontSize: '12px', width: '400px' }}
                            sx={{ width: '400px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#032C94' }} />
                                    </InputAdornment>
                                ),
                            }}
                            autoComplete='username'
                            placeholder='Username' required />
                        <span style={{ color: '#FF0000' }}>{userenameError}</span>
                        <TextField
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            sx={{ mt: '20px', width: '400px' }}
                            fontSize='12px'
                            style={{ fontSize: '12px', width: '400px' }}
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
                        <TextField
                            sx={{ mt: '20px', width: '400px' }}
                            style={{ fontSize: '12px' }}
                            placeholder='Password'
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
                        <span style={{ color: '#FF0000' }}>{MessageError}</span>
                        <Divider style={{marginTop:'12px', marginLeft:'55px', fontSize: '12px', color: '#404A5C',
                         width: '280px' }}>
                            or Sign up with</Divider>
                        <Button onClick={() => { handleForm() }}
                            style={{
                                background: 'white', color: '#273144',
                                width: "400px", marginTop: '35px', borderRadius: '5px',
                                textTransform: 'none'
                            }} variant='contained'>
                            <img src={GoogleIcon} style={{ width: '30px' }} />
                            Connect with Google</Button>
                        <br />
                        <Button onClick={() => { handleForm() }} 
                        type='submit' color='primary'
                            variant="contained" style={{
                                textTransform: 'none', marginTop: '25px',
                                borderRadius: '10px', background: '#032C94', width: "400px",
                                height: '45px'
                            }} >Sign Up</Button>
                        <Typography sx={{ fontSize: '13px', mt: 2 }} > Already have an account ?
                            <a fontSize='13px'
                                fontWeight={700} style={{
                                    textDecoration: 'none', fontWeight: 'bold',
                                    cursor: 'pointer', color: '#032C94'
                                }}
                                href="/login"
                            >
                                Sign In
                            </a>
                        </Typography>
                        </Stack>
                    </Grid>
            </div>

        </StyleRoot >

    )
}

export default SignUp

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}
