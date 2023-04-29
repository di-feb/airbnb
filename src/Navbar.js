import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Country from './Country';
import { Divider, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export default function Navbar() {
    const [showCountry, setShowCountry] = React.useState(0);

    const now = new Date(Date.now());
    const today = dayjs(new Date().toString());
    const nextMonth = dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 1));

    const [data, setData] = React.useState({
        country: { code: '', label: '', phone: '' },
        city: null,
        district: null,
        checkIn: today,
        checkOut: nextMonth,
        numOfAdults: 0,
        numOfChildren: 0,
        numOfPets: 0,
    });



    function handleChange(event) {
        const { name, value } = event.target
        setData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleCountryChange = (event, newValue) => {
        setData({ ...data, country: newValue });

    };





    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }} position="static">
                <Container maxWidth="xxl">
                    <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* Logo */}
                        <Logo />

                        {/* Search Bar */}
                        <SearchBar
                            setShowCountry={setShowCountry}
                            country={data.country.label}
                            city={data.city}
                            district={data.district}
                            adults={data.numOfAdults}
                            children={data.numOfChildren}
                            pets={data.numOfPets}
                            checkIn={data.checkIn.format('ddd MMM DD').substring(0, 11)}
                            checkOut={data.checkOut.format('ddd MMM DD').substring(0, 11)}
                            checkInClicked={showCountry}
                            checkOutClicked={showCountry}
                        />

                        <Button
                            href="/host"
                            variant="text"
                            size="small"
                            sx={{
                                mr: 5,
                                mt: 0.5,
                                maxHeight: '30px',
                                color: 'black',
                                fontSize: '10px',
                                borderRadius: '30px',
                                textTransform: 'none',
                                lineHeight: 1.5,

                                '&:hover': {
                                    backgroundColor: '#dedede',
                                    borderColor: 'black',
                                },
                            }}>
                            Make you home airbnb
                        </Button>
                        {/* Sign up and Login buttons */}
                        <Box sx={{ flexGrow: 0, display: { xs: 'end', md: 'flex' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button href="/signup" variant="contained" color="primary" size="small" >
                                    Sign up
                                </Button>
                                <Button href="/login" variant="contained" color="secondary" size="small" sx={{ ml: 1 }}>
                                    Login
                                </Button>
                            </Box>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            {
                showCountry === 1 &&

                <Box

                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'absolute',
                        mt: '20px',
                        ml: '180px',
                        width: '500px',
                        height: '180px',
                        borderRadius: '30px',
                        backgroundColor: 'white',
                        boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
                        zIndex: '2',

                    }}>
                    <Country
                        value={data.country}
                        onChange={handleCountryChange}
                    />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: '20px',
                        ml: '20px',
                        width: '460px',
                    }}>

                        <TextField id="city"
                            label="Choose a city"
                            variant="outlined"
                            value={data.city}
                            name="city"
                            onChange={handleChange}
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "50px !important",
                                },
                            }}
                        />
                        <TextField id="district"
                            label="Choose a district"
                            variant="outlined"
                            value={data.district}
                            name="district"
                            onChange={handleChange}
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "50px !important",
                                },
                            }}
                        />
                    </Box>
                </Box >
            }
            {
                ((showCountry === 2) || (showCountry === 3)) &&
                <Box sx={{
                    display: 'flex',
                    position: 'absolute',
                    mt: '20px',
                    ml: '350px',
                    width: '640px',
                    height: '350px',
                    borderRadius: '30px',
                    backgroundColor: 'white',
                    boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
                    zIndex: '2',

                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={data.checkIn} onChange={(newValue) => setData({ ...data, checkIn: newValue })} minDate={today} />
                        <DateCalendar value={data.checkOut} onChange={(newValue) => setData({ ...data, checkOut: newValue })} minDate={today} />
                    </LocalizationProvider>
                </Box>
            }

            {
                showCountry === 4 &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    mt: '20px',
                    ml: '720px',
                    width: '340px',
                    height: '300px',
                    borderRadius: '30px',
                    backgroundColor: 'white',
                    boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)',
                    zIndex: '2',

                }}>

                    <TextField
                        id="adults"
                        type='number'
                        label="Number of Adults"
                        variant="outlined"
                        value={data.numOfAdults}
                        name="numOfAdults"
                        onChange={handleChange}
                        inputProps={{ min: 0 }}

                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: "50px !important",
                            },
                            margin: "20px 10px "
                        }}
                    />
                    <Divider />
                    <TextField
                        id="children"
                        type='number'
                        label="Number of Children"
                        variant="outlined"
                        value={data.numOfChildren}
                        name="numOfChildren"
                        onChange={handleChange}
                        inputProps={{ min: 0 }}

                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: "50px !important",
                            },
                            margin: "20px 10px "
                        }}
                    />
                    <Divider />
                    <TextField
                        id="pets"
                        type='number'
                        label="Number of Pets"
                        variant="outlined"
                        value={data.numOfPets}
                        name="numOfPets"
                        onChange={handleChange}
                        inputProps={{ min: 0 }}

                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: "50px !important",
                            },
                            margin: "20px 10px "
                        }}
                    />
                </Box>
            }
        </>
    );
}
