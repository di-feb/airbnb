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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar'
import Copyright from './Copyright';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Role from './Role';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

    const [alert, setAlert] = React.useState(false);
    const handleAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [transition, setTransition] = React.useState(undefined);

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }



    const handleTransition = (Transition) => () => {
        if (signUp) {
            setTransition(() => Transition);
            setAlert(true);

            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    const [signUp, setSignUp] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const response = await axios.post('/signup', {
                username: formData.get('username'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phoneNumber: formData.get('phoneNumber'),
                password: formData.get('password'),
                passwordValid: formData.get('passwordValid'),
                role: formData.get('role'),
                consent: formData.get('consent'),
            });
            console.log(response.data);
            setSignUp(true);
        } catch (error) {
            console.error(error);

        }
    };


    return (
        <div>
            <Navbar />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            mt: 5,
                            mb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <Avatar
                            alt="Remy Sharp"
                            src={require("./images/avatar.png")}
                            sx={{
                                width: '120px',
                                height: '120px',
                                mt: 5
                            }} />
                        <Button
                            variant="contained"
                            endIcon={<PhotoCamera />}
                            size='small'
                            color="info"
                            sx={{
                                
                                mt: '-12px',
                                textTransform: 'none'
                            }}

                        >
                            Add Photo
                        </Button>

                        <Box component="form" noValidate onSubmit={() => { handleSubmit(); handleTransition(TransitionLeft); }} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete="username"
                                        id="userName"
                                        name="userName"
                                        label="Username"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="first-name"
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="last-name"
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        type='email'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="phoneNumber"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        type='number'
                                        inputProps={{
                                            pattern: "[0-9]*", // only allow numbers
                                            inputMode: "numeric", // show numeric keyboard on mobile devices
                                            min: 0
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="new-password"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="password-validation"
                                        id="passwordValid"
                                        name="passwordValid"
                                        label="Password Validation"
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Role />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="consent"
                                                name="consent"
                                                color="primary"
                                            />}
                                        label="By checking this box, you are agreeing to our terms of service."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>

                            {alert &&
                                <Snackbar
                                    open={alert}
                                    autoHideDuration={5000}
                                    onClose={handleAlert}
                                    TransitionComponent={transition}
                                >
                                    <Alert onClose={handleAlert} severity="success" sx={{ width: '100%', alignItems: "center" }}>
                                        Your registration was successfull!
                                    </Alert>
                                </Snackbar>
                            }
                        </Box>
                    </Box>
                </Container >
            </ThemeProvider>
            <Box
                component="footer"
                sx={{
                    mt: 1,
                    py: 2.0,
                    backgroundColor: "#c2c2c2",
                }}
            >
                <Copyright />
            </Box >
        </div>
    );
}