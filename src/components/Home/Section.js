import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles from '../../styles/styles';

const Section = () => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
      <Typography variant="h5" fontWeight={700} className={classes.formHeading}>
        Bitly’s Connections Platform
      </Typography>
      <br />
      <Typography sx={{ ml: 30, mr: 30 }} className={classes.formHeading}>
        All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.
      </Typography>
    </Box>
  );
};

export default Section;