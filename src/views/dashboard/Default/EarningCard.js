import { useState } from 'react';
import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
    const theme = useTheme();

    const [linkData, setLinksData] = React.useState('');
    const getData = () => {
        axios.get("https://staging-bitly-be.mtechub.com/auth/total_users")
            .then((response) => {
                if (response.data.result) {
                    setLinksData(response.data.result[0].count);
                } else {
                    // window.alert("No Data!")
                }
            })
    }
    React.useEffect(() => {
        getData();
    }, []);


    const [timeValue, setTimeValue] = useState(false);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.primary[800],
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                            <PeopleOutlineIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                    {linkData}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...theme.typography.smallAvatar,
                                                        cursor: 'pointer',
                                                        backgroundColor: theme.palette.primary[200],
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                >
                                                    Total Users
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {/* {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />} */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;


// import React from "react";
// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import axios from "axios";
// // material-ui
// import { styled, useTheme } from '@mui/material/styles';
// import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// // assets
// import EarningIcon from 'assets/images/icons/earning.svg';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
// import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
// import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
// import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

// const CardWrapper = styled(MainCard)(({ theme }) => ({
//     backgroundColor: theme.palette.secondary.dark,
//     color: '#fff',
//     overflow: 'hidden',
//     position: 'relative',
//     '&:after': {
//         content: '""',
//         position: 'absolute',
//         width: 210,
//         height: 210,
//         background: theme.palette.secondary[800],
//         borderRadius: '50%',
//         top: -85,
//         right: -95,
//         [theme.breakpoints.down('sm')]: {
//             top: -105,
//             right: -140
//         }
//     },
//     '&:before': {
//         content: '""',
//         position: 'absolute',
//         width: 210,
//         height: 210,
//         background: theme.palette.secondary[800],
//         borderRadius: '50%',
//         top: -125,
//         right: -15,
//         opacity: 0.5,
//         [theme.breakpoints.down('sm')]: {
//             top: -155,
//             right: -70
//         }
//     }
// }));

// // ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

// const EarningCard = ({ isLoading }) => {
//     const theme = useTheme();

//     const [anchorEl, setAnchorEl] = useState(null);

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const [linkData, setLinksData] = useState('');
//     const getData = () => {
//         axios.get("https://staging-bitly-be.mtechub.com/auth/total_users")
//           .then((response) => {
//             if (response.data.result) {
//               setLinksData(response.data.result[0].count);
//             } else {
//               // window.alert("No Data!")
//             }
//           })
//       }
//       React.useEffect(() => {
//         getData();
//       }, []);
    

//     return (
//         <>
//             {isLoading ? (
//                 <SkeletonEarningCard />
//             ) : (
//                 <CardWrapper border={false} content={false}>
//                     <Box sx={{ p: 2.25 }}>
//                         <Grid container direction="column">
//                             <Grid item>
//                                 <Grid container justifyContent="space-between">
//                                     <Grid item>
//                                         <Avatar
//                                             variant="rounded"
//                                             sx={{
//                                                 ...theme.typography.commonAvatar,
//                                                 ...theme.typography.largeAvatar,
//                                                 backgroundColor: theme.palette.secondary[800],
//                                                 mt: 1
//                                             }}
//                                         >
//                                             <img src={EarningIcon} alt="Notification" />
//                                         </Avatar>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item>
//                                 <Grid container alignItems="center">
//                                     <Grid item>
//                                         <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
//                                             {linkData}
//                                         </Typography>
//                                     </Grid>
//                                     <Grid item>
//                                         <Avatar
//                                             sx={{
//                                                 cursor: 'pointer',
//                                                 ...theme.typography.smallAvatar,
//                                                 backgroundColor: theme.palette.secondary[200],
//                                                 color: theme.palette.secondary.dark
//                                             }}
//                                         >
//                                             <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
//                                         </Avatar>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item sx={{ mb: 1.25 }}>
//                                 <Typography
//                                     sx={{
//                                         fontSize: '1rem',
//                                         fontWeight: 500,
//                                         color: theme.palette.secondary[200]
//                                     }}
//                                 >
//                                     Total Users
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </CardWrapper>
//             )}
//         </>
//     );
// };

// EarningCard.propTypes = {
//     isLoading: PropTypes.bool
// };

// export default EarningCard;
