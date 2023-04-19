import React, { useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import CardOverflow from '@mui/joy/CardOverflow';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import QuestionMarkTwoToneIcon from '@mui/icons-material/QuestionMarkTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from "@mui/material/Backdrop";
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import LogoutIcon from '@mui/icons-material/Logout';
import DoneIcon from '@mui/icons-material/Done';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from '../../../styles/styles';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './styles'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Divider, Grid } from '@mui/material';
import myteam from '../../../assets/logo/mainLogo.png'
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';


const Search = styled('div')(({ theme }) => ({
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    width: '100px',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '100px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100px',
        [theme.breakpoints.up('sm')]: {
            width: '42ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));


const Dashboard = () => {
    const [open, setOpen] = React.useState(false);
    const [profileEl, setProfileEl] = React.useState(null);
    const openProfileIcon = Boolean(profileEl);
    const handleProfileClick = (event) => {
        setProfileEl(event.currentTarget);
    };
    const handleCloseProfileIcon = () => {
        setProfileEl(null);
    };

    const [PlanName, setName] = useState('');
    const [PlanPrice, setPrice] = useState('');
    const [PlanText, setText] = useState('');
    const [PlanFeature1, setFeature1] = useState('');
    const [PlanFeature2, setFeature2] = useState('');
    const [PlanFeature3, setFeature3] = useState('');
    const [PlanFeature4, setFeature4] = useState('');
    const [openLogout, setOpenLogout] = React.useState(false);
    const handleOpenLogout = () => setOpenLogout(true);
    const handleCloseLogout = () => setOpenLogout(false);

    const [shortenlink, setShortenLink] = useState('');

    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    const handleOpen = (name, price, text, feature1, feature2, feature3, feature4) => {
        setName(name);
        setPrice(price);
        setText(text);
        setFeature1(feature1);
        setFeature2(feature2);
        setFeature3(feature3);
        setFeature4(feature4);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    const plandata = [
        {
            name: 'Free',
            price: '0',
            text: 'This Plan is free of cost & a Trail Version',
            feature1: 'Lorem ipsum dolor sit amet',
            feature2: 'Lorem ipsum dolor sit amet',
            feature3: 'Lorem ipsum dolor sit amet',
            feature4: 'Lorem ipsum dolor sit amet',
        },
        {
            name: 'MONTHLY',
            price: '13',
            text: 'This Plan is for Month and will cost you 13 $',
            feature1: 'Lorem ipsum dolor sit amet',
            feature2: 'Lorem ipsum dolor sit amet',
            feature3: 'Lorem ipsum dolor sit amet',
            feature4: 'Lorem ipsum dolor sit amet',
        }, {
            name: '3 MONTHS',
            price: '313',
            text: 'This Plan is for 3 Month and will cost 313 $',
            feature1: 'Lorem ipsum dolor sit amet',
            feature2: 'Lorem ipsum dolor sit amet',
            feature3: 'Lorem ipsum dolor sit amet',
            feature4: 'Lorem ipsum dolor sit amet',
        }, {
            name: 'YEARLY',
            price: '500',
            text: 'This Plan is for Year and will cost you 500 $',
            feature1: 'Lorem ipsum dolor sit amet',
            feature2: 'Lorem ipsum dolor sit amet',
            feature3: 'Lorem ipsum dolor sit amet',
            feature4: 'Lorem ipsum dolor sit amet',
        }]




    const handleForm = async () => {
        try {
            setLoading(true);
            console.log("LINK : " + link);
            const res = await axios(`https://api.shrtco.de/v2/shorten?url=${link}`);
            setShortenLink(res.data.result.full_short_link);
            console.log(res.data.result.full_short_link)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <StyleRoot>
            <div className="test" style={styles.bounce}>
                {/* Add Plan  */}
                <Modal
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
                        <Grid container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justify="center" position='absolute'
                            style={{ margin: "5% auto" }}>

                            <Grid sx={{ ml: "13%", mb: '1%' }}>
                                <Paper
                                    elevation={0}
                                    style={{ background: '#F3F3F3', padding: 20, height: '70vh', width: '480px', margin: "40px auto" }}>
                                    <Typography sx={{ color: '#022D94', mt: "100px", ml: "120px" }}
                                        variant="h6" fontWeight={500}>
                                        Selected Plan: <text fontWeight={600} style={{ marginLeft: '10px', fontSize: '20px', color: '#273144' }}>{`   ${PlanName}`}</text>
                                    </Typography>
                                    <Typography sx={{ color: '#022D94', mt: "10px", ml: "120px" }}
                                        variant="h6" fontWeight={500}>
                                        Billed: <text fontWeight={600} style={{ marginLeft: '85px', fontSize: '20px', color: '#273144' }}>{`$ ${PlanPrice} USD`}</text>
                                    </Typography>
                                    <Typography sx={{ color: '#022D94', mt: "10px", ml: "120px" }}
                                        variant="h6" fontWeight={500}>
                                        Feature of Plan:
                                    </Typography>
                                    <Typography sx={{ mt: '10px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }} >{PlanFeature1}</text>
                                    </Typography>
                                    <Typography sx={{ mt: '2px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }} >{PlanFeature2}</text>
                                    </Typography>
                                    <Typography sx={{ mt: '2px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }}>{PlanFeature3}</text>
                                    </Typography>
                                    <Typography sx={{ mt: '2px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }}>{PlanFeature4}</text>
                                    </Typography>
                                    <Typography sx={{ mt: '2px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }}>{PlanFeature4}</text>
                                    </Typography>
                                    <Typography sx={{ mt: '2px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }}>{PlanFeature4}</text>
                                    </Typography>
                                    <Typography sx={{ mt: '2px', ml: "120px" }} variant="h6" fontWeight={300}>
                                        <DoneIcon sx={{ color: '#022D94', width: '20px', height: '20px' }} />
                                        <text fontWeight={300} style={{ marginLeft: '10px', fontSize: '15px' }}>{PlanFeature4}</text>
                                    </Typography>

                                </Paper>
                            </Grid>
                            <Grid sx={{ mr: "13%", mb: '1%' }} >
                                <Paper
                                    elevation={1}
                                    style={{ padding: 20, height: '70vh', width: '480px', margin: "40px auto" }}>
                                    <Grid align='right'>
                                        <Avatar><CloseIcon cursor="pointer" onClick={handleClose} /></Avatar>
                                    </Grid >
                                    <Typography sx={{ ml: '36px' }} variant="h6" fontWeight={600}>
                                        Payment Information</Typography>

                                    <TextField
                                        // onChange={(event) => {
                                        //     setEmail(event.target.value);
                                        // }}
                                        sx={{ mt: "33px", ml: "36px", borderRadius: '10px' }}
                                        style={{ width: "380px" }}
                                        placeholder='Card Number' required />


                                    <TextField
                                        // onChange={(event) => {
                                        //     setEmail(event.target.value);
                                        // }}
                                        sx={{ mt: "22px", ml: "36px", borderRadius: '10px' }}
                                        style={{ width: "380px" }}
                                        placeholder={`Card Holder's Name`} required />

                                    <TextField
                                        // onChange={(event) => {
                                        //     setEmail(event.target.value);
                                        // }}
                                        sx={{ mt: "22px", ml: "36px", borderRadius: '10px' }}
                                        style={{ width: "380px" }}
                                        placeholder='Expiry Date' required />

                                    <TextField
                                        // onChange={(event) => {
                                        //     setEmail(event.target.value);
                                        // }}
                                        sx={{ mt: "22px", ml: "36px", borderRadius: '10px' }}
                                        style={{ width: "380px" }}
                                        placeholder='CVV' required />
                                    <Button onClick={() => { handleForm() }} type='submit' color='primary'
                                        variant="contained" align='center'
                                        sx={{ background: '#032C94', width: "380px", height: '45px', mt: "55px", ml: "36px", borderRadius: '10px' }}
                                    >Pay Now</Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Fade>
                </Modal>


                <Box style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    minHeight: '85px'
                }}>
                    <img item
                        style={{
                            height: "70px", width: "100px",
                            alignSelf: 'left', marginLeft: '50px',
                            marginTop: '10px'
                        }} src={myteam} alt="My Team"
                    />

                    <Search
                        style={{
                            color: '#4B4B4B', background: '#F3F3F3',
                            marginLeft: '730px', marginTop: '20px', borderRadius: '8px', height: "40px", width: "400px", alignItems: 'right'
                        }}
                    >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search Here"
                            onChange={(e) => {
                                console.log(e.currentTarget.value);
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <QuestionMarkTwoToneIcon onClick={() => { navigate('/Help') }}
                        fontWeight={700} bold
                        sx={{ width: '40px', cursor: 'pointer', mt: '28px', ml: '1000px', color: '#032C94' }}
                    />
                    <Avatar
                        style={{ background: '#E9E9E9', cursor: 'pointer', marginLeft: 10, marginTop: '20px' }}
                        id="basic-Profile"
                        aria-controls={openProfileIcon ? 'basic-Profile' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openProfileIcon ? 'true' : undefined}
                        onClick={handleProfileClick}
                    ><AccountCircleIcon sx={{ color: '#4B4B4B' }}
                        /></Avatar>
                    <KeyboardArrowDownIcon onClick={handleProfileClick}
                        sx={{ width: '20px', cursor: 'pointer', mt: '30px' }}
                    />

                    <Menu borderRadius='25px'
                        id="basic-Profile"
                        style={{ borderRadius: '25px', width: '400px' }}
                        anchorEl={profileEl}
                        open={openProfileIcon}
                        onClose={handleCloseProfileIcon}
                        classes={{
                            borderRadius: '25px', width: '900px'
                        }}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                width: '250px',
                                borderRadius: '15px',
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Typography variant="outlined" sx={{
                            borderRadius: '15px', width: '300px',
                        }}>
                            <Typography sx={{ ml: '3%' }} >
                                <Typography>
                                    <Typography
                                        sx={{ mt: '12px', ml: '12px' }} >
                                        <a fontWeight={700}
                                            style={{ fontSize: '16px', fontWeight: 'bold', color: '#032C94' }}>
                                            {window.localStorage.getItem('username')}
                                        </a>
                                        <a style={{ marginLeft: '2px', fontSize: '13px' }}  >
                                            {`       (${window.localStorage.getItem('accountType')})`}
                                        </a>
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography level="body2" sx={{ mt: '2px', ml: '20px', mb: '20px' }} >
                                {window.localStorage.getItem('email')}
                            </Typography>
                            <Divider />
                            <CardOverflow
                                variant="soft"
                                sx={{
                                    display: 'flex',
                                    gap: 1.5,
                                    py: 1.5,
                                    px: 'var(--Card-padding)',
                                    bgcolor: '#FFFFFF',
                                }}
                                onClick={handleOpenLogout}
                            >
                                <Typography level="body3"
                                    borderRadius='15px' sx={{ borderRadius: '15px', ml: '30px', fontWeight: '600', color: '#black' }}>
                                    Logout
                                </Typography>
                                <Typography level="body3" sx={{ ml: '50%' }}>
                                    <LogoutIcon sx={{ color: '#032C94' }} />
                                </Typography>
                            </CardOverflow>
                        </Typography>
                    </Menu>


                    <Button
                        autoCapitalize='false'
                        sx={{
                            autoCapitalize: false,
                            textTransform: 'none',
                            borderRadius: '5px',
                            ml: '27px', mt: '21px',
                            width: '105px', background: '#032C94',
                            height: '40px', fontSize: '13px'
                        }}
                        variant="contained"
                        color="primary"
                        onClick={() => { navigate('/Upgrade') }}
                    >
                        Upgrade
                    </Button>

                </Box>
                <Divider sx={{ ml: '25px', width: '1390px', mr: '25px' }} />


                <Grid sx={{ ml: '40px', mr: '20px' }}>
                    <Typography onClick={() => { navigate('/dashboard') }}
                        sx={{ fontSize: '25px', ml: 3, mt: 3, cursor: 'pointer' }}  >
                        <ArrowBackIosIcon /> Upgrade
                    </Typography>

                    <Typography
                        sx={{ fontSize: '30px', color: '#032C94', ml: 3, mt: 3, }} fontSize='15' fontWeight={500} >
                        Unlock the Brilliant Experience
                    </Typography>
                    <text
                        style={{ fontSize: '10px', marginLeft: 30, cursor: 'pointer' }} color='black'  >
                        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsu
                    </text><br />
                    <text
                        style={{ fontSize: '10px', marginLeft: 30, cursor: 'pointer' }} color='black'  >
                        Lorem ipsum dolor sit amet  Lorem ipsum dolor sit ametLorem ipsum dolor sit amet
                    </text>



                    <Box style={{
                        display: 'flex',
                    }} sx={{ mt: 3 }} >


                        {plandata.map((data) => (
                            <div >
                                <Grid style={{
                                    display: 'flex',
                                    // align: 'center',
                                    // justifyContent: 'center',

                                }}
                                >
                                    <div style={{
                                        marginLeft: '20px',
                                        marginTop: '7px',
                                        border: `1px solid #9B9B9B`, borderRadius: '15px',
                                        width: '320px', height: '420px'
                                    }} className="result">
                                        <Typography variant="h6" color='#032C94'
                                            sx={{ mt: 1, ml: 15, width: '150px', height: '40px' }}
                                        >
                                            {data.name}
                                        </Typography>
                                        <Divider />
                                        <Typography variant="h5" color='black'
                                            sx={{ ml: 2, mt: 2, width: '150px', height: '40px' }} fontWeight={500}
                                        >
                                            {`${data.price} $`}
                                        </Typography>
                                        <text
                                            style={{fontSize: '14px', marginTop: 5, marginLeft: 20, cursor: 'pointer' }} color='black'  >
                                            {data.text}
                                        </text><br />
                                        <Typography sx={{fontSize: '12px', ml: 2, mt: 1 }}>
                                            <DoneIcon sx={{width:'20px', height:'20px'}} />{data.feature1}
                                        </Typography>
                                        <Typography sx={{fontSize: '12px',ml:2 ,mt:1 }}>
                                            <DoneIcon sx={{width:'20px', height:'20px'}}/>{data.feature2}
                                        </Typography>
                                        <Typography sx={{fontSize: '12px', ml: 2, mt: 1 }}>
                                            <DoneIcon sx={{width:'20px', height:'20px'}} />{data.feature3}
                                        </Typography>
                                        <Typography sx={{fontSize: '12px', ml: 2, mt: 1 }}>
                                            <DoneIcon sx={{width:'20px', height:'20px'}}/>{data.feature4}
                                        </Typography>
                                        <Button
                                            sx={{ ml: 8, mt: 5, background: '#032C94', width: '200px', height: '40px', fontSize: '16px' }}
                                            className={classes.formHeading}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                handleOpen(data.name, data.price, data.text, data.feature1, data.feature2, data.feature3, data.feature4)
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                </Grid>
                            </div>

                        ))}
                    </Box>
                </Grid>
            </div>
        </StyleRoot >
    );
};

export default Dashboard;

const styles = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}
