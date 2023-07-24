import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import "./css/style.css"

export default function SearchBar(props) {

    const [openMenu, setOpenMenu] = React.useState(0);
    const [isClicked, setIsClicked] = React.useState({
        id: 0,
        flag: false
    });

    const [openCheckIn, setOpenCheckIn] = React.useState(false);
    const [openCheckOut, setOpenCheckOut] = React.useState(false);

    const where = function (flag) {
        if (props.country === "" && !props.city && !props.district) {
            return (flag ? "Anywhere " : "Search Destinations")
        }
        else if (props.country !== "" && !props.city && !props.district) {
            return (props.country)
        }
        else if (props.country === "" && props.city && !props.district) {
            return (props.city)
        }
        else if (props.country === "" && !props.city && props.district) {
            return (props.district)
        }
        else if (props.country !== "" && props.city && !props.district) {
            return (`${props.country}, ${props.city}`)
        }
        else if (props.country !== "" && !props.city && props.district) {
            return (`${props.country}, ${props.district}`)
        }
        else if (props.country === "" && props.city && props.district) {
            return (`${props.city}, ${props.district}`)
        }
        else {
            return (`${props.country}, ${props.city}, ${props.district}`)
        }

    }

    const who = function () {
        if (!props.adults && !props.children && !props.pets) {
            return ("Add Guests")
        }
        else if (props.adults && !props.children && !props.pets) {
            return (`Adults:${props.adults}`)
        }
        else if (props.adults && props.children && !props.pets) {
            return (`Adults:${props.adults}, Children:${props.children}`)
        }
        else if (props.adults && !props.children && props.pets) {
            return (`Adults:${props.adults}, Pets:${props.pets}`)
        }
        else if (props.adults && props.children && props.pets) {
            return (`Adults:${props.adults}, Children:${props.children}, Pets:${props.pets}`)
        }

    }

    return (
        <>
            {openMenu === 0 &&
                <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '40px',
                            backgroundColor: 'white',
                            borderWidth: '1px',
                            borderColor: '#606060',
                            borderStyle: 'solid',

                            transition: 'all 0.1s ease',
                            minWidth: '250px',
                            textTransform: 'none',

                            '&:hover': {
                                backgroundColor: '#ededed',
                                borderColor: 'black',
                                borderWidth: '2px',
                            },

                        }}
                        onClick={() => setOpenMenu(1)}
                        endIcon={ // icon goes to the right side of the button
                            <SearchIcon
                                sx={{
                                    backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    color: 'white',
                                }}
                            />
                        }
                    >

                        <Typography color="#414141" fontWeight={'400'} >
                            Search for accomondation
                        </Typography>

                    </Button >
                </Box >
            }

            {openMenu === 1 &&

                <Box sx={{
                    mr: '200px',

                    mt: '10px',
                    mb: '10px',
                    flexGrow: 2,

                    display: { xs: 'center', md: 'flex' },
                    borderRadius: '40px',
                    backgroundColor: props.showPopUp ? '#c2c2c2' : 'white',
                    borderWidth: '1px',
                    borderColor: '#979797',
                    borderStyle: 'solid',

                    transition: 'all 0.1s ease',
                    height: '60px',

                    '&:hover': {
                        backgroundColor: props.showPopUp ? '#c2c2c2' : 'white',
                        borderColor: 'black',
                    },

                }}
                >


                    <Button id="1"
                        sx={{
                            borderRadius: '40px',
                            width: '30%',
                            display: 'flex',
                            backgroundColor: isClicked.id === 1 && props.showPopUp === 1 && 'white',
                            boxShadow: isClicked.id === 1 && props.showPopUp === 1 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 1 && props.showPopUp === 1 ? 'white' : 'grey' },
                            textTransform: 'none !important',
                        }}
                        onClick={() => { props.setShowPopUp(1); setIsClicked({ id: 1, flag: true }); }}
                    >
                        <Box sx={{ textAlign: 'left', flexDirection: 'column' }}>
                            <Typography
                                color="black"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    mb: '5px',
                                }}
                            >
                                Where
                            </Typography>

                            <Typography
                                color="black"
                                sx={{
                                    fontSize: '11px',
                                    textAlign: 'center',
                                }}
                            >
                                {where(false)}

                            </Typography>
                        </Box>
                    </Button>


                    <Button id="2"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            backgroundColor: isClicked.id === 2 && props.showPopUp === 2 && 'white',
                            boxShadow: isClicked.id === 2 && props.showPopUp === 2 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 2 && props.showPopUp === 2 ? 'white' : 'grey' },
                            textTransform: 'none !important',
                        }}
                        onClick={() => { props.setShowPopUp(2); setIsClicked({ id: 2, flag: true }); setOpenCheckIn(true); }}
                    >
                        <Box sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography
                                color="black"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    mb: '5px', // Adds margin bottom of 5px
                                }}
                            >
                                Check In
                            </Typography>

                            <Typography
                                color="black"
                                sx={{
                                    fontSize: '11px',
                                    textAlign: 'center',
                                }}
                            >
                                {!openCheckIn && !openCheckOut ? "Add dates" : props.checkIn}
                            </Typography>
                        </Box>
                    </Button>

                    <Button id="3"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            backgroundColor: isClicked.id === 3 && props.showPopUp === 3 && 'white',
                            boxShadow: isClicked.id === 3 && props.showPopUp === 3 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 3 && props.showPopUp === 3 ? 'white' : 'grey' },
                            textTransform: 'none !important',
                        }}
                        onClick={() => { props.setShowPopUp(3); setIsClicked({ id: 3, flag: true }); setOpenCheckOut(true); }}
                    >
                        <Box sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography
                                color="black"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    mb: '5px', // Adds margin bottom of 5px
                                }}
                            >
                                Check Out
                            </Typography>

                            <Typography
                                color="black"
                                sx={{
                                    fontSize: '11px',
                                    textAlign: 'center',
                                }}
                            >
                                {!openCheckOut && !openCheckIn ? "Add dates" : props.checkOut}
                            </Typography>
                        </Box>

                    </Button>
                    <Button id="4"
                        sx={{
                            borderRadius: '40px',
                            width: '35%',
                            display: 'flex',
                            backgroundColor: isClicked.id === 4 && props.showPopUp === 4 && 'white',
                            boxShadow: isClicked.id === 4 && props.showPopUp === 4 && '0px 8px 12px rgba(0, 0, 0, 0.4)',
                            '&:hover': { backgroundColor: isClicked.id === 4 && props.showPopUp === 4 ? 'white' : 'grey' },
                            textTransform: 'none !important',
                        }}
                        onClick={() => { props.setShowPopUp(4); setIsClicked({ id: 4, flag: true }); }}
                    >
                        <Box sx={{ flexDirection: 'column', textAlign: 'left', paddingLeft:1.2 }}>
                            <Typography
                                color="black"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    mb: '5px', // Adds margin bottom of 5px
                                }}
                            >
                                Who
                            </Typography>

                            <Typography
                                color="black"
                                sx={{
                                    fontSize: '11px',
                                    textAlign: 'center',
                                }}
                            >
                                {who()}
                            </Typography>
                        </Box>
                        {
                            isClicked.id === 4 &&
                            <Button
                                sx={{
                                    ml: 2,
                                    paddingRight:3.4,
                                    minWidth: '40%',
                                    minHeight: '90%',

                                    borderRadius: '40px',
                                    backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',
                                    '&:hover': { backgroundImage: 'linear-gradient(to right, hsl(0, 80%, 35%), hsl(5, 80%, 40%), hsl(10, 80%, 50%))' },
                                    textTransform: 'none !important',
                                }}
                                onClick={() => {setOpenMenu(2); setIsClicked({ id: 0, flag: true }); }}
                                startIcon={<SearchIcon sx={{ color: 'white', ml: 0.5 }} />}
                            >
                                <Typography
                                    color="white"
                                    fontWeight='600'
                                    fontSize="14px"
                                >

                                    Search
                                </Typography>

                            </Button>
                        }
                        {
                            isClicked.id !== 4 &&
                            <Button
                            onClick={() => {setOpenMenu(2); setIsClicked({ id: 0, flag: true }); }}
                                endIcon={ // icon goes to the right side of the button
                                    <SearchIcon
                                        sx={{
                                            backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            color: 'white',
                                            alignItems: 'right'
                                        }}
                                    />
                                }
                            >
                            </Button>
                        }
                    </Button>


                </Box >
            }

            {
                openMenu === 2 &&
                <Box sx={{ flexGrow: 1, display: { xs: 'center', md: 'flex' } }}>
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: '40px',
                            backgroundColor: 'white',
                            borderWidth: '1px',
                            borderColor: '#606060',
                            borderStyle: 'solid',

                            transition: 'all 0.1s ease',
                            minWidth: '250px',
                            textTransform: 'none',

                            '&:hover': {
                                backgroundColor: '#dedede',
                                borderColor: 'black',
                                borderWidth: '2px',
                            },

                        }}
                        onClick={() => setOpenMenu(1)}
                        endIcon={ // icon goes to the right side of the button
                            <SearchIcon
                                sx={{
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    color: 'white',
                                }}
                            />
                        }
                    >

                        <Typography color="black" fontSize={'12px'} > {where(true)} </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ borderRightWidth: 1, borderColor: '#606060', ml: 1, mr: 1 }} />

                        <Typography color="black" fontSize={'12px'} > {props.checkIn} - {props.checkOut} </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ borderRightWidth: 1, borderColor: '#606060', ml: 1, mr: 1 }} />

                        <Typography color="black" fontSize={'12px'} > {who()} </Typography>


                    </Button >
                </Box >
            }



        </>
    )
}