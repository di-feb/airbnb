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
import ProgressBar from './ProgressBar';
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Copyright from './Copyright';
import ReserveCard from './ReserveCard';
dayjs.extend(duration);

export default function CardDetails(props) {

    const [boxTop, setBoxTop] = React.useState({
        top: 640,
        position: 'absolute',
    }); // initial value of mt

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;

        if (scrollTop >= 550)
            setBoxTop({ top: 40, position: 'fixed' });
        if (scrollTop < 600)
            setBoxTop({ top: 640, position: 'absolute' });
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
                            Space Area:{props.area} s.m.

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

                <Grid container spacing={4} sx={{ width: '500px' }} >
                    <Grid item xs={12} sm={6}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 6 }}>
                            <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Typography variant='title' fontWeight='bold' fontSize='13px' sx={{ ml: 1.5, mt: 1 }}> Valia </Typography>
                                <Typography variant='title' sx={{ fontSize: '11px', ml: 1.5, color: '#c2c2c2' }}> April 2023 </Typography>
                            </Box>
                        </Box>
                        <Typography variant='paragraph' sx={{ fontSize: '12px' }}>
                            Awesome stay! Authentic treehouse experience.
                            Would 100 percent return. Wayan was a great host!!
                            When in Bali must check this location out.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 6 }}>
                            <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Typography variant='title' fontWeight='bold' fontSize='13px' sx={{ ml: 1.5, mt: 1 }}> Valia </Typography>
                                <Typography variant='title' sx={{ fontSize: '11px', ml: 1.5, color: '#c2c2c2' }}> April 2023 </Typography>
                            </Box>
                        </Box>
                        <Typography variant='paragraph' sx={{ fontSize: '12px', mt: 2 }}>
                            Awesome stay! Authentic treehouse experience.
                            Would 100 percent return. Wayan was a great host!!
                            When in Bali must check this location out.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 6 }}>
                            <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Typography variant='title' fontWeight='bold' fontSize='13px' sx={{ ml: 1.5, mt: 1 }}> Valia </Typography>
                                <Typography variant='title' sx={{ fontSize: '11px', ml: 1.5, color: '#c2c2c2' }}> April 2023 </Typography>
                            </Box>
                        </Box>
                        <Typography variant='paragraph' sx={{ fontSize: '12px', mt: 2 }}>
                            Awesome stay! Authentic treehouse experience.
                            Would 100 percent return. Wayan was a great host!!
                            When in Bali must check this location out.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 6 }}>
                            <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Typography variant='title' fontWeight='bold' fontSize='13px' sx={{ ml: 1.5, mt: 1 }}> Valia </Typography>
                                <Typography variant='title' sx={{ fontSize: '11px', ml: 1.5, color: '#c2c2c2' }}> April 2023 </Typography>
                            </Box>
                        </Box>
                        <Typography variant='paragraph' sx={{ fontSize: '12px', mt: 2 }}>
                            Awesome stay! Authentic treehouse experience.
                            Would 100 percent return. Wayan was a great host!!
                            When in Bali must check this location out.
                        </Typography>
                    </Grid>
                </Grid>

                {/* /////////////////////////////////////// */}

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
                    href="/contactHost"
                    variant='outlined'
                    sx={{
                        width: '120px',
                        textTransform: 'none',
                        bgcolor: 'white',
                        borderColor: 'black',
                        color: 'black',
                        borderRadius: '7px',
                        position: 'absolute',
                        mt: 258,
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
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'absolute', mt: 268, ml: 38 }}>
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
                        <Typography fontSize='13px' sx={{ mt: -2.6 }} > 4 guests maximum </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' sx={{ mt: -2.6 }} > Not suitable for infants (under 2 years) </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' fontWeight='bold' sx={{ mt: 2, textDecoration: 'underline' }} > See more </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' fontWeight='bold' sx={{ mt: 2, textDecoration: 'underline' }} > See more </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography fontSize='13px' fontWeight='bold' sx={{ mt: 2, textDecoration: 'underline' }} > See more </Typography>
                    </Grid>
                </Grid>

                <ReserveCard
                    price={props.price}
                    airbnbFee={props.airbnbFee}
                    rating={props.rating}
                    reviews={props.reviews}
                    position={boxTop.position}
                    top={boxTop.top}
                    handleScroll={handleScroll}
                />
            </Box >

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