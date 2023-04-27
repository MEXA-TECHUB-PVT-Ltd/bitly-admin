import React, { useEffect, useState } from 'react';
// material-ui
import axios from "axios";
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
// project imports
import MainCard from 'ui-component/cards/MainCard';
import EditNoteIcon from '@mui/icons-material/EditNote';

import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState('');
    const [messageError, setMessageError] = useState('');
    const [messageDataError, setMessageDataError] = useState('');  
    const [updatedPrivacy, setUpdatedPrivacy] = useState('');
    const [openCreatePrivacy, setOpenCreatePrivacy] = React.useState(false);
    const handleOpenCreatePrivacy = () => setOpenCreatePrivacy(true);
    const handleCloseCreatePrivacy = () => setOpenCreatePrivacy(false);
    const [open, setOpen] = React.useState(false);
    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [PrivacyPolicyContent, setPrivacyPolicyContent] = useState('');
  const [PrivacyPolicyCreatedAt, setPrivacyPolicyCreatedAt] = useState('');
  const [PrivacyID, setPrivacyID] = useState('');

  const getPrivacyPolicy = () => {
    axios.get("https://staging-bitly-be.mtechub.com/terms_conditions/specific_terms_conditions")
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

  useEffect(() => {
    getPrivacyPolicy();
    // getTermAndConditions();
    // getData();
    // getProfile();
  }, []);

    const handleUpdatePrivacy = async () => {
        const data = {
          id: PrivacyID,
          title: "Priacy Policy",
          content: updatedPrivacy,
        }
        console.log(data);
        axios.put("https://staging-bitly-be.mtechub.com/terms_conditions/update_terms_conditions", data)
          .then((response) => {
            console.log(response);
            if (response.data.result) {
              setMessage("success");
              setMessageData("Terms And Condition Updated Successfully!");
              handleOpen();
              getPrivacyPolicy();
              handleCloseCreatePrivacy();    
                } else {
                //   setMessage("Error");
                //   setMessageData("Try Again");
                }
          })
    
      }
    

    return (
        <>
            {/* Privacy Policy */}
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
                    <Grid container style={{
                            borderRadius: '10px', padding: 10,
                            height: '400px', width: '1100px', marginTop: "190px", marginLeft: '300px'
                        }}
                        spacing={0} 
                        direction="row"
                        alignItems="center"
                        justify="center" position='absolute' sx={{ align: 'center' }}  >
                        <Paper elevation={0} style={{
                            borderRadius: '10px', padding: 10,
                            height: '400px', width: '1100px'
                        }} >
                            <Box
                                align='right'
                                style={{
                                    marginTop: '7px',
                                    position: 'absolute',
                                    marginLeft: '1130px'
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
                                sx={{ color: '#FF0000', ml: '30px', mt: '30px', width: "1020px" }}
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
                                // className={classes.formHeading}
                                variant="contained"
                                onClick={() => { handleUpdatePrivacy() }}
                            >
                                Update
                            </Button>
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
              }}>

                <Box
                  align='right'
                  style={{
                    marginTop: '15px',
                    position: 'absolute',
                    marginLeft: '510px'
                  }}
                >
                  <Grid align='right'>
                    <CloseIcon style={{
                      cursor: "pointer"
                    }} onClick={handleClose} />
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
                  <Button onClick={() => { handleClose(); handleCloseCreatePrivacy(); }} color='primary'
                    variant="contained" align='center'
                    style={{ marginLeft: '22%', borderRadius: '10px', background: '#032C94', width: "100%", height: '50%' }} sx={{ mt: '5%' }}
                  >Go Back</Button>
                </div >
              </Paper>
            </Grid>
          </Fade>
        </Modal>



            <MainCard title="Terms And Conditions" secondary={<svg onClick={setOpenCreatePrivacy} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
            </svg>}>
                <Typography variant="body2">
                   {PrivacyPolicyContent}
                </Typography>
            </MainCard>


        </>
    );
}
export default SamplePage;
