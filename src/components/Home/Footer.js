import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import useStyles from '../../styles/styles';

const Footer = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Typography className={classes.footerText}>
        Provided by{'  MTecHub   '}
        <Link href="http://localhost:3002/" target="_blank" underline="none">
          Bitly
        </Link>
      </Typography>
      <Typography className={classes.footerDate}>Privacy Policy  Term Of Conditions</Typography>
    </Box>
  );
};

export default Footer;