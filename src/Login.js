import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios';



const theme = createTheme();

export default function Login() {

    const navigate = useNavigate();

    const [alert, setAlert] = React.useState(0);
    const [transition, setTransition] = React.useState(undefined);

    const handleAlert = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }




    // Holds the values of all the fiedls
    const [data, setData] = React.useState({
        username: '',
        password: '',
        rememberMe: false
    });

    // Updates all fields values.  
    // Checks if submit is clickable and updates canSubmit.
    const handleFieldChange = (event) => {
        const { name, value, checked } = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name]: name === "rememberMe" ? checked : value
            }
        })
    }

    const [error, setError] = React.useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: data.username,
                password: data.password,
            });

            if (response.data.message === 'Invalid username or password') {
                handleTransition(TransitionLeft, false);
                setError('Invalid username or password');

            } else if (response.data.message === 'Login successful') {
                handleTransition(TransitionLeft, true);
                setError('');
            }

        } catch (error) {
            handleTransition(TransitionLeft, false);
            setError('piswww!');
            console.error(error);

        }
    }


    // Controls the navigation
    const handleTransition = (Transition, signedUp) => {
        if (signedUp) {
            setTransition(() => Transition);
            setAlert(1);

            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        else {
            setTransition(() => Transition);
            setAlert(2);
        }
    };

    return (
        <div>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                name="username"
                                value={data.username}
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => {
                                    handleFieldChange(e);
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                id="password"
                                value={data.password}
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    handleFieldChange(e);
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="rememberMe"
                                        name="rememberMe"
                                        color="primary"
                                        checked={data.rememberMe}
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                        }}
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {alert === 1 &&
                                <Snackbar
                                    open={alert === 1}
                                    autoHideDuration={5000}
                                    onClose={handleAlert}
                                    TransitionComponent={transition}
                                >
                                    <Alert onClose={handleAlert} severity="success" sx={{ width: '100%', alignItems: "center" }}>
                                        You re logging in successfullly!
                                    </Alert>
                                </Snackbar>
                            }
                            {alert === 2 &&
                                <Snackbar
                                    open={alert === 2}
                                    autoHideDuration={5000}
                                    onClose={handleAlert}
                                    TransitionComponent={transition}
                                >
                                    <Alert onClose={handleAlert} severity="error" sx={{ width: '100%', alignItems: "center" }}>
                                        {error}
                                    </Alert>
                                </Snackbar>
                            }
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <Footer />
        </div>
    );
}






