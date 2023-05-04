import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
dayjs.extend(duration);

export default function ReserveCard(props) {

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

    const duration = Math.trunc(diffInDays(date.checkIn, date.checkOut))
    const cost = props.price * duration
    const totalCost = cost + props.airbnbFee

    return (
        <Box
            id='box'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
                height: '350px',
                position: props.position,
                top: props.top,
                left: '880px',
                bgcolor: 'white',
                borderWidth: '1px',
                borderRadius: '15px',
                borderColor: 'black',
                borderStyle: 'solid',
                boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
            }}
            onScroll={props.handleScroll}
        >
            <Box sx={{ display: 'flex', mt: '15px', ml: '10px', mr: '10px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography fontSize='21px' > $ {props.price} </Typography>
                    <Typography fontSize='14px' color='#3c3c3c' sx={{ mt: '6px', ml: '5px' }} > night </Typography>
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
    )
}
