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
            const response = await axios.post('/register', {
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                mt: 3,
                                width: "130px",
                                height: "130px",
                                bgcolor: "black",
                                borderRadius: "100%"
                            }}
                        >
                            <Button
                                variant="contained"
                                endIcon={<PhotoCamera />}
                                sx={{
                                    minWidth: '25px',
                                    minHeight: '25px',
                                    mt: '110px',
                                    ml: '23px'
                                }}

                            >
                                Add
                            </Button>
                        </Box >
                        <Box component="form" noValidate onSubmit={()=> { handleSubmit(); handleTransition(TransitionLeft); } } sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        id="userName"
                                        name="userName"
                                        required
                                        fullWidth
                                        label="Username"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        fullWidth
                                        label="First Name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        type='email'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type='number'
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
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
                                                required
                                                id="consent"
                                                name="consent"
                                                color="primary"
                                            />}
                                        label="By checking this box, you are agreeing to our terms of service."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={() => {  }}
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
                                        The customazation of your rental space have been completed successfully!
                                        You'll be redirected to your home page in 5...
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