import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Divider, TextField, Typography } from "@mui/material";
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


    const [date, setDate] = React.useState({
        checkIn: today,
        checkOut: nextMonth,
        checkInTime: null,
        checkOutTime: null,
    });

    function diffInDays(date1, date2) {
        const duration = dayjs.duration(date2.diff(date1));
        return duration.asDays();
    }

    const duration = Math.trunc(diffInDays(date.checkIn, date.checkOut))


    const [typeOfSpace, setTypeOfSpace] = React.useState('');

    const [question, setQuestion] = React.useState('');

    const [checked, setChecked] = React.useState(false);

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
        setTransition(() => Transition);
        setAlert(true);

        setTimeout(() => {
            navigate('/hostHome');
        }, 5000); // 5000 milliseconds = 5 seconds
    };



    const fileInputRef = React.useRef(null);

    const [fileList, setFileList] = React.useState([]);

    function srcset(image, size, path) {
        const imageSrc = require(`/mnt/c/Users/Stath/OneDrive/Εικόνες/Programming pics/${image}`)

        return {
            src: `${imageSrc}?w=${size}&h=${size}&fit=crop&auto=format`,
            srcSet: `${imageSrc}?w=${size}&h=${size}&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        setFileList((prevFileList) => [...prevFileList, ...Array.from(files)]);
        event.target.value = null;
    };

    const [openList, setOpenList] = React.useState(false);

    const handleDeletePicture = (index) => {
        // Remove the picture from the pictures list using its index
        setFileList((prevPictures) => {
            const updatedPictures = [...prevPictures];
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
                        name="Location"
                        placeholder="Search for your location..."
                        size="small"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                    >
                    </TextField>
                </MapContainer>


                <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4 }}>
                    Please fill the following fields.
                </Typography>
                <Container component="main" maxWidth="xs" >
                    <Box
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
                                        value={date.checkIn}
                                        onChange={(newValue) => setDate({ ...date, checkIn: newValue })}
                                        minDate={today}
                                        formatDensity="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MobileDatePicker
                                        required
                                        label="To"
                                        value={date.checkOut}
                                        onChange={(newValue) => setDate({ ...date, checkOut: newValue })}
                                        minDate={today}
                                        formatDensity="dense"
                                        sx={{ ml: 3 }}
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
                                    required
                                    fullWidth
                                    id="maxNumberofPeople"
                                    label="Maximum number of Peοple"
                                    name="maxNumberofPeople"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                        max: 16
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    required
                                    fullWidth
                                    id="minPrice"
                                    label="Minimun Price"
                                    name="minPrice"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="typeOfSpaceLabel">Type of rental space</InputLabel>
                                    <Select
                                        labelId="typeOfSpaceLabel"
                                        id="typeOfSpace"
                                        name="typeOfSpace"
                                        value={typeOfSpace}
                                        label="Type of rental space"
                                        onChange={(event) => {
                                            setTypeOfSpace(event.target.value);
                                        }}
                                    >
                                        <MenuItem value={'privateRoom'}>Private Room</MenuItem>
                                        <MenuItem value={'sharedRoom'}>Shared Room</MenuItem>
                                        <MenuItem value={'entireResidence'}>Entire Residence</MenuItem>
                                    </Select>
                                </FormControl>



                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='number'
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
                                />
                            </Grid>
                            <FormHelperText id="component-helper-text" sx={{ ml: 2 }}>
                                Insert the number of space area in square meters.
                            </FormHelperText>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
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
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
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
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
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
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
                                    required
                                    fullWidth
                                    id="numOfLivingRooms"
                                    label="Number of Living Rooms"
                                    name="numOfLivingRooms"
                                    inputProps={{
                                        pattern: "[0-9]*", // only allow numbers
                                        inputMode: "numeric", // show numeric keyboard on mobile devices
                                        min: 0,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4 }}>
                            Give us detailed a description of your space.
                        </Typography>

                        <TextField
                            id="Desc"
                            name="Desc"
                            multiline
                            minRows={4}
                            value={question}
                            onChange={(event) => {
                                setQuestion(event.target.value);
                            }}
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
                                        value={date.checkInTime}
                                        onChange={(newValue) => setDate({ ...date, checkInTime: newValue })}
                                        formatDensity="dense"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <MobileTimePicker
                                        label="Check Out time"
                                        value={date.checkOutTime}
                                        onChange={(newValue) => setDate({ ...date, checkOutTime: newValue })}

                                        formatDensity="dense"
                                        sx={{ ml: 3 }}
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
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type='number'
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label="Is smoking inside allowed?"
                                    control={
                                        <Checkbox
                                            name="smoking"
                                            checked={checked}
                                            onChange={(event) => {
                                                setChecked(event.target.checked);
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="paragraph" align="center" fontSize={14} sx={{ color: 'black', mt: 4, mb: 2.5 }}>
                            Last but not least, add some pictures of your space.
                        </Typography>
                        {

                            fileList.length > 0 &&
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ImageList
                                    sx={{ width: 500, height: 111, borderRadius: '15px' }}
                                    variant="quilted"
                                    cols={4}
                                    rowHeight={111}
                                >
                                    {fileList.map((item) => (
                                        <ImageListItem key={item.name}>
                                            <img
                                                alt="home images"
                                                {...srcset(item.name, 401, item.webkitRelativePath)}
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
                            fileList.length === 0 &&
                            <Button
                                variant='contained'
                                color='inherit'
                                endIcon={<PhotoCamera />}
                                sx={{ textTransform: 'none' }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                Add some pictures
                            </Button>
                        }
                        {
                            fileList.length > 0 &&
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
                                        {fileList.map((picture, index) => (
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
                            onClick={handleTransition(TransitionLeft)}
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