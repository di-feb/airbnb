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
import jwt_decode from 'jwt-decode';


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

    // Holds the values of all the fiedls
    const [errors, setErrors] = React.useState({
        username: false,
        password: false,
    });

    // Holds the values of all the fiedls
    const [helperText, setHelperText] = React.useState({
        username: '',
        password: '',
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

    const [errorMessage, setErrorMessage] = React.useState('');

    const findUserRole = async (username) => {
        try {
            const response = await axios.get('https://localhost:8080/login/role', {
                params: {
                    username: username,
                },
            });

            if (response.status === 200) {
                const role = response.data;
                console.log(role)
                return role;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const checkUserRole = async () => {
        // Decode the JWT token
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken === null)
            return null;
        const decodedToken = jwt_decode(accessToken);
        try {
            // Access the user's role from the decoded token
            const role = await findUserRole(decodedToken.sub);

            if (role === 'Tenant')
                return 'Tenant'
            else if (role === 'Host')
                return 'Host'
            else if (role === 'Host_Tenant')
                return 'Host_Tenant'
            else
                return 'Admin'
        }
        catch (error) {
            console.error(error);
        }

    }

    // Controls the navigation
    const handleTransition = (Transition, signedUp, role) => {
        console.log(role)
        console.log(signedUp)
        if (signedUp && (role === 'Host' || role === 'Host_Tenant')) {
            setTransition(() => Transition);
            setAlert(1);

            setTimeout(() => {
                navigate('/hostHome');
            }, 3000);
        }
        else if (signedUp && role === 'Tenant') {
            setTransition(() => Transition);
            setAlert(1);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        else if (signedUp && role === 'Admin') {
            setTransition(() => Transition);
            setAlert(1);
            setTimeout(() => {
                navigate('/admin');
            }, 3000);
        }
        else {
            setTransition(() => Transition);
            setAlert(2);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const areFieldsValid = Object.values(errors).every(error => error === false);

        if (!areFieldsValid)
            return
        try {
            const response = await axios.post('https://localhost:8080/login', {
                username: data.username,
                password: data.password,
            });

            if (response.status === 200) {
                // Clear the local storage
                localStorage.clear();
                const { access_token, refresh_token } = response.data;
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);

                const role = await checkUserRole();
                handleTransition(TransitionLeft, true, role);
                setErrorMessage('');
            }
        } catch (error) {
            if (error.response.status === 401) {
                handleTransition(TransitionLeft, false);
                setErrorMessage('Invalid username of password');
            }
            else if (error.response.status === 403) {
                handleTransition(TransitionLeft, false);
                setErrorMessage('Your registration is pending approval from the administrator');
            }
        }
    }


    const usernameError = (username, submitClicked) => {
        if (username === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, username: true }))
            setHelperText((prev) => ({ ...prev, username: 'Username is required.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, username: false }))
            setHelperText((prev) => ({ ...prev, username: '' }))
        }
    }

    const passwordError = (password, submitClicked) => {
        if (password === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, password: true }))
            setHelperText((prev) => ({ ...prev, password: 'Password is required' }))
        }
        else {
            setErrors((prev) => ({ ...prev, password: false }))
            setHelperText((prev) => ({ ...prev, password: '' }))
        }
    }




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
                        <Box
                            component="form"
                            noValidate
                            onSubmit={(e) => {
                                handleSubmit(e);
                                usernameError(data.username, true);
                                passwordError(data.password, true);
                            }}
                            sx={{ mt: 1 }}>

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
                                error={errors.username}
                                helperText={helperText.username}
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
                                error={errors.password}
                                helperText={helperText.password}
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
                                        {errorMessage}
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







