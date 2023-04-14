import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Country from './Country';
import DateCalendarValue from './DateCalenderValue';
import { TextField } from '@mui/material';

export default function Navbar() {
    const [showCountry, setShowCountry] = React.useState(0);

    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }} position="static">
                <Container maxWidth="xxl">
                    <Toolbar disableGutters style={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* Logo */}
                        <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>

                            <Logo />

                        </Box>

                        {/* Search Bar */}
                        <SearchBar setShowCountry={setShowCountry} />




                        {/* Sign up and Login buttons */}
                        <Box sx={{ flexGrow: 0, display: { xs: 'end', md: 'flex' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button href="/signup" variant="contained" color="primary" sx={{ maxHeight: '36px' }}>
                                    Sign up
                                </Button>
                                <Button href="/login" variant="contained" color="secondary" sx={{ ml: 1 }}>
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {showCountry === 1 &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    mt: '20px',
                    ml: '180px',
                    width: '500px',
                    height: '180px',
                    borderWidth: '1',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)'
                }}>
                    <Country />
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
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "50px !important",
                                },
                            }} />
                        <TextField id="district"
                            label="Choose a district"
                            variant="outlined"
                            sx={{
                                "& .MuiInputBase-root": {
                                    borderRadius: "50px !important",
                                },
                            }} />
                    </Box>
                </Box>
            }
            {((showCountry === 2) || (showCountry === 3)) &&
                <Box sx={{
                    display: 'flex',
                    mt: '20px',
                    ml: '350px',
                    width: '640px',
                    height: '350px',
                    borderWidth: '1px',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)'
                }}>
                    <DateCalendarValue />
                    <DateCalendarValue />
                </Box>
            }

            {showCountry === 4 &&
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: '20px',
                    ml: '720px',
                    width: '340px',
                    height: '350px',
                    borderWidth: '1px',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)'
                }}>
                    <TextField id="city"
                        label="Number of Adults"
                        variant="outlined"
                        
                    sx={{
                        "& .MuiInputBase-root": {
                            borderRadius: "50px !important",
                        },
                        margin: "20px 10px "
                    }} 
                        />
                    <TextField id="district"
                        label="Number of children"
                        variant="outlined"

                        sx={{
                            "& .MuiInputBase-root": {
                                borderRadius: "50px !important",
                            },
                            margin: "20px 10px "
                        }}
                    />

                    <TextField id="district"
                        label="Number of pets"
                        variant="outlined"

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
