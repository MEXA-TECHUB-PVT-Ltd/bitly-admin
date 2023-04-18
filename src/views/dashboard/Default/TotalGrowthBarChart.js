
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import './tableStyles.css';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';


// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
    const [value, setValue] = useState('today');
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [linkData, setLinksData] = useState([]);

    const { navType } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    const HandleDeleteUser = (id) => {
        axios.delete("https://staging-bitly-be.mtechub.com/auth/delete_user/" + id)
            .then((response) => {
                if (response.data.message === "User Deleted Successfully!") {
                    //   setMessage("Success");
                    //   setMessageData("Usere Deleted Successfully");
                    //   getData();
                    //   handleOpen();
                } else {
                    //   SetMessageError(response.data.message);
                }
            })
    }

    const getData = () => {
        axios.get("https://staging-bitly-be.mtechub.com/auth/all_users")
            .then((response) => {
                if (response.data.result) {
                    console.log(response.data.result);
                    setLinksData(response.data.result)
                } else {
                    // window.alert("No Data!")
                }
            })
    }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Total Users</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">30</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>

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

                        </Grid>
                    </Grid >
                </MainCard >
            )}
        </>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
