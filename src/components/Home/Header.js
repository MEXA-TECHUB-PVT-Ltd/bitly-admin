import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../../styles/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


  const Header = (props) => {
    const classes = useStyles();
    const links = [
      { id: 1, route: 'Sign In', url: 'https://blog.appseed.us/mui-react-coding-landing-page/' },
      { id: 2, route: 'Sign Up', url: 'https://appseed.us/apps/react' },
    ];

    const [state, setState] = React.useState({
      right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {links.map((link) => (
            <ListItem button key={link.id}>
              <ListItemText primary={link.route} />
            </ListItem>
          ))}
        </List>
      </Box>
    );

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
      <Box sx={{ marginBottom: '70px' }}>
          <AppBar>
            <Toolbar className={classes.toolBar}>
              <Link href="#" underline="none">
                <Typography variant="h5" className={classes.logo}>
                  Bitly
                </Typography>
              </Link>

              {matches ? (
                <Box>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer('right', true)}
                  >
                    <MenuIcon className={classes.menuIcon} fontSize="" />
                  </IconButton>

                  <Drawer
                    anchor="right"
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                  >
                    {list('right')}
                  </Drawer>
                </Box>
              ) : <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: '0.1',
                }}
              >
                {links.map((link) => (
                  <Link href={link.url} target="_blank" underline="none" key={link.id}>
                    <Typography className={classes.link}>{link.route}</Typography>
                  </Link>
                ))}
              </Box>}

            </Toolbar>
          </AppBar>
      </Box>
    );
  };

  export default Header;