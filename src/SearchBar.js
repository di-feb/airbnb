import React from 'react';
import { Box } from '@mui/material';
import { InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function SearchBar() {

    const [openMenu, setOpenMenu] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(0);

    return (
        <>
            {!openMenu &&
                <Box sx={{ flexGrow: 1, display: { xs: 'center', md: 'flex' } }}>
                    <Button    // This is a button with outlinedInputs for children
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
                                backgroundColor: 'white',
                                borderColor: 'black',
                                borderWidth: '2px',
                            },

                        }}
                        onClick={() => setOpenMenu(true)}
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

                        <Typography color="grey" fontWeight={openMenu && '600'} >
                            Search for accomondation
                        </Typography>

                    </Button >
                </Box >}

            {openMenu &&

                <Box sx={{
                    mr: '200px',
                    ml: '80px',
                    flexGrow: 2,
                    display: { xs: 'center', md: 'flex' },
                    borderRadius: '40px',
                    backgroundColor: 'white',
                    borderWidth: '3px',
                    borderColor: '#606060',
                    borderStyle: 'solid',

                    transition: 'all 0.1s ease',
                    height: '60px',

                    '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'black',
                        borderWidth: '3px',
                    },

                }}
                >


                    <Button 
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: 'grey' },
                        }}
                        onClick={()=> setIsClicked(1)}
                    >
                        <Typography
                            color="black"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '13px',
                                mb: '5px', // Adds margin bottom of 5px
                                
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
                            Destination search
                        </Typography>
                    </Button>
                   

                    <Button 
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            '&:hover': { backgroundColor: 'grey' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
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
                            Add dates
                        </Typography>
                    </Button>
                    <Button id="3"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            '&:hover': { backgroundColor: 'grey' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={() => setIsClicked({id: 4, where: true})}
                    >
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
                            Add dates
                        </Typography>
                    </Button>
                    <Button id="4"
                        sx={{
                            borderRadius: '40px',
                            width: '20%',
                            '&:hover': { backgroundColor: 'grey' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onClick={() => setIsClicked({id: 4, where: true})}
                    >
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
                            Add guests
                        </Typography>
                    </Button>
                    <Button sx={{
                        minWidth: '20%',
                        borderRadius: '30px',
                        backgroundImage: 'linear-gradient(to right, #d70000, #ff2615, #ff5a3c)',


                    }}
                        endIcon={<SearchIcon sx={{ color: 'white' }} />}
                    >
                        <Typography color="white" fontWeight='600'>
                            Search
                        </Typography>
                    </Button>

                </Box >
            }
        </>
    )
}