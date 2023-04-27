import React, { useRef, useEffect, useState } from 'react';
// material-ui
import axios from "axios";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import { BaseUrl } from "BaseURL";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from "lottie-react";
import data from "./data.json";
import warning from "./warning.json";

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Popper,
    Stack,
    Switch
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState('');
    const [messageError, setMessageError] = useState('');
    const [messageDataError, setMessageDataError] = useState('');
    const [openIncorrect, setOpenIncorrect] = React.useState(false);
    const handleOpenIncorrect = () => setOpenIncorrect(true);
    const handleCloseIncorrect = () => setOpenIncorrect(false);

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [openPasswordChange, setOpenPasswordChange] = React.useState(false);
    const handleOpenPasswordChange = () => setOpenPasswordChange(true);
    const handleClosePasswordChange = () => setOpenPasswordChange(false);
    const [passwordError, SetPasswordError] = useState('');
    const [oldPasswordError, SetOldPasswordError] = useState('');
    const [confirmPasswordError, SetConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState('');
    const [MessageError, SetMessageError] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const handlePasswordChangeForm = () => {
        SetPasswordError('');
        SetOldPasswordError('');
        SetConfirmPasswordError('');
        SetMessageError('');
        if (oldPassword === '') {
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
                        // email: "ihteshamm112@gmail.com",
                        password: oldPassword,
                        newPassword: password,
                    }
                    setLoading('please wait...');
                    axios.put(BaseUrl+"auth/resetPassword", user)
                        .then((response) => {
                            setLoading('');
                            if (response.data.message === "Password Changed Successfully") {
                                setMessage("Success");
                                setMessageData("Password Reset Successfully");
                                handleOpen1();
                                handleClosePasswordChange();
                            } else if (response.data.message === "Incorrect Password") {
                                setMessageError("Error");
                                setMessageDataError("Incorrect Password");
                                handleOpenIncorrect();
                            }
                        })
                } else {
                    setMessage("Alert");
                    setMessageData("Password & Confirm Password Must be Same");
                    handleOpen1();
                }
            }
    }

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        window.location.href = 'http://localhost:3000/';
        window.localStorage.clear();
    };

    const handlePassword = () => {
        if (passwordType === 'text') {
            setPasswordType('password');
        } else if (passwordType === 'password') {
            setPasswordType('text');
        };
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            {/* InCorrect Password */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openIncorrect}
                onClose={handleCloseIncorrect}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500
                    }
                }}
            >
                <Fade in={openIncorrect}>
                    <Grid
                        container
                        position='absolute'   >
                        <Paper elevation={2} style={{
                            height: '400px', width: '550px', marginTop: "190px", marginLeft: '445px',
                            borderRadius: '20px',
                            // padding: 10, height: '450px', width: '35%', margin: "10% auto"
                        }}>

                            <Box
                                align='right'
                                style={{
                                    marginTop: '7px',
                                    position: 'absolute',
                                    marginLeft: '490px'
                                }}
                            >
                                <Grid align='right'>
                                    <Avatar style={{
                                        cursor: "pointer"
                                    }} onClick={handleCloseIncorrect}><CloseIcon /></Avatar>
                                </Grid >
                            </Box>
                            <Grid sx={{ mt: '30px', ml: '200px' }} >
                                <Lottie
                                    style={{ height: '150px', width: "150px" }}
                                    animationData={warning} />
                            </Grid>
                            <Typography align='center' sx={{}} variant="h5" fontWeight={700}>
                                {messageError}</Typography>
                            <Typography align='center' sx={{ mt: '30px' }} variant="h6" fontWeight={400}>
                                {messageDataError}</Typography>
                            <div align='center'
                                style={{ marginTop: '3%', align: 'center', width: "70%", height: '20%' }}
                            >
                                <Button onClick={() => { handleCloseIncorrect() }} color='primary'
                                    variant="contained" align='center'
                                    style={{ marginLeft: '22%', borderRadius: '10px', background: '#032C94', width: "100%", height: '50%' }} sx={{ mt: '5%' }}
                                >Go Back</Button>
                            </div >
                        </Paper>
                    </Grid>
                </Fade>
            </Modal>

            {/* message */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open1}
                onClose={handleClose1}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500
                    }
                }}
            >
                <Fade in={open1}>
                    <Grid
                        container
                        position='absolute'   >
                        <Paper elevation={2} style={{
                            height: '400px', width: '550px', marginTop: "190px", marginLeft: '445px',
                            borderRadius: '20px',
                            // padding: 10, height: '450px', width: '35%', margin: "10% auto"
                        }}>

                            <Box
                                align='right'
                                style={{
                                    marginTop: '7px',
                                    position: 'absolute',
                                    marginLeft: '490px'
                                }}
                            >
                                <Grid align='right'>
                                    <Avatar style={{
                                        cursor: "pointer"
                                    }} onClick={handleClose1}><CloseIcon /></Avatar>
                                </Grid >
                            </Box>
                            <Grid sx={{ ml: '180px' }} >
                                <Lottie
                                    style={{ height: '200px', width: "200px" }}
                                    animationData={data} />
                            </Grid>
                            <Typography align='center' sx={{}} variant="h5" fontWeight={700}>
                                {message}</Typography>
                            <Typography align='center' sx={{ mt: '30px' }} variant="h6" fontWeight={400}>
                                {messageData}</Typography>
                            <div align='center'
                                style={{ marginTop: '3%', align: 'center', width: "70%", height: '20%' }}
                            >
                                <Button onClick={() => { handleClose1() }} color='primary'
                                    variant="contained" align='center'
                                    style={{ marginLeft: '22%', borderRadius: '10px', background: '#032C94', width: "100%", height: '50%' }} sx={{ mt: '5%' }}
                                >Go Back</Button>
                            </div >
                        </Paper>
                    </Grid>
                </Fade>
            </Modal>


            {/* Password Change */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openPasswordChange}
                onClose={handleClosePasswordChange}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500
                    }
                }}
            >
                <Fade in={openPasswordChange}>
                    <Grid container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justify="center" position='absolute' sx={{ align: 'center' }}
                        style={{
                            height: '450px', width: '510px', marginTop: "140px", marginLeft: '460px'
                        }}>
                        <Paper elevation={8} style={{
                            borderRadius: '15px', padding: 20,
                            height: '450px', width: '510px'
                        }}>
                            <Box
                                align='right'
                                style={{
                                    marginTop: '7px',
                                    position: 'absolute',
                                    marginLeft: '450px'
                                }}
                            >
                                <Grid align='right'>
                                    <CloseIcon style={{
                                        cursor: "pointer"
                                    }} onClick={handleClosePasswordChange} />
                                </Grid >
                            </Box>
                            <Grid style={{
                                display: 'flex',
                            }}
                            >
                                <Typography sx={{
                                    mt: '10px', ml: '10px',
                                    cursor: 'pointer',
                                }} variant="h5" fontWeight={600}>

                                    Change Password
                                </Typography>
                            </Grid>

                            <TextField
                                onChange={e => setOldPassword(e.target.value)}
                                style={{ width: "420px" }}
                                type={passwordType}
                                sx={{ ml: '40px', mt: "65px" }}
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
                                placeholder="Old Password"
                                required />
                            <br />
                            <span style={{ marginTop: "5px", marginLeft: '130px', color: '#FF0000' }}>{oldPasswordError}</span>
                            <br />
                            <TextField
                                onChange={e => setPassword(e.target.value)}
                                style={{ width: "420px" }}
                                type={passwordType}
                                sx={{ ml: '40px' }}
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
                                placeholder='New Password'
                                required />
                            <br />
                            <span style={{ marginTop: "5px", marginLeft: '130px', color: '#FF0000' }}>{passwordError}</span>
                            <br />
                            <TextField
                                onChange={e => SetConfirmPassword(e.target.value)}
                                style={{ width: "420px" }}
                                type={passwordType}
                                sx={{ ml: '40px' }}
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
                                placeholder="confirm Password"
                                required />
                            <br />
                            <span style={{ marginTop: "5px", marginLeft: '130px', color: '#FF0000' }}>{confirmPasswordError}</span>
                            <span style={{ marginTop: "5px", marginLeft: '130px', color: '#FF0000' }}>{loading}</span>
                            <br />
                            <Button onClick={() => { handlePasswordChangeForm() }} color='primary'
                                variant="contained" align='center'
                                style={{ borderRadius: '15px',height: '45px', background: '#032C94', width: "420px" }}
                                sx={{ ml: '40px', mt: '40px' }}
                            >Change Password</Button>
                        </Paper>
                    </Grid>
                </Fade>
            </Modal>



            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.secondary.dark,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.secondary.dark,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        // src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                    />
                }
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography variant="h4">{localStorage.getItem('username')}</Typography>
                                                <Typography variant="subtitle2">(Admin)</Typography>
                                            </Stack>
                                            <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                {localStorage.getItem('email')}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                        <Box sx={{ p: 2 }}>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 0}
                                                    onClick={() => handleOpenPasswordChange()}
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Change Password</Typography>} />
                                                </ListItemButton>
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
