import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import './tableStyles.css';
// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import EditNoteIcon from '@mui/icons-material/EditNote';

import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const [linkData, setLinksData] = React.useState([]);
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
    React.useEffect(() => {
        getData();
    }, []);

    return (
        <>
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

            </MainCard>
        </>

    );
}
export default SamplePage;
