import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider';
import CollectionsIcon from '@mui/icons-material/Collections';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BathroomOutlinedIcon from '@mui/icons-material/BathroomOutlined';
import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import FenceOutlinedIcon from '@mui/icons-material/FenceOutlined';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import ProgressBar from './ProgressBar';
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
dayjs.extend(duration);

export default function CardDetails(props) {

    const now = new Date(Date.now());
    const today = dayjs(new Date().toString());
    const nextMonth = dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 1));
    const [date, setDate] = React.useState({
        checkIn: today,
        checkOut: nextMonth,

    });
    const [guests, setGuests] = React.useState({
        adults: 0,
        children: 0,
        pets: 0,
    });

    const [guestButton, setGuestButton] = React.useState(false);

    function handleChange(event) {
        const { name, value } = event.target
        setGuests(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const who = function () {
        if (!guests.adults && !guests.children && !guests.pets) {
            return ("Guests")
        }
        else if (guests.adults && !guests.children && !guests.pets) {
            return (`Adults:${guests.adults}`)
        }
        else if (guests.adults && guests.children && !guests.pets) {
            return (`Adults:${guests.adults}, Children:${guests.children}`)
        }
        else if (guests.adults && !guests.children && guests.pets) {
            return (`Adults:${guests.adults}, Pets:${guests.pets}`)
        }
        else if (guests.adults && guests.children && guests.pets) {
            return (`Adults:${guests.adults}, Children:${guests.children}, Pets:${guests.pets}`)
        }

    }

    function diffInDays(date1, date2) {
        const duration = dayjs.duration(date2.diff(date1));
        return duration.asDays();
    }

    const [boxTop, setBoxTop] = React.useState(550); // initial value of mt

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        console.log(scrollTop);
        if (scrollTop >= 640)
            setBoxTop(scrollTop - 50);
        else
            setBoxTop(550);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const duration = Math.trunc(diffInDays(date.checkIn, date.checkOut))
    const cost = props.price * duration
    const totalCost = cost + props.airbnbFee


    const defaultLocation = L.latLng(37.9838, 23.7275);
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

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, ml: 30 }}>
                <Typography fontSize='21px' >
                    {props.title}
                </Typography>
                <Typography fontSize='12px' >
                    <StarIcon sx={{ color: 'red', height: '14px', mt: '1px' }} />
                    {props.rating}  ·  {props.reviews} reviews  ·  {props.city}, {props.country}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImageList
                        sx={{ width: 1000, height: 444, borderRadius: '15px' }}
                        variant="quilted"
                        cols={4}
                        rowHeight={220}
                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 401, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Button
                        variant='contained'
                        startIcon={<CollectionsIcon />}
                        sx={{
                            backgroundColor: "white",
                            color: 'black',
                            fontSize: '10px',
                            position: 'absolute',
                            borderRadius: '15px',
                            mt: 50,
                            ml: 105,
                            '&:hover': {
                                backgroundColor: '#818181',

                            },
                        }}

                    >
                        Show all photos
                    </Button>
                </Box>
                <Typography fontSize='18px' sx={{ mt: 3 }} >
                    {props.typeOfPlace} hosted by {props.hosterName}
                </Typography>
                <Typography fontSize='12px' >
                    {props.guests} guests  ·  {props.bedrooms} bedrooms  ·  {props.beds} beds  ·  {props.baths} baths
                </Typography>

                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />

                <Typography fontSize='18px' sx={{ mt: 3 }} >
                    What this place offers
                </Typography>

                <Typography fontSize='15px' sx={{ mt: 1 }} >
                    Space
                </Typography>
                <Grid container sx={{ width: '500px' }}  >
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >
                            <CottageOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                            Type of place:{props.typeOfPlace}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >
                            <BedroomChildOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                            Bedrooms:{props.bedrooms}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                            <AirlineSeatIndividualSuiteOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                            Beds:{props.beds}

                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                            <BathroomOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                            Bathrooms:{props.baths}

                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>

                        <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                            <FenceOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                            Space Area:{props.area}

                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                            <ChairOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                            Living Rooms:{props.livingRooms !== "0" ? props.livingRooms : "Doesnt Exist!"}

                        </Typography>
                    </Grid>
                </Grid>


                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />

                <Typography variant='title' sx={{ fontSize: '18px', mt: 2 }}> Description of the space. </Typography>
                <Typography variant='paragraph' sx={{ width: '500px', fontSize: '13px', mt: 2 }}> {props.description} </Typography>

                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />

                <Typography fontSize='18px' sx={{ display: "flex", flexDirection: 'row', mt: 1 }} >
                    <StarIcon sx={{ color: 'black', height: '16px', mt: '4px' }} />
                    {props.rating}  ·  {props.reviews} reviews
                </Typography>

                <Grid container sx={{ width: '500px' }}  >
                    <Grid item xs={12} sm={3}>
                        <Typography fontSize='12px' sx={{ mt: 2 }} > Cleanliness </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <ProgressBar value={props.cleanlinessRating} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography fontSize='12px' sx={{ mt: 2, ml: 1 }} > Accuracy </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <ProgressBar value={props.accuracyRating} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography fontSize='12px' sx={{ mt: 2 }} > Communication </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <ProgressBar value={props.communicationRating} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography fontSize='12px' sx={{ mt: 2, ml: 1 }} > Check-in </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <ProgressBar value={props.checkInRating} />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography fontSize='12px' sx={{ mt: 2 }} > Location</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <ProgressBar value={props.locationRating} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography fontSize='12px' sx={{ mt: 2, ml: 1 }} >Value </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <ProgressBar value={props.valueRating} />
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />

                <Typography variant='title' sx={{ fontSize: '18px', mt: 2 }}> Where you'll be. </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Location:  </Typography>
                    <Typography sx={{ fontSize: '13px', ml: 1 }}> {props.city}, {props.country} </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Address:  </Typography>
                    <Typography sx={{ fontSize: '13px', ml: 1 }}> {props.address} {props.district} </Typography>
                </Box>

                <MapContainer center={defaultLocation} zoom={13} style={{ height: '400px', width: '500px', marginTop: '10px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={defaultLocation} icon={pinMB}>
                        <Popup>
                            This is it!
                        </Popup>
                    </Marker>
                </MapContainer>

                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />

                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>

                    <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} />
                    <Typography variant='title' sx={{ fontSize: '18px', ml: 1 }}> Hosted By {props.hosterName}. </Typography>
                    <VerifiedUserIcon sx={{ height: '14px', ml: 1 }} />
                    <Typography sx={{ fontSize: '12px' }}> Identity verified </Typography>
                </Box>
                <Typography variant='paragraph' sx={{ width: '500px', fontSize: '13px', mt: 2 }}> {props.hosterDesc} </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Policy number:  </Typography>
                    <Typography sx={{ fontSize: '13px' }}> 00001060752 </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Languages: </Typography>
                    <Typography sx={{ fontSize: '13px' }}> English, Ελληνικά </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Response rate: </Typography>
                    <Typography sx={{ fontSize: '13px' }}> 97% </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Response time:  </Typography>
                    <Typography sx={{ fontSize: '13px' }}> Within an hour </Typography>
                </Box>

                <Button
                    variant='outlined'
                    sx={{
                        width: '120px',
                        textTransform: 'none',
                        bgcolor: 'white',
                        borderColor: 'black',
                        color: 'black',
                        borderRadius: '7px',
                        position: 'absolute',
                        mt: 213,
                        ml: 40,

                        '&:hover': {
                            color: 'black',
                            backgroundColor: '#dedede',
                            borderColor: 'black',
                        },

                    }}
                >
                    Contact Host
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', mt: 223, ml: 38 }}>
                    <GppMaybeIcon sx={{ color: 'red' }} />
                    <Typography fontSize='10px' sx={{ width: '220px', ml: 1 }}>
                        To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                    </Typography>
                </Box>

                <Divider sx={{ borderColor: '#606060', mt: 2, width: '1000px' }} />

                <Typography variant='title' sx={{ fontSize: '18px', mt: 4 }}> Things to know </Typography>
                <Grid container sx={{ width: '1000px' }}  >
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' fontWeight='bold' sx={{ mt: 2 }} > House Rules </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Typography fontSize='13px' fontWeight='bold' sx={{ mt: 2 }} > Safety & property </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' fontWeight='bold' sx={{ mt: 2 }} > Cancellation policy </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Typography fontSize='13px' sx={{ mt: 2 }} > Check-in: 3:00 PM - 8:00 PM </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' sx={{ mt: 2 }} > Carbon monoxide alarm not reported </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Typography fontSize='13px' sx={{ mt: 2 }} > Free cancellation before Jul 3 </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' sx={{ mt: 2 }} > Checkout before 11:00 AM </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Typography fontSize='13px' sx={{ mt: 2 }} > Smoke alarm not reported </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' sx={{ mt: 2 }} >
                            Review the Host’s full cancellation policy which applies
                            even if you cancel for illness or disruptions caused by COVID-19.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Typography fontSize='13px' sx={{ mt: -2.5 }} > 4 guests maximum </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' sx={{ mt: -2.5 }} > Not suitable for infants (under 2 years) </Typography>
                    </Grid>
                </Grid>

                <Box
                    id='box'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '300px',
                        height: '350px',
                        position: 'absolute',
                        mt: `${boxTop}px`,
                        left: '880px',
                        bgcolor: 'white',
                        borderWidth: '1px',
                        borderRadius: '15px',
                        borderColor: 'black',
                        borderStyle: 'solid',
                        boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',

                    }}
                >
                    <Box sx={{ display: 'flex', mt: '15px', ml: '10px', mr: '10px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography fontSize='21px' > $ {props.price} </Typography>
                            <Typography fontSize='14px' color='#3c3c3c' sx={{ mt: '6px', ml: '5px' }} > nigth </Typography>
                            <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: '9px', ml: '65px' }} >
                                <StarIcon sx={{ color: 'red', height: '14px', mt: '1px' }} />
                                {props.rating}  ·  {props.reviews} reviews
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', ml: '10px', mr: '10px', mt: '10px' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Check In"
                                value={date.checkIn}
                                onChange={(newValue) => setDate({ ...date, checkIn: newValue })}
                                minDate={today}
                                formatDensity="dense"
                                slotProps={{ textField: { size: 'small', } }}
                            />
                            <MobileDatePicker
                                label="Check Out"
                                value={date.checkOut}
                                onChange={(newValue) => setDate({ ...date, checkOut: newValue })}
                                minDate={today}
                                formatDensity="dense"
                                slotProps={{ textField: { size: 'small' } }}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Button
                        variant='outlined'
                        onClick={() => setGuestButton((prev) => (!prev))}
                        size='small'
                        sx={{
                            margin: "10px",
                            color: "black",
                            borderColor: '#dedede',
                            textTransform: 'none !important',
                            justifyContent: 'flex-start',
                            '&:hover': {
                                color: 'black',
                                backgroundColor: 'white',
                                borderColor: 'black',
                            },
                        }}


                    >
                        {who()}

                    </Button>


                    {guestButton &&
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'absolute',
                                mt: '150px',
                                ml: '10px',
                                mr: '10px',
                                width: '280px',
                                height: '250px',
                                borderRadius: '15px',
                                borderColor: 'black',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                backgroundColor: 'white',
                                zIndex: '9999',

                            }}
                        >
                            <TextField
                                id="adults"
                                type='number'
                                label="Number of Adults"
                                variant="outlined"
                                value={guests.adults}
                                name="adults"
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                                size="small"

                                sx={{ margin: "20px 10px" }}
                            />
                            <Divider />
                            <TextField
                                id="children"
                                type='number'
                                label="Number of Children"
                                variant="outlined"
                                value={guests.children}
                                name="children"
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                                size="small"

                                sx={{ margin: "20px 10px" }}
                            />
                            <Divider />
                            <TextField
                                id="pets"
                                type='number'
                                label="Number of Pets"
                                variant="outlined"
                                value={guests.pets}
                                name="pets"
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                                size="small"

                                sx={{ margin: "20px 10px" }}
                            />

                        </Box>
                    }

                    <Button
                        variant='contained'
                        sx={{
                            margin: "10px",
                            backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',
                            borderColor: 'black',
                            textTransform: 'none !important',
                            height: '40px',

                            '&:hover': {
                                color: 'black',
                            },
                        }}
                    >
                        Reserve
                    </Button>

                    <Typography sx={{ fontSize: '12px', ml: '80px' }}> You won't be charged yet </Typography>
                    <Grid container sx={{ width: '400px', mt: '15px', ml: '20px' }}  >
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '13px' }}> ${props.price} x {duration} nights </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '13px' }}> $ {cost} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '13px' }}> Airbnb service fee </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '13px' }}> $ {props.airbnbFee} </Typography>
                        </Grid>
                    </Grid>

                    <Divider variant="middle" sx={{ mt: 2 }} />
                    <Grid container sx={{ width: '400px', mt: '20px', ml: '20px' }}>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> Total </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}> $ {totalCost} </Typography>
                        </Grid>
                    </Grid>



                </Box>


            </Box >
        </>
    )
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },

];