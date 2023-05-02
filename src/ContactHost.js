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
import duration from 'dayjs/plugin/duration';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import ProgressBar from './ProgressBar';
import { Avatar } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import Copyright from './Copyright';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
dayjs.extend(duration);

export default function ContactHost(props) {

    const [question, setQuestion] = React.useState('');
    const history = useNavigate();

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, ml: 30 }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '22px',
                        height: '35px',
                        alignItems: 'center',
                        borderRadius: '50px',

                        '&:hover': {
                            backgroundColor: '#dedede',
                            borderColor: 'black',
                        },
                    }}
                >
                    <ArrowBackIosIcon
                        onClick={() => history(-1)}
                        sx={{
                            height: '22px',
                            cursor: 'pointer',
                            ml: 0.5
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography fontSize='21px' sx={{ mt: 2 }} > Contact Valia </Typography>
                        <Typography fontSize='14px' sx={{ color: '#979797' }} > Typically responds within an hour </Typography>
                    </Box>
                    <Avatar alt="Remy Sharp" src={require("./images/avatar.png")} sx={{ ml: 36, width: '50px', height: '50px' }} />
                </Box>

                <Divider sx={{ borderColor: '#606060', mt: 4, width: '550px' }} />

                <Typography fontSize='20px' sx={{ mt: 3 }} > Most travelers ask about </Typography>
                <Typography fontSize='14px' sx={{ mt: 3 }} > Getting There </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4 }} >
                    Check-in for this home is between 3:00 PM and 2:00 AM (next day) and checkout is at 11:00 AM.
                </Typography>
                <Typography fontSize='14px' sx={{ mt: 3 }} > House details and rules </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4 }} >
                    No pets.
                </Typography>

                <Typography fontSize='14px' sx={{ mt: 3 }} > Price and availability </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4 }} >
                    Maria’s home is available from Oct 17 – 22. Book soon.
                </Typography>
                <Typography fontSize='12px' sx={{ display: 'list-item', mt: 1, ml: 4, width: '500px' }} >
                    Cancel up to 5 days before check-in and get a full refund.
                    After that, cancel before check-in and get a 50% refund,
                    minus the first night and service fee.
                </Typography>

                <Divider sx={{ borderColor: '#606060', mt: 4, width: '550px' }} />

                <Typography fontSize='20px' sx={{ mt: 3 }} > Still have questions? Message the Host </Typography>

                <TextField
                    multiline
                    value={question}
                    onChange={(event) => {
                        setQuestion(event.target.value);
                    }}
                    sx={{
                        width: '500px',
                        mt: 1,
                        mb: 2.5,
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },

                    }}
                />

                <Button
                    variant='outlined'
                    sx={{
                        width: '130px',
                        textTransform: 'none',
                        bgcolor: 'white',
                        borderColor: 'black',
                        color: 'black',
                        borderRadius: '7px',
                        fontSize:'13px',
                        fontWeight:'bold',
                        mb:10,

                        '&:hover': {
                            color: 'black',
                            backgroundColor: '#dedede',
                            borderColor: 'black',
                        },

                    }}
                >
                    Send Message
                </Button>

                <Box
                    id='box'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '300px',
                        height: '350px',
                        position: 'absolute',
                        top: '640px',
                        left: '880px',
                        bgcolor: 'white',
                        borderWidth: '1px',
                        borderRadius: '15px',
                        borderColor: 'black',
                        borderStyle: 'solid',
                        boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
                    }}
                    onScroll={handleScroll}
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
            </Box>
        </>
    )
}