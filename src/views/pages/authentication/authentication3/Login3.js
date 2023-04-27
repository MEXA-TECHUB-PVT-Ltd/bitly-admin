import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Divider } from '@mui/material';
import Radium, { StyleRoot } from 'radium';
import { fadeIn } from 'react-animations';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from './GoogleIcon.png';

import mainLogo from './mainLogo.png'
import './styles';
import useStyles from './styles/styles';

const Login = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [MessageError, setMessageError] = useState('');
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

    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log(res.data.email);
                        const email = {
                            email: res.data.email
                        }
                        axios.post("https://staging-bitly-be.mtechub.com/auth/google_sign_in", email)
                            .then((response) => {
                                console.log(response);
                                if (response.data.result) {
                                    localStorage.setItem("id", response.data.result[0].id);
                                    localStorage.setItem("email", response.data.result[0].email);
                                    localStorage.setItem("username", response.data.result[0].username);
                                    localStorage.setItem("accountType", response.data.result[0].accounttype);
                                    window.location.reload();
                                    window.location.href = 'http://localhost:3000/';
                                    // navigate('/dashboard/default');
                                } else {
                                    setMessageError(response.data.message);
                                }
                            })

                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    const handleForm = () => {
        // e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setMessageError('');

        const user = {
            email: email,
            password: password,
        }
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email === '') {
            setEmailError("Email is Empty");
        } else if (password === '') {
            setPasswordError("Password is Empty");
        } else if (regex.test(email) === false) {
            setEmailError("Email is not valid");
        } else if (email !== '' && password !== '') {
            axios.post("https://staging-bitly-be.mtechub.com/auth/sign_in", user)
                .then((response) => {
                    console.log(response);
                    if (response.data.result) {
                        localStorage.setItem("id", response.data.result[0].id);
                        localStorage.setItem("email", response.data.result[0].email);
                        localStorage.setItem("username", response.data.result[0].username);
                        localStorage.setItem("accountType", response.data.result[0].accounttype);
                        window.location.reload();
                        window.location.href = 'http://localhost:3000/';
                        // navigate('/dashboard/default');
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
                <Grid marginTop={9} align='center' >
                    <Stack
                        sx={{
                            width: '90ch',
                            align: 'center',
                            mt: '50px'
                        }}

                        align='center'
                        spacing={0}
                        noValidate
                    >

                        <Grid align='center' spacing={0} >
                            <img alt='' style={avatarStyle} width='140px' height='105px' src={mainLogo} />
                        </Grid >
                        <Grid sx={{ mt: '15px' }} align='center' spacing={0} >
                            <br />
                            <text style={{
                                align: 'center', color: '#2348A2', fontWeight: '600',
                                fontSize: '35px'
                            }}>Sign in to Bitly</text>
                            <br />
                            <h6 style={{
                                fontWeight: '500', fontSize: '12px',
                                marginTop: '5px'
                            }}>Sign in to bitly to create multiple short links & generate QR-Codes</h6>
                        </Grid >
                        <Grid align='center'   >
                            <TextField
                                className={classes.inputField}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                style={{ marginTop: '30px', width: '400px' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: '#032C94' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                autoComplete='email'
                                placeholder='Email Address' required />
                            <TextField
                                style={{ width: '400px' }}
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
                        </Grid >
                    </Stack >

                    <Typography sx={{
                        fontSize: '12px', fontWeight: '500',
                        color: '#032C94', cursor: 'pointer', ml: "295px"
                    }}>
                        <text color='#032C94' fontWeight={500} onClick={() => { navigate("/forgetPassword") }} >
                            Forgot password ?
                        </text>
                    </Typography>
                    <br />
                    <span style={{ color: '#FF0000' }}>{emailError}</span>
                    <span style={{ color: '#FF0000' }}>{PasswordError}</span>
                    <span style={{ color: '#FF0000' }}>{MessageError}</span>
                    <br />
                    <Divider sx={{ mt: '20px', width: '300px', maxWidth: '300px', mr: '100px', ml: '100px' }} style={{ fontSize: '12px', color: '#404A5C', width: '400px' }}>
                        or Sign in with</Divider>
                    <Stack
                        sx={{
                            width: '90ch',
                            align: 'center',
                            mt: '20px'
                        }}

                        align='center'
                        spacing={0}
                        noValidate

                    >


                        <Grid align='center'   >
                            {/* <Button onClick={() => login()}>Sign in with Google  </Button> */}

                            {/* <GoogleOAuthProvider
                                clientId=
                                // "975222162480-va2qair8lran3rrpgl15gh8old6htr67.apps.googleusercontent.com"
                                "737843085178-vbahjtbn1g6gre3dllk4kqs5rd3mr4rc.apps.googleusercontent.com"
                            >

                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        responseSuccess(credentialResponse);
                                        setUser(codeResponse);
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />;
                            </GoogleOAuthProvider> */}


                            {/* <GoogleLogin

                                key="AIzaSyCuCvwneVPiUNneuXwbIffrmhRz9oe3JPs"
                                // clientSecret="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"
                                buttonText="Connect with Google"
                                className="flex-auto"
                                width="400px"
                                maxWidth="400px"
                                style={{ maxWidth: '400px', color: 'slateblue', width: '400px', marginTop: '100px' }}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy="single_host_origin"
                            /> */}


                            {/* <GoogleLogin
                                //  render={renderProps => (
                                //     <Button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                //     variant="outlined"  style={{ width: "420px" }}
                                //                 >  Connect with Google</Button>
                                //     )}
                                style={{
                                    textTransform: 'none', borderRadius: '10px',
                                    background: '#032C94', width: "400px", height: '45px'
                                }}
                                width='400px'
                                clientId="975222162480-va2qair8lran3rrpgl15gh8old6htr67.apps.googleusercontent.com"
                                buttonText="Connect with Google"
                                onSuccess={responseSuccess}
                                onFailure={responseFailure}
                            // cookiePolicy={'single_host_origin'}
                            /> */}

                            <Button onClick={() => { login() }}
                                style={{color:'ActiveBorder', width: "400px", borderColor: 'ActiveBorder' }}
                                variant="outlined" ><img alt='' width='30px' height='30px'  src={GoogleIcon} ></img> Connect with Google</Button>

                            <br />                                      <br />

                            <br />
                            <Button onClick={() => { handleForm() }}
                                type='submit' color='primary' variant="contained"
                                style={{
                                    textTransform: 'none', borderRadius: '10px',
                                    background: '#032C94', width: "400px", height: '45px'
                                }}
                            >Sign in</Button>
                            {/* <Typography sx={{ fontSize: '13px', mt: 2 }} >
                            Don't have an account?
                            <Link fontSize='15px' fontWeight={700}
                                style={{ textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer', color: '#032C94' }}
                                href="/signup"
                            >
                                Sign Up
                            </Link>
                        </Typography> */}
                        </Grid >

                    </Stack>
                </Grid>
            </div>
        </StyleRoot>

    )
}

export default Login


const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}