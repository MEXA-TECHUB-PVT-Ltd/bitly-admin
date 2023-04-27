import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import './tableStyles.css';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from "lottie-react";
import groovyWalkAnimation from "./data.json";
import warning from "./warning.json";
import { BaseUrl } from "BaseURL";
// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import EditNoteIcon from '@mui/icons-material/EditNote';

import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const [message, setMessage] = React.useState('');
  const [messageData, setMessageData] = React.useState('');
  const [openDleteConfirmation, setOpenDleteConfirmation] = React.useState(false);
  const handleOpenDleteConfirmation = () => setOpenDleteConfirmation(true);
  const handleCloseDleteConfirmation = () => setOpenDleteConfirmation(false);

  const [deleteID, setDeleteID] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [linkData, setLinksData] = React.useState([]);
  const HandleDeleteUser = () => {
    axios.delete(BaseUrl+"auth/delete_user/" + deleteID)
      .then((response) => {
        if (response.data.message === "User Deleted Successfully!") {
          setMessage("Success");
          setMessageData("Usere Deleted Successfully");
          getData();
          handleCloseDleteConfirmation();
          handleOpen();
        } else {
          //   SetMessageError(response.data.message);
        }
      })
  }

  const getData = () => {
    setLoading(true);
    axios.get(BaseUrl+"auth/all_users")
      .then((response) => {
        setLoading(false);
        if (response.data.result) {
          console.log(response.data.result);
          setLinksData(response.data.result)
        } else {
          // window.alert("No Data!")
        }
      })
  }
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
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


      {/* delete */}
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
                  marginLeft: '460px'
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
                Do you really want to Delete this User?</Typography>
              <Button onClick={() => { handleCloseDleteConfirmation() }}
                variant="outlined" align='center'
                style={{
                  borderColor: '#032C94',
                  color: '#032C94', width: "180px", height: '40px',
                  borderRadius: '10px'
                }} sx={{ ml: '50px', mt: '45px' }}
              > Cancel</Button>
              <Button onClick={() => {
                HandleDeleteUser();
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


      <MainCard title="Manage Users" >

        <Grid align='center' sx={{ borderRadius: '5px', ml: '5px', }}
          style={{ display: 'flex', align: 'center', justifyContent: 'center' }}>
          <div className='dashboard-content'>
            <div className='dashboard-content-container'>
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
                        <td><span><Button onClick={() => { handleOpenDleteConfirmation(); setDeleteID(user.id) }}><DeleteIcon sx={{ color: '#032C94' }} /></Button></span></td>
                      </tr>
                    ))}
                  </tbody>
                  :
                  loading ?
                    <Typography
                      sx={{ marginTop: '200px', marginLeft: '500px' }}
                      variant="h3" fontWeight={200}>
                      Please wait ...
                    </Typography>
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

      </MainCard>
    </>

  );
}
export default SamplePage;
