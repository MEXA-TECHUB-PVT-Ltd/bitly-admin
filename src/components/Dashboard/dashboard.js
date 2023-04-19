import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import QRCode from 'qrcode.react';
import Shortener from 'link-shortener';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
// Require the module
import {
  getBlobFromImageElement,
  copyBlobToClipboard,
} from 'copy-image-clipboard';
import Backdrop from "@mui/material/Backdrop";
import LogoutIcon from '@mui/icons-material/Logout';
import CardOverflow from '@mui/joy/CardOverflow';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import moment from "moment";
import groovyWalkAnimation from "./data.json";
import Lottie from "lottie-react";
import warning from "./warning.json";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Link from '@mui/material/Link';
import { FixedSizeList } from 'react-window';
import Fuse from "fuse.js";

import useStyles from '../../styles/styles';
import { useNavigate } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CopyToClipboard from "react-copy-to-clipboard";
import QuestionMarkTwoToneIcon from '@mui/icons-material/QuestionMarkTwoTone';
import './styles'
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import { Divider, Grid } from '@mui/material';
import myteam from '../../assets/logo/mainLogo.png'
import { SketchPicker } from 'react-color';

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


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.black, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.black, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));


const Dashboard = () => {
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);
  const [selctedID, SetSelctedID] = useState('');
  const [title, setTitle] = useState('');
  const [id, setID] = useState('');
  const [status, setStatus] = useState('');
  const [link, setLink] = useState('');
  const [Formlink, setFormLink] = useState('');
  const [shortenlink, setShortenLink] = useState('');
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState('');
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const handleOpenLogout = () => setOpenLogout(true);
  const handleCloseLogout = () => setOpenLogout(false);
  // const QR_codeURL = useQRCode('')
  const [profileData, setProfileData] = useState([]);
  // const [createLink, setCreateLink] = useState('');
  // const [createShortenlink, setCreateShortenLink] = useState('');

  const [createdAt, setCreatedAt] = useState('');
  const [color, setColor] = useState('#000000');
  const [createQRLinkError, setCreateQRLinkError] = useState('');
  const [createQRTitleError, setCreateQRTitleError] = useState('');
  const [searchData, setSearchData] = useState([]);

  const [linkData, setLinksData] = useState([]);
  const [ShowLink, setShowLink] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  const [openCreateQRCODE, setOpenCreateQRCODE] = React.useState(false);
  const handleOpenCreateQRCODE = () => setOpenCreateQRCODE(true);
  const handleCloseCreateQRCODE = () => setOpenCreateQRCODE(false);
  const navigate = useNavigate();
  const [openDleteConfirmation, setOpenDleteConfirmation] = React.useState(false);
  const handleOpenDleteConfirmation = () => setOpenDleteConfirmation(true);
  const handleCloseDleteConfirmation = () => setOpenDleteConfirmation(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [updateOpen, setUpdateOpn] = React.useState(false);
  const handleUpdateOpen = () => setUpdateOpn(true);
  const handleUpdateClose = () => setUpdateOpn(false);

  const [openColorPicker, setOpenColorPicker] = React.useState(false);
  const handleOpenColorPicker = () => setOpenColorPicker(true);
  const handleCloseColorPicker = () => setOpenColorPicker(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMoreIcon = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMoreIcon = () => {
    setAnchorEl(null);
  };


  const [profileEl, setProfileEl] = React.useState(null);
  const openProfileIcon = Boolean(profileEl);
  const handleProfileClick = (event) => {
    setProfileEl(event.currentTarget);
  };
  const handleCloseProfileIcon = () => {
    setProfileEl(null);
  };


  const [FilterEl, setFilterEl] = React.useState(null);
  const openFilterIcon = Boolean(FilterEl);
  const handleClickFilter = (event) => {
    setFilterEl(event.currentTarget);
  };
  const handleCloseFilterIcon = () => {
    setFilterEl(null);
  };
  const logout = () => {
    // window.location.reload(false);
    // window.location.reload();
    window.localStorage.clear();
    window.location.reload();
  }

  const handleLinkClick = () => {
    setShowLink(true);
  }


  const getHiddenLinksData = () => {
    const id = window.localStorage.getItem('id');
    setLinksData([]);
    axios.get("http://localhost:8082/links/view_hidden_links_user/" + id)
      .then((response) => {
        if (response.data.result) {
          console.log(response.data.result);
          setLinksData(response.data.result)
        } else {
          // window.alert("No Data!")
        }
      })
  }

  const copyImg = () => {
    const imageElement = document.getElementById('qrgen')
    getBlobFromImageElement(imageElement)
      .then((blob) => {
        return copyBlobToClipboard(blob)
      })
      .then(() => {
        handleCloseCreateQRCODE();
        setMessage('Success');
        setMessageData('QR Code Copied Successfully');
        handleOpen();
      })
      .catch((e) => {
        console.log('Error: ', e.message)
      })
  }


  const getProfile = () => {
    // window.location.reload();
    const id = window.localStorage.getItem('id');
    axios.get("http://localhost:8082/auth/specific_user/" + id)
      .then((response) => {
        if (response.data.result) {
          setProfileData(response.data.result[0])
        } else {
          // window.alert("No Data!")
        }
      })
  }

  const getData = () => {
    const id = window.localStorage.getItem('id');
    axios.get("http://localhost:8082/links/view_all_links_user/" + id)
      .then((response) => {
        if (response.data.result) {
          setLinksData(response.data.result)
        } else {
          // window.alert("No Data!")
        }
      })
  }

  const handleSearch = () => {
    const fuse = new Fuse(linkData, {
      // keys: ["title", "content"],
      keys: ["title", 'status', 'shortenlink'],
      includeScore: true
    });
    const results = fuse.search(!input ? " " : input);
    console.log(results);
    setLinksData([]);
    setSearchData(results);
  }



  const HandleDelete = () => {
    axios.delete("http://localhost:8082/links/delete_link/" + id)
      .then((response) => {
        if (response.data.result) {
          handleCloseDleteConfirmation();
          setShowLink(false);
          getData();
        } else {
          // window.alert("No Data!")
        }
      })
  }

  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrgen')
      .toDataURL()
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "qrgen.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
    handleCloseCreateQRCODE();
    setMessage('Success');
    setMessageData('PNG Downloaded Successfully');
    handleOpen();
  };


  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  useEffect(() => {
    getData();
    getProfile();
  }, []);

  const handleUpdatedForm = async () => {
    const data = {
      linkID: id,
      title: title,
      link: link,
      shortenLink: shortenlink,
      status: status
    }
    axios.put("http://localhost:8082/links/update_link", data)
      .then((response) => {
        if (response.data.result) {
          handleUpdateClose();
          getData();
          setMessage('success');
          setMessageData('Link updated successfully');
          handleOpen();
        } else {
          // window.alert("Try again")
        }
      })

  }
  // const handleForm = async () => {
  //   try {
  //     setLoading(true);
  //     console.log("LINK : " + link);
  //     const res = await axios(`https://api.shrtco.de/v2/shorten?url=${link}`);
  //     setShortenLink(res.data.result.full_short_link);
  //     console.log(res.data.result.full_short_link)
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  const handleColor = (id) => {
    SetSelctedID(id);
    setActive(true);
  };
  const handleForm = async () => {

    try {
      setCreateQRLinkError('');

      const data = {
        userID: window.localStorage.getItem('id'),
        title: title,
        link: link,
        // shortenLink: res.data.result.full_short_link,
        status: 'show'
      }
      if (Formlink === '') {
        setCreateQRLinkError("Please Enter Link Address");
      } else {
        setLoading(true);
        const res = await axios(`https://api.shrtco.de/v2/shorten?url=${link}${title}`);
        setShortenLink(res.data.result.full_short_link);

        axios.post("http://localhost:8082/links/add_link", data)
          .then((response) => {
            if (response.data.result) {
              setMessage("Success");
              setMessageData("Link Created Successfully!");
              handleOpen();
              handleCloseCreate();
              getData();
            } else {
              setMessage("Warning");
              setMessageData("Link is Not Valid");
              handleOpen();
              handleCloseCreate();
            }
          })
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }


  const HandleHide = async () => {
    const data = {
      linkID: id,
      title: title,
      link: link,
      shortenLink: shortenlink,
      status: 'hide'
    }
    axios.put("http://localhost:8082/links/update_link", data)
      .then((response) => {
        if (response.data.result) {
          handleUpdateClose();
          setShowLink(false);
          getData();
        } else {
          // window.alert("Try again")
        }
      })

  }



  const handleCreateQRCode = () => {
    const data = {
      userID: window.localStorage.getItem('id'),
      title: title,
      link: link,
      shortenLink: shortenlink,
      color: color,
      status: 'show'
    }
    console.log(data);
    axios.post("http://localhost:8082/qr_code/add_qr_code", data)
      .then((response) => {
        if (response.data.result) {
          // setMessage('Success');
          // setMessageData("QR-Code Crated Succssfully")
          // handleOpen();
        } else {
          setMessage('Success');
          setMessageData(response.data.message);
          handleOpen();

        }

      })
  }

  const HandleMore = (title, createdAt, link, shortenlink) => {
    navigate('/UpdateLink', {
      state: {
        title: title,
        createdAt: createdAt,
        link: link,
        shortenlink: shortenlink
      }
    });
  }

  return (
    <StyleRoot>
      <div className="test" style={styles.bounce}>


        {/* QR Code Create */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCreateQRCODE}
          onClose={handleCloseCreateQRCODE}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={openCreateQRCODE}>
            <Grid container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={2} style={{
                borderRadius: '10px', padding: 10,
                height: '400px', width: '530px', marginTop: "190px", marginLeft: '445px'
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
                    <CloseIcon style={{
                      cursor: "pointer"
                    }} onClick={handleCloseCreateQRCODE} />
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
                    Your QR-Code Created Successfully</Typography>
                </Grid>

                <div align='center' style={{ align: 'center', marginTop: '6%', color: 'black', padding: '6px' }}>
                  <QRCode
                    className='qrgen'
                    id='qrgen'
                    size={120}
                    fgColor={color}
                    style={{ height: "90%", width: "30%" }}
                    value={shortenlink}
                    viewBox={`0 0 120 20`}
                  />
                </div>
                <div align='center' style={{ marginTop: '6%' }}>
                  <Button onClick={() => { copyImg() }} color='primary'
                    variant="contained"
                    style={{ background: '#032C94', width: "28%" }}
                  >Copy QR CODE</Button>
                  <Button onClick={() => { downloadQRCode() }} color='primary'
                    variant="contained"
                    style={{ marginLeft: '9%', background: '#032C94', width: "28%" }}
                  >Download PNG</Button>
                </div>

              </Paper>
            </Grid>
          </Fade>
        </Modal>


        {/* create link */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCreate}
          onClose={handleCloseCreate}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={openCreate}>
            <Grid container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={2} style={{
                borderRadius: '10px', padding: 10,
                height: '400px', width: '530px', marginTop: "190px", marginLeft: '445px'
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
                    <CloseIcon style={{
                      cursor: "pointer"
                    }} onClick={handleCloseCreate} />
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
                    Create Link
                  </Typography>
                </Grid>

                <TextField
                  onChange={e => setTitle(e.target.value)}
                  style={{ textDecorationColor: '#FF0000', color: '#FF0000' }}

                  sx={{ color: '#FF0000', ml: '80px', mt: '80px', width: "380px" }}
                  label='Link Title (Optional)'
                  required />
                <TextField
                  onChange={e => {
                    setLink(e.target.value);
                    setFormLink(e.target.value)
                  }}
                  style={{ width: "380px" }}
                  sx={{ ml: '80px', mt: '25px' }}
                  label='Link '
                  required />
                <br />
                <br />
                <span style={{
                  marginTop: '15px', marginLeft: '150px',
                  color: '#FF0000'
                }}>{createQRLinkError}</span>
                <br />
                <Button
                  sx={{
                    background: '#032C94',
                    textTransform: 'none',
                    borderRadius: '10px',
                    width: "380px",
                    ml: '80px', mt: '40px',
                    height: '45px', fontSize: '16px'
                  }}
                  className={classes.formHeading}
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => { handleForm() }}
                >
                  Create Link
                </Button>
              </Paper>
            </Grid>
          </Fade>
        </Modal>

        {/* update */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={updateOpen}
          onClose={handleUpdateClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={updateOpen}>
            <Grid container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={8} style={{
                borderRadius: '15px', padding: 20,
                height: '500px', width: '510px', marginTop: "110px", marginLeft: '460px'
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
                    <CloseIcon style={{
                      cursor: "pointer"
                    }} onClick={handleUpdateClose} />
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

                    Update Link
                  </Typography>
                </Grid>
                <Typography fontSize='17' sx={{
                  color: '#022D94',
                  ml: '40px', mt: '35px'
                }}>
                  Title (Optional)
                </Typography>
                <TextField
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: "420px" }}
                  sx={{ ml: '40px', mt: 1 }}
                  placeholder={title}
                  required />
                <Typography fontSize='17' sx={{ color: '#022D94', ml: '40px', mt: '15px' }}>
                  Destination
                </Typography>
                <TextField
                  onChange={e => setLink(e.target.value)}
                  style={{ width: "420px" }}
                  sx={{ ml: '40px', mt: 1 }}
                  placeholder={link}
                  required />

                <br />
                <Typography fontSize='17' sx={{ color: '#022D94', ml: '40px', mt: '15px' }}>
                  Shorten Link
                </Typography>
                <TextField
                  onChange={e => setShortenLink(e.target.value)}
                  style={{ width: "420px" }}
                  sx={{ ml: '40px', mt: 1 }}
                  placeholder={shortenlink}
                  required />
                <br />
                <Button onClick={() => { handleUpdatedForm() }} color='primary'
                  variant="contained" align='center'
                  style={{ height: '45px', background: '#032C94', width: "420px" }}
                  sx={{ ml: '40px', mt: '35px' }}
                >Update</Button>
              </Paper>
            </Grid>
          </Fade>
        </Modal>
        {/* logout */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openLogout}
          onClose={handleCloseLogout}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={openLogout}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={2} style={{
                borderRadius: '20px', padding: 10,
                height: '380px', width: '530px', marginTop: "200px", marginLeft: '445px'

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
                    }} onClick={handleCloseLogout}><CloseIcon /></Avatar>
                  </Grid >
                </Box>
                <Grid sx={{ ml: '200px', mt: '45px' }} >
                  <Lottie
                    style={{ height: '120px', width: "120px" }}
                    animationData={warning} />
                </Grid>
                <Typography align='center' sx={{ mt: '15px' }} variant="h4" fontWeight={700}>
                  Confirmation</Typography>
                <Typography align='center' sx={{ mt: '5px' }} variant="h6" fontWeight={400}>
                  Do you really want to logout?</Typography>
                <Button onClick={() => { handleCloseLogout() }}
                  variant="outlined" align='center'
                  style={{
                    borderColor: '#032C94',
                    color: '#032C94', width: "180px", height: '40px',
                    borderRadius: '10px'
                  }} sx={{ ml: '50px', mt: '45px' }}
                > Cancel</Button>
                <Button onClick={() => {
                  logout();
                }} color='primary'
                  variant="contained" align='center'
                  style={{
                    background: '#032C94',
                    borderRadius: '10px', width: "180px", height: '40px'
                  }}
                  sx={{ ml: '45px', mt: '45px' }}> Logout</Button>
              </Paper>
            </Grid>
          </Fade>
        </Modal>

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
                    }} onClick={handleClose}><CloseIcon /></Avatar>
                  </Grid >
                </Box>
                <Grid sx={{ ml: '180px' }} >
                  <Lottie
                    style={{ height: '200px', width: "200px" }}
                    animationData={groovyWalkAnimation} />
                </Grid>
                <Typography align='center' sx={{}} variant="h5" fontWeight={700}>
                  {message}</Typography>
                <Typography align='center' sx={{ mt: '30px' }} variant="h6" fontWeight={400}>
                  {messageData}</Typography>
                <div align='center'
                  style={{ marginTop: '3%', align: 'center', width: "70%", height: '20%' }}
                >
                  <Button onClick={() => { handleClose() }} color='primary'
                    variant="contained" align='center'
                    style={{ marginLeft: '22%', borderRadius: '10px', background: '#032C94', width: "100%", height: '50%' }} sx={{ mt: '5%' }}
                  >Go Back</Button>
                </div >
              </Paper>
            </Grid>
          </Fade>
        </Modal>


        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openColorPicker}
          onClose={handleCloseColorPicker}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={openColorPicker}>
            <Grid position='absolute' alignItems='center' sx={{ ml: 40, mt: 10, align: 'center' }}  >
              <SketchPicker
                color={color}
                onChangeComplete={handleChangeComplete}
              />
            </Grid>
          </Fade>
        </Modal>



        {/* delete Link */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openDleteConfirmation}
          onClose={handleCloseDleteConfirmation}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={openDleteConfirmation}>
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={2} style={{
                // borderRadius: '20px', padding: 10, height: '350px', width: '550px', margin: "10% auto"
                borderRadius: '20px', padding: 10,
                height: '380px', width: '530px', marginTop: "200px", marginLeft: '445px'

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
                    }} onClick={handleCloseDleteConfirmation}><CloseIcon /></Avatar>
                  </Grid >
                </Box>
                <Grid sx={{ ml: '200px', mt: '45px' }} >
                  <Lottie
                    style={{ height: '120px', width: "120px" }}
                    animationData={warning} />
                </Grid>
                <Typography align='center' sx={{ mt: '15px' }} variant="h4" fontWeight={700}>
                  Confirmation</Typography>
                <Typography align='center' sx={{ mt: '5px' }} variant="h6" fontWeight={400}>
                  Do you really want to Delete this Link?</Typography>
                <Button onClick={() => { handleCloseDleteConfirmation() }}
                  variant="outlined" align='center'
                  style={{
                    borderColor: '#032C94',
                    color: '#032C94', width: "180px", height: '40px',
                    borderRadius: '10px'
                  }} sx={{ ml: '50px', mt: '45px' }}
                > Cancel</Button>
                <Button onClick={() => {
                  setMessage("Success");
                  setMessageData("Link Deleted Successfully!");
                  handleOpen();
                  HandleDelete();
                }} color='primary'
                  variant="contained" align='center'
                  style={{
                    background: '#032C94',
                    borderRadius: '10px', width: "180px", height: '40px'
                  }}
                  sx={{ ml: '45px', mt: '45px' }}
                > Delete</Button>
              </Paper>
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
              <SearchIcon sx={{ cursor: 'pointer' }} onClick={() => { handleSearch() }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e) => setInput(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <SearchIcon sx={{ width: '40px', cursor: 'pointer', mt: '28px', ml: '980px', color: '#032C94' }}

            onClick={() => { handleSearch() }} />
          <QuestionMarkTwoToneIcon onClick={() => { navigate('/Help') }}
            fontWeight={700} bold
            sx={{ width: '40px', cursor: 'pointer', mt: '28px',  color: '#032C94' }}
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
            sx={{
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



        <Box style={{
          display: 'flex',
        }} sx={{ mt: '36px' }} >
          <div>
            {/* buttions main screen */}

            <Grid
              align='center'
              sx={{
                borderRadius: '5px',
                ml: '595px', background: '#F3F3F3', width: '260px', height: '45px'
              }}
              style={{
                display: 'flex',
                align: 'center',
                justifyContent: 'center',

              }}
            >
              <Button
                sx={{
                  mr: '12px', mt: '5px'
                  , width: '95px',
                  height: '35px',
                  color: '#black', background: '#032C94',
                  fontSize: '13px',
                  textTransform: 'none'
                }}
                className={classes.formHeading}
                variant="contained"
                color="primary"
                onClick={() => { navigate('/dashboard') }}
              >
                <LinkIcon />
                Links
              </Button>
              <Button
                sx={{
                  width: '99px', mt: '5px', color: '#9B9B9B',
                  background: '#F3F3F3', height: '35px',
                  fontSize: '13px',
                  textTransform: 'none'
                }}
                className={classes.formHeading}


                onClick={() => { navigate('/QRCodeDashboard') }}
              >
                <QrCode2Icon />
                QR codes
              </Button>
            </Grid>

            <br /><br />
            {/* Filter & Create Link */}
            <Box
              style={{
                cursor: 'pointer',
                position: 'absolute',
                left: '1160px',
              }}
              display="flex"
              justifyContent="flex-end"
              alignItems='flex-end'
              background='black'
            >
              <Button
                sx={{
                  background: '#F3F3F3', width: '25px', height: '38px',
                  fontSize: '13px',
                  textTransform: 'none'
                }}
                className={classes.formHeading}
                variant="contained"
                color="primary"
                id="basic-Filter"
                aria-controls={openFilterIcon ? 'basic-Filter' : undefined}
                aria-haspopup="true"
                aria-expanded={openFilterIcon ? 'true' : undefined}
                onClick={handleClickFilter}
              >
                <  FilterAltOutlinedIcon sx={{ textTransform: 'none', color: 'black', }} />
              </Button>
              <Menu
                id="basic-Filter"
                anchorEl={FilterEl}
                open={openFilterIcon}
                onClose={handleCloseFilterIcon}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    borderRadius: '10px',
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 0.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => {
                    getData();
                    handleCloseFilterIcon();
                  }}>
                  <Typography level="body3" sx={{ color: '#black' }}>
                    Show Links
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    getHiddenLinksData();
                    handleCloseFilterIcon();
                  }}>
                  <Typography level="body3" sx={{ color: '#black' }}>
                    Hidden Links
                  </Typography>
                </MenuItem>
              </Menu>

              <Button
                sx={{
                  ml: 1, background: '#032C94', width: '110px',
                  height: '38px', fontSize: '13px',
                  textTransform: 'none'
                }}
                variant="contained"
                color='success'
                onClick={() => { handleOpenCreate(); setCreateQRLinkError(''); setFormLink(''); }}>
                Create Links
              </Button>
            </Box>

            <Grid style={{
              display: 'flex',
              align: 'left',
              justifyContent: 'left',

            }}
            >
              <div>
                <Typography sx={{ ml: '95px' }} variant="h5" fontWeight={500}>
                  Links
                </Typography>

                {linkData.length === 0 ?
                  searchData.length === 0 ?
                    <Typography
                      sx={{ marginTop: '200px', marginLeft: '600px' }}
                      variant="h3" fontWeight={200}>
                      No Link
                    </Typography>
                    :
                    searchData.map((data) => (
                      <List key={data.item.id}
                        sx={{
                          cursor: 'pointer',
                          maxHeight: '300px',
                          overflow: 'auto',
                          mt: '10px', width: '500px', ml: '95px', maxWidth: '660px',
                          bgcolor: 'background.paper'
                        }}>
                        <ListItem style={{
                          border: `1px solid #9B9B9B`, borderRadius: '5px',
                          borderColor: active && data.item.id === selctedID ? "#022D94" : "#9B9B9B"
                        }}
                          button
                          onClick={() => {
                            handleColor(data.item.id);
                            setID(data.item.id);
                            setTitle(data.item.title);
                            setCreatedAt(data.item.createdat);
                            setLink(data.item.link);
                            setShortenLink(data.item.shortenlink);
                            setStatus(data.item.status);
                            handleLinkClick();
                          }}
                          alignItems="flex-start">
                          <ListItemText
                            secondary={
                              <React.Fragment>
                                <Typography
                                  fontSize={19} fontWeight={500} bold
                                  sx={{ fontweight: '600', color: "#022D94", mt: '202px', display: 'inline' }}
                                >
                                  {data.item.title}
                                </Typography>
                                <br />
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {moment(data.item.createdat).format("MMMM Do, YYYY/hh:mm A")}
                                </Typography>
                                <br /><br />
                                <Typography
                                  fontSize='17'
                                  fontweight={500}
                                  sx={{ color: "#273144", mt: '202px', display: 'inline' }}
                                >
                                  Destination:
                                </Typography>
                                <br />
                                <Typography
                                  sx={{
                                    wordWrap: 'break-word',
                                    width: '650px',
                                    color: '#707070', mt: 2
                                  }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {` ` + data.item.link}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </List>
                    ))
                  :
                  linkData.map((data) => (
                    <List key={data.id}
                      sx={{
                        cursor: 'pointer',
                        maxHeight: '300px',
                        overflow: 'auto',
                        mt: '10px', width: '500px', ml: '95px', maxWidth: '660px',
                        bgcolor: 'background.paper'
                      }}>
                      <ListItem style={{
                        border: `1px solid #9B9B9B`, borderRadius: '5px',
                        borderColor: active && data.id === selctedID ? "#022D94" : "#9B9B9B"
                      }}
                        button
                        onClick={() => {
                          handleColor(data.id);
                          setID(data.id);
                          setTitle(data.title);
                          setCreatedAt(data.createdat);
                          setLink(data.link);
                          setShortenLink(data.shortenlink);
                          setStatus(data.status);
                          handleLinkClick();
                        }}
                        alignItems="flex-start">
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Typography
                                fontSize={19} fontWeight={500} bold
                                sx={{ fontweight: '600', color: "#022D94", mt: '202px', display: 'inline' }}
                              >
                                {data.title}
                              </Typography>
                              <br />
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {moment(data.createdat).format("MMMM Do, YYYY/hh:mm A")}
                              </Typography>
                              <br /><br />
                              <Typography
                                fontSize='17'
                                fontweight={500}
                                sx={{ color: "#273144", mt: '202px', display: 'inline' }}
                              >
                                Destination:
                              </Typography>
                              <br />
                              <Typography
                                sx={{
                                  wordWrap: 'break-word',
                                  width: '650px',
                                  color: '#707070', mt: 2
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {` ` + data.link}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  ))
                }
              </div>
              {ShowLink && (
                <div
                  style={{
                    marginLeft: '50px',
                    marginTop: '50px',
                    border: `1px solid #9B9B9B`, borderRadius: '5px',
                    width: '700px', height: '100%'
                  }} className="result">
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems='flex-start'
                    marginTop={1}
                  >
                    <CopyToClipboard
                      text={shortenlink}
                      onCopy={() => setCopied(true)}
                    >
                      <Button
                        sx={{
                          ml: 20, background: '#032C94', width: '90px', height: '40px',
                          fontSize: '13px',
                          textTransform: 'none'
                        }}
                        className={classes.formHeading}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setMessage("Success");
                          setMessageData("Link Copied Successfully")
                          handleOpen()
                        }}
                      >
                        < ContentCopyIcon /> Copy
                      </Button>
                    </CopyToClipboard>
                    <Typography
                      id="basic-button"
                      aria-controls={openMoreIcon ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMoreIcon ? 'true' : undefined}
                      onClick={handleClick}

                      elevation={0}
                      sx={{ color: '#032C94', mr: '30px', ml: '10px', mt: 1, cursor: 'pointer', width: '5px', height: '40px', fontSize: '16px' }}
                      className={classes.formHeading}
                      variant="contained"
                    >
                      < MoreVertIcon sx={{ color: '#032C94' }} />
                    </Typography>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMoreIcon}
                      onClose={handleCloseMoreIcon}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          borderRadius: '10px',
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 0,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

                    >
                      <MenuItem
                        sx={{ mt: '5px', height: '25px' }}
                        onClick={() => {
                          setMessage("Success");
                          setMessageData("Link Hide Successfully!");
                          getData();
                          HandleHide();
                          handleOpen();
                          handleCloseMoreIcon();
                        }}>
                        <Typography level="body3" sx={{}}>
                          <VisibilityOffIcon sx={{ color: '#032C94' }} />
                        </Typography>
                        <space />
                        <Typography level="body3" sx={{ ml: '15px', color: '#black' }}>
                          Hide Link
                        </Typography>
                      </MenuItem>
                      <Divider sx={{ ml: '20px', mr: '20px' }} />
                      <MenuItem
                        sx={{ mt: '5px', height: '25px' }}
                        onClick={() => {
                          handleCloseMoreIcon();
                          handleUpdateOpen();
                        }}>
                        <Typography level="body3" sx={{}}>
                          <BorderColorIcon sx={{ color: '#40C8EB' }} />
                        </Typography>

                        <Typography level="body3" sx={{ ml: '15px', color: '#black' }}>
                          Update Link
                        </Typography>
                      </MenuItem>
                      <Divider sx={{ ml: '20px', mr: '20px' }} />
                      <MenuItem sx={{ mt: '5px', height: '25px' }}
                        onClick={() => {
                          handleCloseMoreIcon();
                          handleOpenDleteConfirmation();
                        }}>
                        <Typography level="body3" sx={{}}>
                          <DeleteIcon sx={{ color: 'red' }} />
                        </Typography>

                        <Typography level="body3" sx={{ ml: '15px', color: '#black' }}>
                          Delete Link
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Typography fontSize={19} fontWeight={500} bold sx={{ color: '#273144', ml: '23px' }}>
                    {title}
                  </Typography>
                  <Typography fontSize={14} sx={{ ml: '23px' }}>
                    {moment(createdAt).format("MMMM Do, YYYY/hh:mm  A")}
                  </Typography>
                  <br />
                  <Link style={{ marginTop: '20px' }} sx={{
                    wordWrap: 'break-word',
                    width: '600px', color: '#022D94', ml: '35px', mt: '150px'
                  }} fontSize={18} fontWeight={600}>
                    {shortenlink}
                  </Link>
                  <br />
                  <Typography fontSize={17} fontWeight={400} sx={{ mt: '25px', color: '#273144', ml: '23px' }}>
                    Destination :
                  </Typography>
                  <Typography fontSize={14} sx={{
                    color: '#707070', wordWrap: 'break-word',
                    width: '650px', ml: '33px'
                  }}>
                    {link}
                  </Typography>
                  <Typography fontSize={17} fontWeight={400} sx={{ color: '#273144', ml: '23px' }}>
                    Qr Code :
                  </Typography>
                  <div container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    position='absolute' sx={{ align: 'center' }}  >
                    <QRCode
                      size={120}
                      style={{ marginTop: '30px', marginLeft: '250px', height: "150px", width: "190px", fgColor: 'red' }}
                      value={shortenlink}
                      fgColor={'#E4E4E4'}
                      viewBox={`0 0 20 20`}
                    />
                  </div>
                  <Button
                    sx={{
                      ml: '260px', mt: '18px', mb: '22px', background: '#032C94',
                      width: '160px', height: '40px', fontSize: '13px',
                      textTransform: 'none'
                    }}
                    className={classes.formHeading}
                    variant="contained"
                    color="primary"
                    onClick={() => { handleOpenCreateQRCODE(); handleCreateQRCode(); }}
                  >
                    Create QR Code
                  </Button>

                </div>
              )}
            </Grid>

          </div>

        </Box>


      </div>
    </StyleRoot >
  );
};

export default Dashboard;
const style = {
  alignItems: 'center',
};
const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}
