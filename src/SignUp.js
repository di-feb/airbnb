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
import CollectionsIcon from '@mui/icons-material/Collections';
import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';


const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate();

    const [alert, setAlert] = React.useState(false);
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
        profilePicture: null,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordValid: '',
        role: '',
        consent: false,
    });

    // Holds what field is in error state
    const [errors, setErrors] = React.useState({
        profilePicture: false,
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
        profilePicture: '',
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        consent: '',
    })

    const [approvalMessage, setApprovalMessage] = React.useState(false);

    // Post the data into the backend
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log(checkForm())
        if (!checkForm())
            return;  // If there is an error dont submit

        // Create a FormData object
        const formData = new FormData();
        formData.append('profilePicture', data.profilePicture);
        formData.append('username', data.username);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append('consent', data.consent);

        try {
            const response = await axios.post('https://localhost:8080/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
            });
            if (response.status === 200 && (data.role=== 'Host' || data.role === 'Host_Tenant'))
                setApprovalMessage((prev) => (!prev))
            else
                handleTransition(TransitionLeft)

        } catch (error) {
            if (error.response.status === 400) {
                usernameError(data.username, true, true)
            }
        }
    };


    const [imagePreview, setImagePreview] = React.useState(null);

    const handleFileUpload = async (event) => {

        let file = event.target.files[0];
        if (file === null) return;

        setData({ ...data, profilePicture: file });
        setImagePreview(URL.createObjectURL(file));
    }

    const checkForm = () => {
        // Check if all fields are error-free and filled
        const areFieldsValid = Object.values(errors).every(error => error === false);
        const areFieldsFilled =
            data.profilePicture !== null &&
            data.username !== '' &&
            data.firstname !== '' &&
            data.lastname !== '' &&
            data.email !== '' &&
            data.phoneNumber !== '' &&
            data.password !== '' &&
            data.passwordValid !== '' &&
            data.role !== '' &&
            data.consent;

        return areFieldsValid && areFieldsFilled;
    }

    // Controls the navigation
    const handleTransition = (Transition) => {
        setTransition(() => Transition);
        setAlert(true);

        setTimeout(() => {
            navigate('/login');
        }, 6000);
    };


    // Updates all fields values.  
    // Checks if submit is clickable and updates canSubmit.
    const handleFieldChange = (event) => {
        const { name, value, checked } = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name]: name === "consent" ? checked : value
            }
        })
    }

    const profilePictureError = (profilePicture, submitClicked) => {
        if (profilePicture === null && submitClicked) {
            setErrors((prev) => ({ ...prev, profilePicture: true }))
            setHelperText((prev) => ({ ...prev, profilePicture: 'Profile picture is required.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, profilePicture: false }))
            setHelperText((prev) => ({ ...prev, profilePicture: '' }))
        }

    }


    const usernameError = (username, submitClicked, usernameExists) => {
        if (username === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, username: true }))
            setHelperText((prev) => ({ ...prev, username: 'Username is required.' }))
        }
        else if (username.length > 10) {
            setErrors((prev) => ({ ...prev, username: true }))
            setHelperText((prev) => ({ ...prev, username: 'Username must be smaller than 10 characters.' }))
        }
        else if (usernameExists && submitClicked) {
            setErrors((prev) => ({ ...prev, username: true }))
            setHelperText((prev) => ({ ...prev, username: 'Username already exists. Try another one.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, username: false }))
            setHelperText((prev) => ({ ...prev, username: '' }))
        }
    }

    const firstnameError = (firstname, submitClicked) => {
        if (firstname === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, firstname: true }))
            setHelperText((prev) => ({ ...prev, firstname: 'Firstname is required.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, firstname: false }))
            setHelperText((prev) => ({ ...prev, firstname: '' }))
        }
    }

    const lastnameError = (lastname, submitClicked) => {
        if (lastname === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, lastname: true }))
            setHelperText((prev) => ({ ...prev, lastname: 'Lastname is required.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, lastname: false }))
            setHelperText((prev) => ({ ...prev, lastname: '' }))
        }
    }

    const emailError = (email, submitClicked) => {
        const atIndex = email.indexOf('@');

        if (!email.length && submitClicked) {
            setErrors((prev) => ({ ...prev, email: true }))
            setHelperText((prev) => ({ ...prev, email: 'Email is required.' }))
        }
        else if (atIndex === -1 && email.length) {
            setErrors((prev) => ({ ...prev, email: true }))
            setHelperText((prev) => ({ ...prev, email: 'Email must contain "@" character.' }))
        }
        else if ((atIndex === 0 || atIndex === email.length - 1) && email.length) {
            setErrors((prev) => ({ ...prev, email: true }))
            setHelperText((prev) => ({ ...prev, email: 'Invalid email format.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, email: false }))
            setHelperText((prev) => ({ ...prev, email: '' }))
        }
    }


    const [phoneNumberIsClicked, setPhoneNumberIsClicked] = React.useState(false)

    const phoneNumberError = (phoneNumber, submitClicked) => {
        if (phoneNumber.length !== 10 && phoneNumberIsClicked) {
            setErrors((prev) => ({ ...prev, phoneNumber: true }))
            setHelperText((prev) => ({ ...prev, phoneNumber: 'Phone Number must have 10 digits.' }))
        }
        else if (phoneNumber === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, phoneNumber: true }))
            setHelperText((prev) => ({ ...prev, phoneNumber: 'Phone Number is required.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, phoneNumber: false }))
            setHelperText((prev) => ({ ...prev, phoneNumber: '' }))
        }
    }

    const [passwordFieldColor, setPasswordFieldColor] = React.useState('primary');

    const validate = (value, submitClicked) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 0, minNumbers: 1, minSymbols: 1
        })) {
            setErrors((prev) => ({ ...prev, password: false }))
            setHelperText((prev) => ({ ...prev, password: 'Strong Password' }))
            setPasswordFieldColor('success')
        }
        else if (value === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, password: true }))
            setHelperText((prev) => ({ ...prev, password: 'Password is required' }))
            setPasswordFieldColor('error')
        }
        else {
            setErrors((prev) => ({ ...prev, password: true }))
            setHelperText((prev) => ({ ...prev, password: 'Type at least 8 characters, 1 number and 1 symbol (!, ?, #)' }))
            setPasswordFieldColor('error')
        }
    }

    const [passwordValidIsClicked, setPasswordValidIsClicked] = React.useState(false);
    const [passwordValidFieldColor, setPasswordValidFieldColor] = React.useState('primary');
    const [passwordValidHelperText, setPasswordValidHelperText] = React.useState('');

    const passwordValidation = (value, password, submitClicked) => {
        if (password === value && passwordValidIsClicked) {
            setErrors((prev) => ({ ...prev, passwordValid: false }))
            setPasswordValidHelperText('The passwords match!')
            setPasswordValidFieldColor('success')
        }
        else if (value === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, passwordValid: true }))
            setPasswordValidHelperText('The password validation field is required.')
            setPasswordValidFieldColor('error')
        }
        else if (password !== value && password !== '') {
            setErrors((prev) => ({ ...prev, passwordValid: true }))
            setPasswordValidHelperText('The passwords are not the same!')
            setPasswordValidFieldColor('error')
        }
    }

    const roleError = (role, submitClicked) => {
        if (role === '' && submitClicked) {
            setErrors((prev) => ({ ...prev, role: true }))
            setHelperText((prev) => ({ ...prev, role: 'Role is required.' }))
        }
        else {
            setErrors((prev) => ({ ...prev, role: false }))
            setHelperText((prev) => ({ ...prev, role: '' }))
        }
    }

    const consentError = (consent, submitClicked) => {
        if (consent === false && submitClicked) {
            setErrors((prev) => ({ ...prev, consent: true }))
        }
        else {
            setErrors((prev) => ({ ...prev, consent: false }))
        }
    }

    const fileInputRef = React.useRef(null);

    function showProfilePicture() {
        // Open the image in a new window or popup
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            // Set the content of the new window to display the image
            newWindow.document.write(`
            <html>
                <head>
                <title>Profile Picture</title>
                <style>
                    body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    }
                    img {
                    max-width: 100%;
                    max-height: 100%;
                    }
                </style>
                </head>
                <body>
                <img src="${imagePreview}" alt="Profile Picture" />
                </body> 
            </html>
          `);
        } else {
            // Handle the case where popups are blocked
            alert('Please allow pop-ups to view the profile picture.');
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




                        <Box
                            component="form"
                            encType="multipart/form-data"
                            noValidate
                            onSubmit=
                            {(e) => {
                                handleSubmit(e);
                                profilePictureError(data.profilePicture, true)
                                usernameError(data.username, true, false);
                                firstnameError(data.firstname, true);
                                lastnameError(data.lastname, true);
                                emailError(data.email, true);
                                phoneNumberError(data.phoneNumber, true);
                                validate(data.password, true);
                                passwordValidation(data.passwordValid, data.password, true);
                                roleError(data.role, true);
                                consentError(data.consent, true);

                            }}
                            sx={{ mt: 3 }}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg"
                                name="profilePicture"
                                id="profilePicture"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                multiple
                            />

                            <Grid container spacing={2}>
                                {data.profilePicture === null &&
                                    <Grid item container justifyContent="center" alignItems="center" textAlign='center'>
                                        <Box display='flex' flexDirection='column' alignItems='center'>
                                            <Avatar
                                                alt="Profile picture avatar"
                                                src={require("./images/avatar.png")}
                                                sx={{
                                                    width: '120px',
                                                    height: '120px',
                                                    mt: 5
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                endIcon={<PhotoCamera />}
                                                size='small'
                                                color={errors.profilePicture ? "error" : "info"}
                                                onClick={() => fileInputRef.current.click()}
                                                sx={{

                                                    mt: '-12px',
                                                    textTransform: 'none'
                                                }}

                                            >
                                                Add Picture
                                            </Button>

                                            {errors.profilePicture &&
                                                <FormHelperText error={true}>
                                                    {helperText.profilePicture}
                                                </FormHelperText>
                                            }
                                        </Box>
                                    </Grid>
                                }

                                {data.profilePicture !== null &&
                                    <Grid item container justifyContent="center" alignItems="center" direction='column' >
                                        <Avatar
                                            alt="Profile picture"
                                            src={imagePreview}
                                            sx={{
                                                width: '120px',
                                                height: '120px',
                                                mb: 3
                                            }}
                                        >
                                        </Avatar>
                                        <Box
                                            display='flex'
                                            flexDirection='row'
                                            alignItems='center'
                                            justifyContent='space-around'
                                            spacing='2'
                                            width='300px'

                                        >
                                            <Button
                                                variant="contained"
                                                endIcon={<PhotoCamera />}
                                                size='small'
                                                color="info"
                                                onClick={() => fileInputRef.current.click()}
                                                sx={{

                                                    mt: '-12px',
                                                    textTransform: 'none'
                                                }}

                                            >
                                                Change picture
                                            </Button>
                                            <Button
                                                variant="contained"
                                                endIcon={<CollectionsIcon />}
                                                size='small'
                                                color="info"
                                                onClick={() => showProfilePicture()}
                                                sx={{

                                                    mt: '-12px',
                                                    textTransform: 'none'
                                                }}

                                            >
                                                See your picture
                                            </Button>
                                        </Box>
                                    </Grid>
                                }
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
                                            handleFieldChange(e);
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
                                            handleFieldChange(e);
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
                                            handleFieldChange(e);
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
                                            handleFieldChange(e);
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
                                            handleFieldChange(e);
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
                                        error={errors.password}
                                        color={passwordFieldColor}
                                        onChange={(e) => {
                                            handleFieldChange(e);
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
                                        error={errors.passwordValid}
                                        color={passwordValidFieldColor}
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                            passwordValidation(e.target.value, data.password)
                                        }}
                                        onClick={() => setPasswordValidIsClicked(true)}
                                        helperText={passwordValidHelperText}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={errors.role} >
                                        <InputLabel id="role">Role</InputLabel>
                                        <Select
                                            id="role"
                                            name='role'
                                            value={data.role}
                                            labelId="role"
                                            label="Role"
                                            onChange={(e) => {
                                                handleFieldChange(e);
                                                roleError(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={'Host'}>Host</MenuItem>
                                            <MenuItem value={'Tenant'}>Tenant</MenuItem>
                                            <MenuItem value={'Host_Tenant'}>Host & Tenant</MenuItem>
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
                                                checked={data.consent}
                                                color={errors.consent ? 'error' : 'primary'}
                                                onChange={(e) => {
                                                    handleFieldChange(e);
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

            <Dialog open={approvalMessage} >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >Pending approval by administrator</DialogTitle>
                <Divider variant="middle" sx={{ borderColor: '#979797', mt: 0.3 }} />
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography textAlign='center' fontSize={16} width='200px'>
                        Pending approval of your registration
                        with the role of host by the administrator.
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={(prev) => { setApprovalMessage(!prev); handleTransition(TransitionLeft); }}
                        size='small'
                        color='info'
                        sx={{ textTransform: 'none', mt: 2 }}
                    >
                        Ok I got it!
                    </Button>
                </DialogContent>
            </Dialog>

        </div >
    );
}