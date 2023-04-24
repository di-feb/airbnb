import React from 'react';
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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { Input } from '@mui/material';

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

    const [selectValue, setSelectValue] = React.useState("Guests");

    function handleChange(event) {
        const { name, value } = event.target
        setGuests(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const who = function(){
        if(!guests.adults && !guests.children && !guests.pets){
            return ("Guests")
        }
        else if(guests.adults && !guests.children && !guests.pets){
            return (`Adults:${guests.adults}`)
        }      
        else if(guests.adults && guests.children && !guests.pets){
            return (`Adults:${guests.adults}, Children:${guests.children}`)
        }
        else if(guests.adults && !guests.children && guests.pets){
            return (`Adults:${guests.adults}, Pets:${guests.pets}`)
        }
        else if(guests.adults && guests.children && guests.pets){
            return (`Adults:${guests.adults}, Children:${guests.children}, Pets:${guests.pets}`)
        }

    }

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, ml: 30 }}>
                <Typography fontSize='21px' >
                    {props.title}
                </Typography>
                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row' }} >
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
                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row' }} >
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

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '300px',
                        height: '300px',
                        position: 'absolute',
                        bgcolor: 'white',
                        borderWidth: '1px',
                        borderRadius: '15px',
                        borderColor: 'black',
                        borderStyle: 'solid',
                        boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
                        mt: 69,
                        ml: 80
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
                    
                        <Select 
                            value={selectValue}
                            label="Age"
                            onChange={()=> setSelectValue({who})}
                            size='small'
                            sx={{margin: "10px"}}
                        
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
                            {who()}
                        </Select>
                    
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