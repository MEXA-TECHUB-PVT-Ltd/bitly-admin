import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const Login=()=>{
    const [passwordType, setPasswordType] = useState('password');
    const handlePassword = ()  =>{
        if(passwordType==='text'){
            setPasswordType('password');
        }else if (passwordType==='password'){
            setPasswordType('text');

        }
    }


    const handleForm = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = {
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        }
        console.log(user);
    }
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>New Password</h2>
                </Grid>
                <TextField label='Password' placeholder='Enter New Password' type='password' fullWidth required/>
                <TextField label='confirmPassword' placeholder='Enter confirm Password' type='password' fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={() => { handleForm() }} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography > Remember password ?
                     <Link href="/signin" >
                        Sign In 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login