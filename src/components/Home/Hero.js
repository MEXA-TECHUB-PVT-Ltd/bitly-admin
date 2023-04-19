import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import myteam from '../../images/myteam.jpg';
import useStyles from '../../styles/styles';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" fontWeight={700} className={classes.title}>
            We’ve expanded!
          </Typography>
          <Typography variant="h4" fontWeight={700} className={classes.title}>
            Shorten URLs. Generate QR Codes.
            And now, create Link-in-bios.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { navigate('/login') }}
            sx={{background:'#022D94', width: '40%', height: '30%', fontSize: '1vw' }}
          >
            Get Started For Free
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={myteam} alt="My Team" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;