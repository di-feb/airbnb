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
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator'

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

    const [alert, setAlert] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);
    const [signUp, setSignUp] = React.useState(false);

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





    // Post the data into the backend
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Set submitClicked to true when the submit button is clicked
        setSubmitClicked(true);

        if (!canSubmit)
            return;  // If there is an error dont submit

        try {
            await axios.post('http://localhost:5000/signup', {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
                role: data.role,
                consent: data.consent,
            });
            setSignUp(true);
        }
        catch (error) {
            console.error(error);
        }

    };

    // Controls the navigation
    const handleTransition = (Transition) => {
        if (signUp) {
            setTransition(() => Transition);
            setAlert(true);

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };


    // Holds the values of all the fiedls
    const [data, setData] = React.useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordValid: '',
        role: '',
        consent: '',
    });

    // Holds what field is in error state
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

    // Holds all the helper texts
    const [helperText, setHelperText] = React.useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordValid: '',
        role: '',
        consent: '',
    })

    // Holds if submit is clicked.
    const [submitClicked, setSubmitClicked] = React.useState(false)

    // Holds if submit should be able to be clicked.
    const [canSubmit, setCanSubmit] = React.useState(false);

    // Updates all fields values.  
    // Checks if submit is clickable and updates canSubmit.
    const handleFieldChange = (name, value, checked) => {
        setData((prev) => ({
            ...prev,
            [name]: name !== checked ? value : checked
        }));
        // Check if all fields are error-free and filled
        const areFieldsValid = Object.values(errors).every(error => error === false);
        const areFieldsFilled = Object.values(data).every(field => field !== '');
        setCanSubmit(areFieldsValid && areFieldsFilled);
    };

    const usernameError = (username) => {
        if ((username === '' && submitClicked)) {
            console.log('username')
            setErrors({ ...errors, username: true })
            setHelperText({ ...helperText, username: 'Username is required.' })
        }
        else if (username.length > 10) {
            setErrors({ ...errors, username: true })
            setHelperText({ ...helperText, username: 'Username must be smaller than 10 characters.' })
        }
        else {
            setErrors({ ...errors, username: false })
            setHelperText({ ...helperText, username: '' })
        }
    }

    const firstnameError = (firstname) => {
        if (firstname === '' && submitClicked) {
            setErrors({ ...errors, firstname: true })
            setHelperText({ ...helperText, firstname: 'Firstname is required.' })
        }
        else {
            setErrors({ ...errors, firstname: false })
            setHelperText({ ...helperText, firstname: '' })
        }
    }

    const lastnameError = (lastname) => {
        if (lastname === '' && submitClicked) {
            setErrors({ ...errors, lastname: true })
            setHelperText({ ...helperText, lastname: 'Lastname is required.' })
        }
        else {
            setErrors({ ...errors, lastname: false })
            setHelperText({ ...helperText, lastname: '' })
        }
    }

    const emailError = (email) => {
        const atIndex = email.indexOf('@');

        if (!email.length && submitClicked) {
            setErrors({ ...errors, email: true })
            setHelperText({ ...helperText, email: 'Email is required.' })
        }
        else if (atIndex === -1 && email.length) {
            setErrors({ ...errors, email: true })
            setHelperText({ ...helperText, email: 'Email must contain "@" character.' })
        }
        else if ((atIndex === 0 || atIndex === email.length - 1) && email.length) {
            setErrors({ ...errors, email: true })
            setHelperText({ ...helperText, email: 'Invalid email format.' })
        }
        else {
            setErrors({ ...errors, email: false })
            setHelperText({ ...helperText, email: '' })
        }
    }


    const [phoneNumberIsClicked, setPhoneNumberIsClicked] = React.useState(false)

    const phoneNumberError = (phoneNumber) => {
        if (phoneNumber.length !== 10 && phoneNumberIsClicked) {
            setErrors({ ...errors, phoneNumber: true })
            setHelperText({ ...helperText, phoneNumber: 'Phone Number must have 10 digits.' })
        }
        else {
            setErrors({ ...errors, phoneNumber: false })
            setHelperText({ ...helperText, phoneNumber: '' })
        }
    }

    const [passwordFieldColor, setPasswordFieldColor] = React.useState('primary');

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 0, minNumbers: 1, minSymbols: 1
        })) {
            setErrors({ ...errors, password: false })
            setHelperText({ ...helperText, password: 'Strong Password' })
            setPasswordFieldColor('success')
        }
        else {
            setErrors({ ...errors, password: true })
            setHelperText({ ...helperText, password: 'Type at least 8 characters, 1 number and 1 symbol (!, ?, #)' })
            setPasswordFieldColor('error')
        }
    }

    const [passwordValidIsClicked, setPasswordValidIsClicked] = React.useState(false);
    const [passwordValidFieldColor, setPasswordValidFieldColor] = React.useState('primary');

    const passwordValidation = (value, password) => {
        if (password === value && passwordValidIsClicked) {
            setErrors({ ...errors, passwordValid: false })
            setHelperText({ ...helperText, passwordValid: 'The passwords match!' })
            setPasswordValidFieldColor('success')
        }
        else if (password !== value && passwordValidIsClicked) {
            setErrors({ ...errors, passwordValid: true })
            setHelperText({ ...helperText, passwordValid: 'The passwords are not the same!' })
            setPasswordValidFieldColor('error')
        }
    }

    const roleError = (role) => {
        if (role === '' && submitClicked) {
            setErrors({ ...errors, role: true })
            setHelperText({ ...helperText, role: 'Role is required.' })
        }
        else {
            setErrors({ ...errors, role: false })
            setHelperText({ ...helperText, role: '' })
        }
    }

    const consentError = (consent) => {
        if (consent === '' && submitClicked) {
            setErrors({ ...errors, consent: true })
        }
        else {
            setErrors({ ...errors, consent: false })
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

                        <Box component="form" noValidate onSubmit={(e) => { handleSubmit(e); handleTransition(TransitionLeft); }} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoFocus
                                        autoComplete="username"
                                        id="username"
                                        name="username"
                                        value={data.username}
                                        label="Username"
                                        error={errors.username}
                                        onChange={(e) => {
                                            handleFieldChange("username", e.target.value);
                                            usernameError(e.target.value)
                                        }}
                                        helperText={helperText.username}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="first-name"
                                        id="firstname"
                                        name="firstname"
                                        value={data.firstname}
                                        label="First Name"
                                        error={(errors.firstname)}
                                        onChange={(e) => {
                                            handleFieldChange("firstname", e.target.value);
                                            firstnameError(e.target.value)
                                        }}
                                        helperText={helperText.firstname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="last-name"
                                        id="lastname"
                                        name="lastname"
                                        value={data.lastname}
                                        label="Last Name"
                                        error={errors.lastname}
                                        onChange={(e) => {
                                            handleFieldChange("lastname", e.target.value);
                                            lastnameError(e.target.value)
                                        }}
                                        helperText={helperText.lastname}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        label="Email Address"
                                        type='email'
                                        error={errors.email}
                                        onChange={(e) => {
                                            handleFieldChange("email", e.target.value);
                                            emailError(e.target.value)
                                        }}
                                        helperText={helperText.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="phoneNumber"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        label="Phone Number"
                                        type='number'
                                        inputProps={{
                                            pattern: "[0-9]*", // only allow numbers
                                            inputMode: "numeric", // show numeric keyboard on mobile devices
                                            min: 0
                                        }}
                                        error={errors.phoneNumber}
                                        onChange={(e) => {
                                            handleFieldChange("phoneNumber", e.target.value);
                                            phoneNumberError(e.target.value)
                                        }}
                                        onClick={() => setPhoneNumberIsClicked(true)}
                                        helperText={helperText.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="new-password"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        label="Password"
                                        type="password"
                                        color={passwordFieldColor}
                                        onChange={(e) => {
                                            handleFieldChange("password", e.target.value);
                                            validate(e.target.value);
                                            passwordValidation(e.target.value, data.passwordValid)
                                        }}
                                        helperText={helperText.password}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="password-validation"
                                        id="passwordValid"
                                        name="passwordValid"
                                        value={data.passwordValid}
                                        label="Confirm Password"
                                        type="password"
                                        color={passwordValidFieldColor}
                                        onChange={(e) => {
                                            handleFieldChange("passwordValid", e.target.value);
                                            passwordValidation(e.target.value, data.password)
                                        }}
                                        onClick={() => setPasswordValidIsClicked(true)}
                                        helperText={helperText.passwordValid}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth color={errors.role ? 'error' : 'primary'}>
                                        <InputLabel id="role">Role</InputLabel>
                                        <Select
                                            id="role"
                                            name='role'
                                            value={data.role}
                                            labelId="role"
                                            label="Role"
                                            onChange={(e) => {
                                                handleFieldChange("role", e.target.value);
                                                roleError(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={'Host'}>Host</MenuItem>
                                            <MenuItem value={'Tenant'}>Tenant</MenuItem>
                                        </Select>
                                        <FormHelperText>{helperText.role}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        sx={{ color: errors.consent && '#d32f2f' }}
                                        control={
                                            <Checkbox
                                                id="consent"
                                                name="consent"
                                                value={data.consent}
                                                color={errors.consent ? '#d32f2f' : 'primary'}
                                                onChange={(e) => {
                                                    handleFieldChange("consent", e.target.checked);
                                                    consentError(e.target.checked)
                                                }}
                                                sx={{ color: errors.consent && '#d32f2f' }}
                                            />}
                                        label="Accept Terms and Conditions"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                // disabled={!canSubmit}
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