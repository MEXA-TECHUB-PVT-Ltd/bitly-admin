import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import CardOverflow from '@mui/joy/CardOverflow';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useStyles from '../../../styles/styles';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import QuestionMarkTwoToneIcon from '@mui/icons-material/QuestionMarkTwoTone';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import './styles'
import Menu from '@mui/material/Menu';
import Fuse from "fuse.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Divider } from '@mui/material';
import myteam from '../../../assets/logo/mainLogo.png'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
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
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Dashboard = () => {
  const [input, setInput] = useState("");
  const [openArticle, setOpenArticle] = useState('');
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const handleOpenLogout = () => setOpenLogout(true);
  const handleCloseLogout = () => setOpenLogout(false);

  const classes = useStyles();
  const navigate = useNavigate();
  const [profileEl, setProfileEl] = React.useState(null);
  const openProfileIcon = Boolean(profileEl);
  const handleProfileClick = (event) => {
    setProfileEl(event.currentTarget);
  };
  const handleCloseProfileIcon = () => {
    setProfileEl(null);
  };

  const moredata = (id) => {
    setOpen(!open);
    setOpenArticle(id);
  }

  const plandata = [
    {
      id: 1,
      title: 'For the provision of our offers, technica',
      content: 'By clicking on "Accept cookies", you consent both to the storage and retrieval of information on your device and to the subsequent processing of data for the presented processing purposes (Art)',
      moreContent: `For the provision of our offers, technica clicking on "Accept cookies", 
            you consent both to the storage and retrieval of information clicking on you consent both to the 
            storage and retrieval of information1`
    },
    {
      id: 2,
      title: 'Democratic Order of Planets and Democratic Order of Planets',
      content: 'By clicking on "Accept cookies", you consent both to the storage and retrieval of information on your device and to the subsequent processing of data for the presented processing purposes (Art',
      moreContent: `For the provision of our offers, technica clicking on "Accept cookies", 
            you consent both to the storage and retrieval of information clicking on you consent both to the 
            storage and retrieval of information1`
    },
    {
      id: 3,
      title: 'Planet Express for Planet Express Slurms MacKenzie',
      content: 'By clicking on "Accept cookies", you consent both to the storage and retrieval of information on your device and to the subsequent processing of data for the presented processing purposes (Art)',
      moreContent: `For the provision of our offers, technica clicking on "Accept cookies", 
            you consent both to the storage and retrieval of information clicking on you consent both to the 
            storage and retrieval of information1`
    },
    {
      id: 4,
      title: 'Professor Hubert J. Farnsworth from Company: Planet Express',
      content: 'By clicking on "Accept cookies", you consent both to the storage and retrieval of information on your device and to the subsequent processing of data for the presented processing purposes (Art)',
      moreContent: `For the provision of our offers, technica clicking on "Accept cookies", 
            you consent both to the storage and retrieval of information clicking on you consent both to the 
            storage and retrieval of information1`
    },
    {
      id: 5,
      title: 'For the provision of our offers, technica',
      content: 'By clicking on "Accept cookies", you consent both to the storage and retrieval of information on your device and to the subsequent processing of data for the presented processing purposes (Art)',
      moreContent: `For the provision of our offers, technica clicking on "Accept cookies", 
            you consent both to the storage and retrieval of information clicking on you consent both to the 
            storage and retrieval of information1`
    },

  ]

  const fuse = new Fuse(plandata, {
    // keys: ["title", "content"],
    keys: ["title"],
    includeScore: true
  });

  const results = fuse.search(!input ? " " : input);
  console.log(results);


  return (
    <StyleRoot>
      <div className="test" style={styles.bounce}>

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

          <QuestionMarkTwoToneIcon onClick={() => { navigate('/Help') }}
            fontWeight={700} bold
            sx={{ width: '40px', cursor: 'pointer', mt: '28px', ml: '998px', color: '#032C94' }}
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

        <Typography onClick={() => { navigate('/dashboard') }}
          sx={{ ml: '70px', mt: '10px', cursor: 'pointer' }} variant="h6" >
          <ArrowBackIosIcon sx={{ ml: '10px', mt: '10px', cursor: 'pointer' }} /> Help Center
        </Typography>

        <Typography position='absolute' align='center'
          style={{marginLeft: '600px', color: '#032C94',
           align: 'center', marginTop: '30px' }} 
           color='primary' fontWeight={600} fontSize='25px' >
          Hi! How can we help ?
        </Typography>

        <Search position='absolute' align='center'
          style={{ borderRadius: '10px', marginLeft: '600px',
           background: '#f3f3f3', align: 'center', marginLeft: '500px',
            marginTop: '90px', width: "450px" }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            onChange={(e) => setInput(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Divider sx={{ mt: '30px', ml: '195px', width: '1000px', mr: '55px' }} />

        <Typography position='absolute' align='center'
          style={{ marginLeft: '600px', align: 'center', marginTop: '35px' }} variant="h6" >
          Suggested Articles!
        </Typography>


        <Box style={{
          position:'absolute',
          display: 'flex',
        }} sx={{ mt: '80px' }} >

          <div>
            {results.map((data) => (
              <List key={data.id}
                sx={{ ml: 9, mr: 2, width: '1300px', bgcolor: 'background.paper' }}>
                <ListItem
                  width='20px'
                  sx={{ width: '1100px' }}>
                  <ListItemText 
                    primary={data.item.title}
                    secondary={
                      <div style={{
                      }} sx={{ mt: '80px' }}>
                        <React.Fragment style={{
                          cursor: 'pointer',
                          left: '0%',
                          padding: '12px',
                        }}>
                          <Typography
                            component="span"
                            width='100px'
                            variant="body2"
                            color="text.primary"
                          >
                          </Typography>
                          {data.item.content}

                          {(open && openArticle === data.item.id) && data.item.moreContent}
                        </React.Fragment>
                        <ArrowForwardIosIcon
                        sx={{ml:'1200px'}}
                          style={{
                            cursor: 'pointer',
                            // position: 'absolute',
                          //   right: '0%',
                          //   marginLeft:'200px',
                          //   padding: '12px',
                          //   transform: 'translate(0 %, -50 %)',
                          }}
                          onClick={() => { moredata(data.item.id) }}
                          variant='outlined'
                        />
                        <br/>
                      </div>

                    }
                  />
                </ListItem>
                <Divider />
              </List>
            ))}
          </div>
        </Box>
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
