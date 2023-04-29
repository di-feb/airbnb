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


const theme = createTheme();

export default function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="userName"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="Username"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type='number'
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
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
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="validPassword"
                                        label="Password Validation"
                                        type="password"
                                        id="validPassword"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Role />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="By checking this box, you are agreeing to our terms of service."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
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
                        </Box>
                    </Box>
                </Container >
            </ThemeProvider>
            <Box
                component="footer"
                sx={{
                    mt:1,
                    py: 2.0,
                    backgroundColor: "#c2c2c2",
                }}
            >
                <Copyright /> 
            </Box > 
        </div>
    );
}