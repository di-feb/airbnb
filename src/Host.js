import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Divider, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import "./css/style.css";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios';

dayjs.extend(duration);


export default function Host() {

    const initialLocation = '';
    const initialCoordinates = [51.505, -0.09]; // Default coordinates for the map
    const pin = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';

    const pinMB = L.icon({
        iconUrl: pin,
        iconSize: [24, 41],
        iconAnchor: [0, 44],
        popupAnchor: [12, -40],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const [location, setLocation] = React.useState(initialLocation);
    const [coordinates, setCoordinates] = React.useState(initialCoordinates);
    const [center, setCenter] = React.useState(initialCoordinates);


    // const handleSearch = async () => {
    //     try {

    //         const provider = new Geocoder({
    //             provider: 'openstreetmap',
    //             apiKey: 'AIzaSyAFxUYSNiDFXuakM1aPwbG-JIm6DLjd5kM', 
    //             formatter: null
    //         });

    //         console.log(location);
    //         console.log(provider);
    //         const results = await provider.geocode(location);
    //         if (results.length > 0) {
    //             const { latitude: lat, longitude: lng } = results[0];
    //             console.log("hi");
    //             setCoordinates([lat, lng]);
    //             setCenter([lat, lng]);
    //             console.log(center);
    //         } else {
    //             console.log('No results found');
    //         }
    //     } catch (error) {
    //         console.log('Error:', error);
    //     }
    // };


    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
    };

    const now = new Date(Date.now());
    const today = dayjs(new Date().toString());
    const nextMonth = dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 1));

    // Updates all fields values.  
    // Checks if submit is clickable and updates canSubmit.
    const handleFieldChange = (event) => {
        const { name, value, checked } = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name]: name === "isSmokingAllowed" ? checked : value
            }
        })
    }

    const [data, setData] = React.useState({
        location: '',
        checkIn: null,
        checkOut: null,
        checkInTime: null,
        checkOutTime: null,
        maxPeople: '',
        minPrice: '',
        additionalCost: '',
        typeOfSpace: '',
        spaceArea: '',
        numOfBedrooms: '',
        numOfBathrooms: '',
        numOfBeds: '',
        numOfLivingrooms: '',
        description: '',
        numOfGuests: '',
        numOfPets: '',
        isSmokingAllowed: false,
        pictures: []

    })

    const [errors, setErrors] = React.useState({
        location: false,
        checkIn: false,
        checkOut: false,
        checkInTime: false,
        checkOutTime: false,
        maxPeople: false,
        minPrice: false,
        additionalCost: false,
        typeOfSpace: false,
        spaceArea: false,
        numOfBedrooms: false,
        numOfBathrooms: false,
        numOfBeds: false,
        numOfLivingrooms: false,
        description: false,
        numOfGuests: false,
        numOfPets: false,
        isSmokingAllowed: false,
        pictures: false

    })

    const helperText = "This field is required."


    const checkForm = () => {
        // Check if all fields are filled 
        return Object.values(errors).every(error => error === false);
    }

    // Post the data into the backend
    const handleSubmit = async (event, submitClicked) => {
        event.preventDefault(); // Prevent the default form submission

        if (submitClicked) {
            Object.keys(data).forEach((fieldName) => {
                handleFieldError(fieldName, data[fieldName]);
            });
        }
        console.log(errors)

        console.log(checkForm())
        if (!checkForm())
            return;  // If there is an error dont submit

        // Create a FormData object
        const formData = new FormData();
        // Append each field to the FormData object
        formData.append('location', data.location);
        formData.append('checkIn', data.checkIn);
        formData.append('checkOut', data.checkOut);
        formData.append('checkInTime', data.checkInTime);
        formData.append('checkOutTime', data.checkOutTime);
        formData.append('maxPeople', data.maxPeople);
        formData.append('minPrice', data.minPrice);
        formData.append('additionalCost', data.additionalCost);
        formData.append('typeOfSpace', data.typeOfSpace);
        formData.append('spaceArea', data.spaceArea);
        formData.append('numOfBedrooms', data.numOfBedrooms);
        formData.append('numOfBathrooms', data.numOfBathrooms);
        formData.append('numOfBeds', data.numOfBeds);
        formData.append('numOfLivingrooms', data.numOfLivingrooms);
        formData.append('description', data.description);
        formData.append('numOfGuest', data.numOfGuest);
        formData.append('numOfPets', data.numOfPets);
        formData.append('isSmokingAllowed', data.isSmokingAllowed);

        // For the 'pictures' field, we append each file separately
        data.pictures.forEach((file, index) => {
            formData.append(`pictures[${index}]`, file);
        });

        try {
            const response = await axios.post('https://localhost:8080/host', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type
                },
            });
            if (response.status === 200)
                handleTransition(TransitionLeft)

        } catch (error) {
            console.log(error)
        }
    };

    const handleFieldError = (fieldName, value) => {
        if (value === '' || value === null || value === false || value.length === 0) {
            setErrors((prev) => ({ ...prev, [fieldName]: true }));
        } else {
            setErrors((prev) => ({ ...prev, [fieldName]: false }));
        }
    };



    const navigate = useNavigate();

    const [alert, setAlert] = React.useState(false);

    const handleAlert = (reason) => {
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
        setTransition(() => Transition);
        setAlert(true);

        setTimeout(() => {
            navigate('/hostHome');
        }, 5000); // 5000 milliseconds = 5 seconds
    };



    const fileInputRef = React.useRef(null);

    const [imagePreview, setImagePreview] = React.useState([]);

    function srcset(image, size) {

        return {
            src: `${image}?w=${size}&h=${size}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size}&h=${size}&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        setData((prevData) => ({
            ...prevData,
            pictures: [...prevData.pictures, ...Array.from(files)],
        }));
        setImagePreview((prevData) => [...prevData, ...Array.from(URL.createObjectURL(files))]);
        event.target.value = null;
    };

    const [openList, setOpenList] = React.useState(false);

    const handleDeletePicture = (index) => {
        // Remove the picture from the pictures list using its index
        setData((prevPictures) => {
            const updatedPictures = [...prevPictures.pictures];
            updatedPictures.splice(index, 1);
            return updatedPictures;
        });
    };



    return (
        <>

            <AppBar sx={{ backgroundColor: 'white' }} position="static">
                <Container maxWidth="xxl">
                    <Toolbar sx={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center' }}>

                        {/* Logo */}
                        <Logo position={"center"} />

                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 7, alignItems: 'center' }}>
                <Typography fontSize={25} fontWeight={600} sx={{ color: '#191919', mb: 2 }}>
                    Welcome, Stathis!
                </Typography>
                <Typography fontSize={14} fontWeight={600} sx={{ color: '#979797', mb: 3 }}>
                    Let's manage the space offered for rent.
                </Typography>

                <MapContainer
                    center={center}
                    zoom={13}
                    style={{
                        width: '1000px',
                        height: '400px',
                        marginTop: '10px',
                        borderRadius: '15px',
                    }}

                >

                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={coordinates} icon={pinMB} draggable={true} eventHandlers={{ dragend: (e) => handleLocationChange(e.target.getLatLng()) }}>
                        <Popup>
                            My place!
                        </Popup>
                    </Marker>
                    <TextField
                        name="location"
                        placeholder="Search for your location..."
                        size="small"
                        value={data.location}
                        onChange={(e) => handleFieldChange(e)}
                        error={errors.location && data.location === ''}

                        sx={{
                            position: "absolute",
                            top: "30px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 1000,
                            width: '600px',
                            bgcolor: "white",
                            borderRadius: '30px'

                        }}
                        InputProps={{
                            sx: { borderRadius: "30px" },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton > {/* onClick({()=> handleSearch}) */}
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            // onKeyDown: (e) => {
                            //     if (e.key === "Enter") {
                            //         handleSearch();
                            //     }
                            // }
                        }}
                    />
                    <Typography
                        color={'#d32f2f'}
                        fontWeight={800}
                        sx={{
                            zIndex: 1000,
                            position: "absolute",
                            top: "80px",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                    >
                        {errors.location && data.location === '' && helperText}
                    </Typography>
                </MapContainer>


                <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4 }}>
                    Please fill the following fields.
                </Typography>
                <Container component="main" maxWidth="xs" >
                    <Box
                        component="form"
                        encType="multipart/form-data"
                        noValidate
                        sx={{
                            mt: 2,
                            mb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Grid container spacing={2} sx={{ width: '500px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid item xs={6}>
                                    <MobileDatePicker
                                        required
                                        label="From"
                                        value={data.checkIn}
                                        onChange={(newValue) => setData({ ...data, checkIn: newValue })}
                                        minDate={today}
                                        formatDensity="dense"
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: 'outlined',
                                                error: errors.checkIn && data.checkIn === null,
                                                helperText: errors.checkIn && data.checkIn === null && helperText
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MobileDatePicker
                                        required
                                        label="To"
                                        value={data.checkOut}
                                        onChange={(newValue) => setData({ ...data, checkOut: newValue })}
                                        minDate={today}
                                        formatDensity="dense"
                                        sx={{
                                            ml: 3
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: 'outlined',
                                                error: errors.checkOut && data.checkOut === null,
                                                helperText: errors.checkOut && data.checkOut === null && helperText
                                            },
                                        }}

                                    />
                                </Grid>
                            </LocalizationProvider>

                            <FormHelperText id="component-helper-text" sx={{ ml: 2 }}>
                                Dates on which the venue is
                                available for rent within the year.
                            </FormHelperText>

                            <Grid item xs={12}>
                                <TextField
                                    type='number'
                                    value={data.maxPeople}
                                    required
                                    fullWidth
                                    id="maxPeople"
                                    name="maxPeople"
                                    label="Maximum number of Peοple"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                        max: 16
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.maxPeople && data.maxPeople === ''}
                                    helperText={errors.maxPeople && data.maxPeople === '' && helperText}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.minPrice}
                                    required
                                    fullWidth
                                    id="minPrice"
                                    name="minPrice"
                                    label="Minimun Price"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.minPrice && data.minPrice === ''}
                                    helperText={errors.minPrice && data.minPrice === '' && helperText}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.additionalCost}
                                    required
                                    fullWidth
                                    id="additionalCost"
                                    label="Αdditional cost per person"
                                    name="additionalCost"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.additionalCost && data.additionalCost === ''}
                                    helperText={errors.additionalCost && data.additionalCost === '' && helperText}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="typeOfSpaceLabel">Type of rental space</InputLabel>
                                    <Select
                                        labelId="typeOfSpaceLabel"
                                        id="typeOfSpace"
                                        name="typeOfSpace"
                                        value={data.typeOfSpace}
                                        label="Type of rental space"
                                        onChange={(e) => {
                                            handleFieldChange(e);
                                        }}
                                        error={errors.typeOfSpace && data.typeOfSpace === ''}
                                    >
                                        <MenuItem value={'privateRoom'}>Private Room</MenuItem>
                                        <MenuItem value={'sharedRoom'}>Shared Room</MenuItem>
                                        <MenuItem value={'entireResidence'}>Entire Residence</MenuItem>
                                    </Select>
                                    <FormHelperText sx={{ color: '#d32f2f' }}>{errors.typeOfSpace && data.typeOfSpace === '' && helperText}</FormHelperText>
                                </FormControl>



                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='number'
                                    value={data.spaceArea}
                                    required
                                    fullWidth
                                    id="spaceArea"
                                    label="Space Area"
                                    name="spaceArea"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.spaceArea && data.spaceArea === ''}
                                    helperText={errors.spaceArea && data.spaceArea === '' && helperText}
                                />
                            </Grid>
                            <FormHelperText id="component-helper-text" sx={{ ml: 2 }}>
                                Insert the number of space area in square meters.
                            </FormHelperText>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.numOfBedrooms}
                                    required
                                    fullWidth
                                    id="numOfBedrooms"
                                    label="Number of Bedrooms"
                                    name="numOfBedrooms"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.numOfBedrooms && data.numOfBedrooms === ''}
                                    helperText={errors.numOfBedrooms && data.numOfBedrooms === '' && helperText}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.numOfBathrooms}
                                    required
                                    fullWidth
                                    id="numOfBathrooms"
                                    label="Number of Bathrooms"
                                    name="numOfBathrooms"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.numOfBathrooms && data.numOfBathrooms === ''}
                                    helperText={errors.numOfBathrooms && data.numOfBathrooms === '' && helperText}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.numOfBeds}
                                    required
                                    fullWidth
                                    id="numOfBeds"
                                    label="Number of Beds"
                                    name="numOfBeds"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.numOfBeds && data.numOfBeds === ''}
                                    helperText={errors.numOfBeds && data.numOfBeds === '' && helperText}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.numOfLivingrooms}
                                    required
                                    fullWidth
                                    id="numOfLivingrooms"
                                    label="Number of Living Rooms"
                                    name="numOfLivingrooms"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.numOfLivingrooms && data.numOfLivingrooms === ''}
                                    helperText={errors.numOfLivingrooms && data.numOfLivingrooms === '' && helperText}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4 }}>
                            Give us detailed a description of your space.
                        </Typography>

                        <TextField
                            id="description"
                            name="description"
                            multiline
                            minRows={4}
                            value={data.description}
                            onChange={(e) => {
                                handleFieldChange(e);
                            }}
                            error={errors.description && data.description === ''}
                            helperText={errors.description && data.description === '' && helperText}
                            sx={{
                                width: '480px',
                                mt: 1,
                                mb: 2.5,
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'black',
                                },

                            }}
                        />

                        <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4, mb: 2.5 }}>
                            Rental rules.
                        </Typography>
                        <Grid container spacing={2} sx={{ width: '500px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid item xs={6}>
                                    <MobileTimePicker
                                        label="Check In time"
                                        value={data.checkInTime}
                                        onChange={(newValue) => setData({ ...data, checkInTime: newValue })}
                                        formatDensity="dense"
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: 'outlined',
                                                error: errors.checkInTime && data.checkInTime === null,
                                                helperText: errors.checkInTime && data.checkInTime === null && helperText

                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MobileTimePicker
                                        label="Check Out time"
                                        value={data.checkOutTime}
                                        onChange={(newValue) => setData({ ...data, checkOutTime: newValue })}

                                        formatDensity="dense"
                                        sx={{ ml: 3, color: 'black' }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                variant: 'outlined',
                                                error: errors.checkOutTime && data.checkOutTime === null,
                                                helperText: errors.checkOutTime && data.checkOutTime === null && helperText
                                            },
                                        }}
                                    />
                                </Grid>
                                <FormHelperText id="component-helper-text" sx={{ ml: 2 }}>
                                    Time by which guests must have arrived at the accommodation
                                    the day of the check in and time by which guest must have left
                                    from the accommodation the day of the check out.
                                </FormHelperText>
                            </LocalizationProvider>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.numOfGuests}
                                    required
                                    fullWidth
                                    id="numOfGuests"
                                    label="Number of Guests Allowed"
                                    name="numOfGuests"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 1,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.numOfGuests && data.numOfGuests === ''}
                                    helperText={errors.numOfGuests && data.numOfGuests === '' && helperText}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    value={data.numOfPets}
                                    required
                                    fullWidth
                                    id="numOfPets"
                                    label="Number of Pets Allowed"
                                    name="numOfPets"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                    }}
                                    error={errors.numOfPets && data.numOfPets === ''}
                                    helperText={errors.numOfPets && data.numOfPets === '' && helperText}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Is smoking inside allowed?"
                                    sx={{ color: errors.isSmokingAllowed && !data.isSmokingAllowed && '#d32f2f' }}
                                    control={
                                        <Checkbox
                                            id="isSmokingAllowed"
                                            name="isSmokingAllowed"
                                            checked={data.isSmokingAllowed}
                                            onChange={(e) => {
                                                handleFieldChange(e);
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{ color: errors.isSmokingAllowed && !data.isSmokingAllowed && '#d32f2f' }}
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4, mb: 2.5 }}>
                            Last but not least, add some pictures of your space.
                        </Typography>
                        {

                            data.pictures.length > 0 &&
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ImageList
                                    sx={{ width: 500, height: 111, borderRadius: '15px' }}
                                    variant="quilted"
                                    cols={4}
                                    rowHeight={111}
                                >
                                    {imagePreview.map((item) => (
                                        <ImageListItem key={item}>
                                            <img
                                                alt="home images"
                                                {...srcset(item, 401, item.webkitRelativePath)}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </Box>


                        }
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="upload-photo"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            multiple
                        />
                        {
                            data.pictures.length === 0 &&
                            <Button
                                variant='contained'
                                color={data.pictures.length === 0 && errors.pictures ? 'error' : 'inherit'}
                                endIcon={<PhotoCamera />}
                                sx={{ textTransform: 'none' }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                Add some pictures
                            </Button>
                        }
                        <Typography color='#d32f2f' sx={{ mt: 2 }}>
                            {data.pictures.length === 0 && errors.pictures && "You need to add pictures of your place."}
                        </Typography>
                        {
                            data.pictures.length > 0 &&
                            <Grid container spacing={2} sx={{ width: '400px' }}>
                                <Grid item xs={6}>
                                    <Button
                                        variant='contained'
                                        color='inherit'
                                        endIcon={<PhotoCamera />}
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        Add some pictures
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant='contained'
                                        color='error'
                                        endIcon={<DeleteIcon />}
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => setOpenList(true)}
                                    >
                                        Delete pictures
                                    </Button>

                                </Grid>
                            </Grid>

                        }
                        {
                            openList &&

                            <Dialog open={openList} onClose={() => setOpenList(false)}>
                                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >Picture List</DialogTitle>
                                <Divider variant="middle" sx={{ borderColor: '#979797', mt: 0.3 }} />
                                <DialogContent>
                                    <List>
                                        {data.pictures.map((picture, index) => (
                                            <ListItem key={index}>
                                                {/* Display the picture */}
                                                <ListItemAvatar>
                                                    <Avatar src={URL.createObjectURL(picture)} alt={`Picture ${index + 1}`} />
                                                </ListItemAvatar>

                                                {/* Display the name of the picture */}
                                                <ListItemText primary={picture.name} />

                                                {/* Delete button */}
                                                <IconButton onClick={() => handleDeletePicture(index)}>
                                                    <DeleteIcon sx={{
                                                        '&:hover': {
                                                            color: 'black',
                                                        },
                                                    }} />
                                                </IconButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                            </Dialog>
                        }

                        <Button
                            type="file"
                            variant='contained'
                            onClick={(e) => { handleSubmit(e, true) }}
                            sx={{
                                textTransform: 'none',
                                backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',
                                mt: 4
                            }}
                        >
                            Sumbit!
                        </Button>
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
                </Container >
            </Box >
        </>
    )
}