import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Country from './Country';

export default function Navbar() {
    const [showCountry, setShowCountry] = React.useState(0);

    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }} position="static">
                <Container maxWidth="xl">
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
                <Container sx={{
                    display: 'flex',
                    mt: '20px',
                    ml: '290px',
                    
                    
                }}>

                    <Country />
                </Container>
                // <Box sx={{
                //     display:'flex',
                //     mt: '20px',
                //     ml: '250px',
                //     width: '350px',
                //     height: '300px',
                //     borderWidth: '1',
                //     borderRadius: '16px',
                //     backgroundColor: 'white',
                //     boxShadow: '0px 10px 19px rgba(0, 0, 0, 0.4)'
                // }}>
                // </Box>
            }

        </>
    );
}
