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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './Navbar'
import Copyright from './Copyright';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator'

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
        const formData = new FormData(event.currentTarget);
        try {
            await axios.post('http://localhost:5000/signup', {
                username: formData.get('username'),
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                email: formData.get('email'),
                phoneNumber: formData.get('phoneNumber'),
                password: formData.get('password'),
                role: formData.get('role'),
                consent: formData.get('consent'),
            });
            setSignUp(true);
        } catch (error) {
            console.error(error);

        }
    };

    const [data, setData] = React.useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordValid: "",
        role: "",
        consent: "",
    });

    const [errors, setErrors] = React.useState({
        username: false,
        firstname: false,
        lastname: false,
        email: false,
        phoneNumber: false,
        password: false,
        passwordValid: false,
        role: false,
        consent: false,
    });


    const [submitClicked, setSubmitClicked] = React.useState(false)

    const handleFieldChange = (name, value, checked) => {
        setData((prev) => ({
            ...prev,
            [name]: name !== checked ? value : checked
        }));
    };

    const usernameError = (username) => {
        if ((username === "" && submitClicked) || username.length > 10)
            setErrors({ ...errors, username: true })
        else
            setErrors({ ...errors, username: false })
    }

    const handleUsernameHelperText = () => {
        if (data.username === "" && submitClicked) {
            return `Username is required.`
        }
        else if (data.username.length > 10) {
            return 'Username must be smaller than 10 characters.'
        }

    }

    const emailError = (email) => {
        const atIndex = email.indexOf('@');

        if (!email.length && submitClicked)
            setErrors({ ...errors, email: true })

        else if (atIndex === -1 && email.length)
            setErrors({ ...errors, email: true })

        else if ((atIndex === 0 || atIndex === email.length - 1) && email.length)
            setErrors({ ...errors, email: true })
        else
            setErrors({ ...errors, email: false })
    }

    const handleEmailHelperText = () => {
        const atIndex = data.email.indexOf('@');

        if (!data.email.length && submitClicked) {
            return 'Email is required.'
        }

        else if (atIndex === -1 && data.email.length) {
            return 'Email must contain "@" character.';
        }

        else if ((atIndex === 0 || atIndex === data.email.length - 1) && data.email.length) {
            return 'Invalid email format.';
        }
        else
            return "";
    };


    const [phoneNumberIsClicked, setPhoneNumberIsClicked] = React.useState(false)

    const phoneNumberHelperText = () => {
        return data.phoneNumber.length !== 10 && 'Phone Number must have 10 digits.'
    }

    const phoneNumberError = (phoneNumber) => {
        if (phoneNumber.length !== 10)
            setErrors({ ...errors, phoneNumber: true })
        else
            setErrors({ ...errors, phoneNumber: false })
    }

    const [passwordHelperText, setPasswordHelperText] = React.useState('');
    const [passwordFieldColor, setPasswordFieldColor] = React.useState('primary');


    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 0, minNumbers: 1, minSymbols: 1
        })) {
            setPasswordHelperText('Strong Password')
            setErrors({ ...errors, password: false })
            setPasswordFieldColor('success')
        }
        else {
            setPasswordHelperText('Type at least 8 characters, 1 number and 1 symbol (!, ?, #)')
            setErrors({ ...errors, password: true })
            setPasswordFieldColor('error')
        }
    }

    const [passwordValidationHelperText, setPasswordValidationHelperText] = React.useState('');
    const [passwordValidIsClicked, setPasswordValidIsClicked] = React.useState(false);
    const [passwordValidFieldColor, setPasswordValidFieldColor] = React.useState('primary');

    const passwordValidation = (value, password) => {
        if (password === value && passwordValidIsClicked) {
            setPasswordValidationHelperText('The passwords match!')
            setErrors({ ...errors, passwordValid: false })
            setPasswordValidFieldColor('success')
        }
        else if (password !== value && passwordValidIsClicked) {
            setPasswordValidationHelperText('The passwords are not the same!')
            setErrors({ ...errors, passwordValid: true })
            setPasswordValidFieldColor('error')
        }
    }




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

                        <Box component="form" noValidate onSubmit={() => { handleSubmit(); handleTransition(TransitionLeft); setSubmitClicked(true) }} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete="username"
                                        id="username"
                                        name="username"
                                        label="Username"
                                        error={errors.username}
                                        onChange={(e) => { handleFieldChange("username", e.target.value); usernameError(e.target.value) }}
                                        helperText={handleUsernameHelperText()}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="first-name"
                                        id="firstname"
                                        name="firstname"
                                        label="First Name"
                                        error={(data.firstname === "" && submitClicked)}
                                        onChange={(e) => handleFieldChange("firstname", e.target.value)}
                                        helperText={submitClicked && `Firstname is required`}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="last-name"
                                        id="lastname"
                                        name="lastname"
                                        label="Last Name"
                                        error={data.lastname === "" && submitClicked}
                                        onChange={(e) => handleFieldChange("lastname", e.target.value)}
                                        helperText={submitClicked && `Lastname is required`}
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
                                        error={errors.email}
                                        onChange={(e) => { handleFieldChange("email", e.target.value); emailError(e.target.value) }}
                                        helperText={handleEmailHelperText()}
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
                                        error={errors.phoneNumber && phoneNumberIsClicked}
                                        onChange={(e) => {
                                            handleFieldChange("phoneNumber", e.target.value);
                                            phoneNumberError(e.target.value)
                                        }}
                                        onClick={() => setPhoneNumberIsClicked(true)}
                                        helperText={phoneNumberIsClicked && phoneNumberHelperText()}
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
                                        color={passwordFieldColor}
                                        onChange={(e) => {
                                            handleFieldChange("password", e.target.value);
                                            validate(e.target.value);
                                            passwordValidation(e.target.value, data.passwordValid)
                                        }}
                                        helperText={passwordHelperText}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="password-validation"
                                        id="passwordValid"
                                        name="passwordValid"
                                        label="Confirm Password"
                                        type="password"
                                        color={passwordValidFieldColor}
                                        onChange={(e) => {
                                            handleFieldChange("passwordValid", e.target.value);
                                            passwordValidation(e.target.value, data.password)
                                        }}
                                        onClick={() => setPasswordValidIsClicked(true)}
                                        helperText={passwordValidationHelperText}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth color={submitClicked && data.role === "" && 'error'}>
                                        <InputLabel id="role">Role</InputLabel>
                                        <Select
                                            id="role"
                                            name='role'
                                            labelId="role"
                                            label="Role"
                                            onChange={(e) => { handleFieldChange("role", e.target.value) }}
                                            helperText={submitClicked && data.role === "" && "Role is required"}
                                        >
                                            <MenuItem value={'Host'}>Host</MenuItem>
                                            <MenuItem value={'Tenant'}>Tenant</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        sx={{ color: data.consent === '' && submitClicked && '#d32f2f' }}
                                        control={
                                            <Checkbox
                                                id="consent"
                                                name="consent"
                                                color={data.consent === '' && submitClicked ? '#d32f2f' : 'primary'}
                                                onChange={(e) => handleFieldChange("consent", e.target.checked)}
                                                sx={{ color: data.consent === '' && submitClicked && '#d32f2f' }}
                                            />}
                                        label="Accept Terms and Conditions"
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