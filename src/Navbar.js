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
    const [showCountry, setShowCountry] = React.useState(false);

    function handleButtonClick(){
        setShowCountry(true);
    }
    console.log(showCountry)

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
                    <SearchBar setShowCountry ={setShowCountry} />


                    

                    {/* Sign up and Login buttons */}
                    <Box sx={{ flexGrow: 0, display: { xs: 'end', md: 'flex' } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button href="/signup" variant="contained" color="primary" sx={{maxHeight: '36px'}}>
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
        {showCountry && <Country/>}
        
        </>
    );
}
