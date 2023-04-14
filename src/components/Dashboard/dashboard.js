import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import QRCode from 'qrcode.react';
import CreateIcon from '@mui/icons-material/Create';
import Shortener from 'link-shortener';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
// Require the module
import './tableStyles.css';
import {
  getBlobFromImageElement,
  copyBlobToClipboard,
} from 'copy-image-clipboard';
import Backdrop from "@mui/material/Backdrop";
import LogoutIcon from '@mui/icons-material/Logout';
import CardOverflow from '@mui/joy/CardOverflow';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import moment from "moment";
import SettingsIcon from '@mui/icons-material/Settings';
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

import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import BlockIcon from '@mui/icons-material/Block';
import LockResetIcon from '@mui/icons-material/LockReset';
import GroupIcon from '@mui/icons-material/Group';
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


const Dashboard = () => {
  const [active, setActive] = useState(false);
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
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');

  const [createdAt, setCreatedAt] = useState('');
  const [color, setColor] = useState('#000000');
  const [createQRLinkError, setCreateQRLinkError] = useState('');
  const [createQRTitleError, setCreateQRTitleError] = useState('');

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

  const [openCreatePrivacy, setOpenCreatePrivacy] = React.useState(false);
  const handleOpenCreatePrivacy = () => setOpenCreatePrivacy(true);
  const handleCloseCreatePrivacy = () => setOpenCreatePrivacy(false);


  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openPasswordChange, setOpenPasswordChange] = React.useState(false);
  const handleOpenPasswordChange = () => setOpenPasswordChange(true);
  const handleClosePasswordChange = () => setOpenPasswordChange(false);


  const [updateOpen, setUpdateOpn] = React.useState(false);
  const handleUpdateOpen = () => setUpdateOpn(true);
  const handleUpdateClose = () => setUpdateOpn(false);

  const [manageUser, SetManageUser] = useState(true);
  const [PrivacyPolicy, SetPrivacyPolicy] = useState(false);
  const [TermAndCondition, SetTermAndCondition] = useState(false);

  const [passwordError, SetPasswordError] = useState('');
  const [oldPasswordError, SetOldPasswordError] = useState('');
  const [MessageError, SetMessageError] = useState('');
  const [confirmPasswordError, SetConfirmPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, SetConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [termContent, setTermContent] = useState('');
  const [termCreatedAt, setTermCreatedAt] = useState('');
  const [TermID, setTermID] = useState('');
  const [PrivacyID, setPrivacyID] = useState('');

  const [updatedTerm, setUpdatedTerm] = useState('');
  const [updatedPrivacy, setUpdatedPrivacy] = useState('');


  const [PrivacyPolicyContent, setPrivacyPolicyContent] = useState('');
  const [PrivacyPolicyCreatedAt, setPrivacyPolicyCreatedAt] = useState('');

  const handlePassword = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
    } else if (passwordType === 'password') {
      setPasswordType('text');

    }
  }

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


  const handleChangeUser = () => {
    SetTermAndCondition(false);
    SetPrivacyPolicy(false);
    SetManageUser(true);
  }

  const handleChangeTermAndConditions = () => {
    SetTermAndCondition(true);
    SetPrivacyPolicy(false);
    SetManageUser(false);
  }
  const handleChangePrivacyPolicy = () => {
    SetTermAndCondition(false);
    SetPrivacyPolicy(true);
    SetManageUser(false);
  }



  const [FilterEl, setFilterEl] = React.useState(null);
  const openFilterIcon = Boolean(FilterEl);
  const handleClickFilter = (event) => {
    setFilterEl(event.currentTarget);
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


  const getTermAndConditions = () => {
    axios.get("http://localhost:8082/terms_conditions/specific_terms_conditions")
      .then((response) => {
        if (response.data.result) {
          setTermID(response.data.result[0].id);
          setTermContent(response.data.result[0].content);
          setTermCreatedAt(response.data.result[0].createdat);
        } else {
          // window.alert("No Data!")
        }
      })
  }


  const getPrivacyPolicy = () => {
    axios.get("http://localhost:8082/privacy_policy/view_privacy_policy")
      .then((response) => {
        if (response.data.result) {
          setPrivacyID(response.data.result[0].id);
          setPrivacyPolicyContent(response.data.result[0].content);
          setPrivacyPolicyCreatedAt(response.data.result[0].createdat);
        } else {
          // window.alert("No Data!")
        }
      })
  }

  const getData = () => {
    const id = window.localStorage.getItem('id');
    axios.get("http://localhost:8082/auth/all_users")
      .then((response) => {
        if (response.data.result) {
          setLinksData(response.data.result)
        } else {
          // window.alert("No Data!")
        }
      })
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
    getPrivacyPolicy();
    getTermAndConditions();
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
  const handleColor = () => {
    setActive(!active);
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

  const handleUpdateTerm = async () => {
    const data = {
      id: TermID,
      title: "Term And Conditions",
      content: updatedTerm,
    }
    axios.put("http://localhost:8082/terms_conditions/update_terms_conditions", data)
      .then((response) => {
        if (response.data.result) {
          handleOpen();
          getTermAndConditions();
          setMessage("success");
          setMessageData("Term & Conditions Updated Successfully!");
          handleCloseCreate();    
            } else {
          // window.alert("Try again")
        }
      })

  }


  const handleUpdatePrivacy = async () => {
    const data = {
      id: PrivacyID,
      title: "Priacy Policy",
      content: updatedPrivacy,
    }
    console.log(data);
    axios.put("http://localhost:8082/privacy_policy/update_privacy_policy", data)
      .then((response) => {
        console.log(response);
        if (response.data.result) {
          setMessage("success");
          setMessageData("Privacy Policy Updated Successfully!");
          handleOpen();
          getPrivacyPolicy();
          handleCloseCreatePrivacy();    
            } else {
              setMessage("Error");
              setMessageData("Try Again");
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
            password: oldPassword,
            newPassword: password,
          }
          console.log(user);
          axios.put("http://localhost:8082/auth/resetPassword", user)
            .then((response) => {
              if (response.data.message === "Password Changed Successfully") {
                setMessage("Success");
                setMessageData("Password Reset Successfully");
                handleOpen();
                handleClosePasswordChange();
              } else {
                SetMessageError(response.data.message);
              }
            })
        } else {
          setMessage("Alert");
          setMessageData("Password & Confirm Password Must be Same");
          handleOpen();
        }
      }
  }

  const HandleDeleteUser = (id) => {
    axios.delete("http://localhost:8082/auth/delete_user/" + id)
      .then((response) => {
        if (response.data.message === "User Deleted Successfully!") {
          setMessage("Success");
          setMessageData("Usere Deleted Successfully");
          getData();
          handleOpen();
        } else {
          SetMessageError(response.data.message);
        }
      })
  }


  // const HandleMore = (title, createdAt, link, shortenlink) => {
  //   navigate('/UpdateLink', {
  //     state: {
  //       title: title,
  //       createdAt: createdAt,
  //       link: link,
  //       shortenlink: shortenlink
  //     }
  //   });
  // }

  return (
    <StyleRoot>
      <div className="test" style={styles.bounce}>


        {/* Update Data */}
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

        {/* Term & Conditions */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openCreatePrivacy}
          onClose={handleCloseCreatePrivacy}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={openCreatePrivacy}>
            <Grid container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={2} style={{
                borderRadius: '10px', padding: 10,
                height: '400px', width: '1200px', marginTop: "190px", marginLeft: '100px'
              }}>
                <Box
                  align='right'
                  style={{
                    marginTop: '7px',
                    position: 'absolute',
                    marginLeft: '1170px'
                  }}
                >
                  <Grid align='right'>
                    <CloseIcon style={{
                      cursor: "pointer"
                    }} onClick={handleCloseCreatePrivacy} />
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
                    Update Privacy Policy
                  </Typography>
                </Grid>

                <TextField
                  onChange={e => setUpdatedPrivacy(e.target.value)}
                  style={{ textDecorationColor: '#FF0000', color: '#FF0000' }}
                  fullWidth
                  multiline
                  rows={10}
                  defaultValue={PrivacyPolicyContent}
                  placeholder={PrivacyPolicyContent}
                  sx={{ color: '#FF0000', ml: '30px', mt: '30px', width: "1140px" }}
                  required />
                <br />
                <Button
                  sx={{
                    background: '#032C94',
                    textTransform: 'none',
                    borderRadius: '10px',
                    width: "280px",
                    ml: '450px', mt: '20px',
                    height: '40px', fontSize: '16px'
                  }}
                  className={classes.formHeading}
                  variant="contained"
                  onClick={() => { handleUpdatePrivacy() }}
                >
                  Update
                </Button>
              </Paper>
            </Grid>
          </Fade>
        </Modal>


        {/* Term & Conditions */}
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
                height: '400px', width: '1200px', marginTop: "190px", marginLeft: '100px'
              }}>
                <Box
                  align='right'
                  style={{
                    marginTop: '7px',
                    position: 'absolute',
                    marginLeft: '1170px'
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
                    Update Terms And Conditions
                  </Typography>
                </Grid>

                <TextField
                  onChange={e => setUpdatedTerm(e.target.value)}
                  style={{ textDecorationColor: '#FF0000', color: '#FF0000' }}
                  fullWidth
                  multiline
                  rows={10}
                  defaultValue={termContent}
                  placeholder={termContent}
                  sx={{ color: '#FF0000', ml: '30px', mt: '30px', width: "1140px" }}
                  required />
                <br />
                <Button
                  sx={{
                    background: '#032C94',
                    textTransform: 'none',
                    borderRadius: '10px',
                    width: "280px",
                    ml: '450px', mt: '20px',
                    height: '40px', fontSize: '16px'
                  }}
                  className={classes.formHeading}
                  variant="contained"
                  onClick={() => { handleUpdateTerm() }}
                >
                  Update
                </Button>
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
              justify="center" position='absolute' sx={{ align: 'center' }}  >
              <Paper elevation={8} style={{
                borderRadius: '15px', padding: 20,
                height: '450px', width: '510px', marginTop: "140px", marginLeft: '460px'
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
                <br />
                <Button onClick={() => { handlePasswordChangeForm() }} color='primary'
                  variant="contained" align='center'
                  style={{ height: '45px', background: '#032C94', width: "420px" }}
                  sx={{ ml: '40px', mt: '65px' }}
                >Change Password</Button>
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
                  multiline
                  rows={4}
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
                  Do you really want to Delete this Qr Code?</Typography>
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
                      {`(Admin)`}
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
                  gap: 0,
                  py: 1.5,
                  px: 'var(--Card-padding)',
                  bgcolor: '#FFFFFF',
                }}
                onClick={handleOpenPasswordChange}
              >
                <Typography level="body3"
                  borderRadius='15px' sx={{
                    borderRadius: '15px', ml: '30px',
                    fontWeight: '500', color: '#black'
                  }}>
                  Change Password
                </Typography>
                <Typography level="body3" sx={{ ml: '16%' }}>
                  <LockResetIcon sx={{ color: '#032C94' }} />
                </Typography>
              </CardOverflow>
              <Divider />
              <CardOverflow
                variant="soft"
                sx={{
                  display: 'flex',
                  gap: 0,
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
            id="basic-button"
            aria-controls={openMoreIcon ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMoreIcon ? 'true' : undefined}
            onClick={handleClick}

            variant="contained"
            color="primary"
          >
            < SettingsIcon />
            Settings
          </Button>
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
                handleChangeTermAndConditions();
              }}>
              <Typography level="body3" sx={{}}>
                {/* <VisibilityOffIcon sx={{ color: '#032C94' }} /> */}
              </Typography>
              <space />
              <Typography level="body3" sx={{ ml: '15px', color: '#black' }}>
                Terms & Conditions
              </Typography>
            </MenuItem>
            <Divider sx={{ ml: '20px', mr: '20px' }} />
            <MenuItem
              sx={{ mt: '5px', height: '25px' }}
              onClick={() => {
                handleChangePrivacyPolicy();
              }}>
              <Typography level="body3" sx={{}}>
                {/* <BorderColorIcon sx={{ color: '#40C8EB' }} /> */}
              </Typography>

              <Typography level="body3" sx={{ ml: '15px', color: '#black' }}>
                Privacy Policy
              </Typography>
            </MenuItem>
            <Divider sx={{ ml: '20px', mr: '20px' }} />
            <MenuItem
              sx={{ mt: '5px', height: '25px' }}
              onClick={() => {
                handleChangeUser();
              }}>
              <Typography level="body3" sx={{}}>
                {/* <BorderColorIcon sx={{ color: '#40C8EB' }} /> */}
              </Typography>

              <Typography level="body3" sx={{ ml: '15px', color: '#black' }}>
                Manage User
              </Typography>
            </MenuItem>

          </Menu>
        </Box>


        <Divider sx={{ ml: '25px', width: '1390px', mr: '25px' }} />


        {/* <Box style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          minHeight: '55px'
        }}>

          <Grid
            align='left'
            sx={{
              borderRadius: '5px', mt: '10px',
              ml: '95px',
              // background: '#F3F3F3', 
              width: '260px', height: '35px'
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
                , width: '145px',
                height: '25px',
                color: '#black', background: '#032C94',
                fontSize: '13px',
                textTransform: 'none'
              }}
              className={classes.formHeading}
              id="basic-Filter"
              aria-controls={openFilterIcon ? 'basic-Filter' : undefined}
              aria-haspopup="true"
              aria-expanded={openFilterIcon ? 'true' : undefined}
              onClick={handleClickFilter}
              variant="contained"
              color="primary"
            // onClick={() => { navigate('/dashboard') }}
            >
              <ManageAccountsIcon />
              Manage User
            </Button>



            <Button
              sx={{
                width: '99px', mt: '5px', color: '#9B9B9B',
                background: '#F3F3F3', height: '25px',
                fontSize: '13px',
                textTransform: 'none'
              }}
              className={classes.formHeading}

              id="basic-button"
              aria-controls={openMoreIcon ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMoreIcon ? 'true' : undefined}
              onClick={handleClick}

            // onClick={() => { navigate('/QRCodeDashboard') }}
            >
              < SettingsIcon />
              Settings
            </Button>
 

          </Grid>


        </Box>

        <Divider sx={{ ml: '25px', width: '1390px', mr: '25px' }} /> */}


        {manageUser ?
          <>
            <Box style={{
              display: 'flex',
            }} sx={{ mt: '36px' }} >
              <div>
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

                  <Typography sx={{ mt: '5px' }} variant="h5" fontWeight={500}>
                    Manage Users
                  </Typography>
                </Grid>
              </div>

            </Box>
            <Grid
              align='center'
              sx={{
                borderRadius: '5px',
                ml: '5px',
              }}
              style={{
                display: 'flex',
                align: 'center',
                justifyContent: 'center',

              }}
            >


              <div className='dashboard-content'>


                <div className='dashboard-content-container'>
                  <div className='dashboard-content-header'>
                    {/* <Button variant='contained' onClick={() => { navigate('/blocked_users') }} color='primary'>Blocked Users</Button>
                  <Button variant='contained' onClick={() => { navigate('/Subscribed_Users') }} color='primary'>Subscribed Users</Button> */}

                    <div className='dashboard-content-search'>
                      {/* <input
                      type='text'
                      // value={search}
                      placeholder='Search..'
                      className='dashboard-content-input'
                      onChange={e => __handleSearch(e)} /> */}
                    </div>
                  </div>

                  <table>
                    <thead>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Delete</th>
                    </thead>

                    {linkData.length !== 0 ?
                      <tbody>
                        {linkData.map((user, index) => (
                          <tr key={index}>
                            <td><span>{user.username}</span></td>
                            <td><span>{user.email}</span></td>
                            <td><span><Button onClick={() => { HandleDeleteUser(user.id) }}><DeleteIcon /></Button></span></td>
                          </tr>
                        ))}
                      </tbody>
                      :
                      <Typography
                        sx={{ marginTop: '200px', marginLeft: '500px' }}
                        variant="h3" fontWeight={200}>
                        No User Yet!
                      </Typography>
                    }
                  </table>
                </div>
              </div>

            </Grid>
          </> : ""}
        {
          PrivacyPolicy ?
            <>
              <Box style={{
                display: 'flex',
              }} sx={{ mt: '36px' }} >
                <div>
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

                    <Typography sx={{ mt: '5px' }} variant="h5" fontWeight={500}>
                      Privacy Policy
                    </Typography>
                  </Grid>
                </div>

              </Box>

              <Grid style={{
                display: 'flex',
                align: 'center',
                justifyContent: 'center',

              }}
              >
                <div
                  style={{
                    marginTop: '50px',
                    border: `1px solid #9B9B9B`, borderRadius: '5px',
                    width: '1300px', height: '100%'
                  }} className="result">
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems='flex-start'
                    marginTop={1}
                  >
                  </Box>
                  <Button
                    sx={{
                      ml: '5px', mt: '5px',
                      width: '30px', height: '40px', fontSize: '13px',
                      textTransform: 'none'
                    }}
                    className={classes.formHeading}
                    variant="outlined"
                    color="primary"
                    onClick={() => { handleOpenCreatePrivacy() }}
                  >
                    < CreateIcon />

                  </Button>
                  <Typography fontSize={14} sx={{ ml: '5px', mt: '10px' }}>
                    {`Last Update At : ${moment(PrivacyPolicyCreatedAt).format("MMMM Do, YYYY/hh:mm  A")}`}
                  </Typography>
                  <br />
                  <Typography fontSize={14} sx={{
                    color: '#707070', wordWrap: 'break-word',
                    width: '1200px', ml: '33px'
                  }}>
                    {PrivacyPolicyContent}
                  </Typography>
                  <div container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    position='absolute' sx={{ align: 'center' }}  >
                  </div>
                </div>
              </Grid>
            </>
            : " "}
        {
          TermAndCondition ?
            <>
              <Box style={{
                display: 'flex',
              }} sx={{ mt: '36px' }} >
                <div>
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

                    <Typography sx={{ mt: '5px' }} variant="h5" fontWeight={500}>
                      Terms And Conditions
                    </Typography>
                  </Grid>
                </div>

              </Box>

              <Grid style={{
                display: 'flex',
                align: 'center',
                justifyContent: 'center',

              }}
              >
                <div
                  style={{
                    marginTop: '50px',
                    border: `1px solid #9B9B9B`, borderRadius: '5px',
                    width: '1300px', height: '100%'
                  }} className="result">
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems='flex-start'
                    marginTop={1}
                  >
                  </Box>
                  <Button
                    sx={{
                      ml: '5px', mt: '5px',
                      width: '30px', height: '40px', fontSize: '13px',
                      textTransform: 'none'
                    }}
                    className={classes.formHeading}
                    variant="outlined"
                    color="primary"
                    onClick={() => { handleOpenCreate() }}
                  >
                    < CreateIcon />

                  </Button>
                  <Typography fontSize={14} sx={{ ml: '5px', mt: '10px' }}>
                    {`Last Update At : ${moment(termCreatedAt).format("MMMM Do, YYYY/hh:mm  A")}`}
                  </Typography>
                  <br />
                  <Typography fontSize={14} sx={{
                    color: '#707070', wordWrap: 'break-word',
                    width: '1200px', ml: '33px'
                  }}>
                    {termContent}
                  </Typography>
                  <div container
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="center"
                    position='absolute' sx={{ align: 'center' }}  >
                  </div>
                </div>
              </Grid>
            </> : ''}



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
