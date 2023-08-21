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
import { ClickAwayListener } from '@mui/material';
import "./css/style.css"
import DatePicker from './DatePicker';


export default function Navbar() {
    const [showPopUp, setShowPopUp] = React.useState(0);

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

    const handleCountryChange = (newValue) => {
        if (newValue === null) {
            setData({ ...data, country: { code: '', label: '', phone: '' } });
        } else {
            setData({ ...data, country: newValue });
        }
    };



    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }} position="static" >
                <Container maxWidth="xxl">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>

                        {/* Logo */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Logo />
                        </Box>

                        {/* Search Bar */}
                        <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
                            <SearchBar
                                setShowPopUp={setShowPopUp}
                                showPopUp={showPopUp}
                                country={data.country.label}
                                city={data.city}
                                district={data.district}
                                adults={data.numOfAdults}
                                children={data.numOfChildren}
                                pets={data.numOfPets}
                                checkIn={data.checkIn.format('ddd MMM DD').substring(0, 11)}
                                checkOut={data.checkOut.format('ddd MMM DD').substring(0, 11)}
                                checkInClicked={showPopUp}
                                checkOutClicked={showPopUp}
                            />
                        </Box>

                        {/* Host Button and Sign up/Login buttons */}
                        <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Host Button */}
                            <Button
                                href="/host"
                                variant="text"
                                size="small"
                                sx={{
                                    mr: 2,
                                    maxHeight: '30px',
                                    color: 'black',
                                    fontSize: '10px',
                                    borderRadius: '30px',
                                    textTransform: 'none',
                                    lineHeight: 1.5,
                                    padding: 1,
                                    '&:hover': {
                                        backgroundColor: '#dedede',
                                        borderColor: 'black',
                                    },
                                }}
                            >
                                Make your home Airbnb
                            </Button>

                            {/* Sign up and Login buttons */}
                            <Button href="/signup" variant="contained" color="info" size="small">
                                Sign up
                            </Button>
                            <Button href="/login" variant="contained" color="secondary" size="small" sx={{ ml: 1 }}>
                                Login
                            </Button>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>




            {
                showPopUp === 1 &&
                <ClickAwayListener onClickAway={() => setShowPopUp(0)}>
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
                </ClickAwayListener>
            }
            {
                showPopUp === 2 &&
                <ClickAwayListener onClickAway={() => setShowPopUp(0)}>
                    <Box>
                        <DatePicker data={data} setData={setData} today={today} />
                    </Box >
                </ClickAwayListener>
            }
            {
                showPopUp === 3 &&
                <ClickAwayListener onClickAway={() => setShowPopUp(0)}>
                    <Box>
                        <DatePicker data={data} setData={setData} today={today} />
                    </Box>
                </ClickAwayListener>
            }

            {
                showPopUp === 4 &&
                <ClickAwayListener onClickAway={() => setShowPopUp(0)}>
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
                            inputProps={{ min: 0, max: 16 }}

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
                            inputProps={{ min: 0, max: 16 }}

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
                            inputProps={{ min: 0, max: 4 }}

                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "50px !important",
                                },
                                margin: "20px 10px "
                            }}
                        />
                    </Box>
                </ClickAwayListener>
            }
        </>
    );
}
