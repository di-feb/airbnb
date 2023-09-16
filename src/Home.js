import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';
import Box from '@mui/material/Box';


export default function Home() {


    return (
        <Box display='flex' flexDirection='column'>
            <Navbar />
            <Main />
            <Footer />
        </Box>
    );
}