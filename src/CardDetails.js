import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
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

export default function CardDetails(props) {

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, ml: 30 }}>
                <Typography fontSize='21px' >
                    {props.title}
                </Typography>
                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row' }} >
                    <StarIcon sx={{ color: 'red', height: '14px', mt: '1px' }} />
                    {props.rating}  ·  {props.reviews} reviews  ·  {props.city}, {props.country}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImageList
                        sx={{ width: 1000, height: 444, borderRadius: '15px' }}
                        variant="quilted"
                        cols={4}
                        rowHeight={220}
                    >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 401, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Button
                        variant='contained'
                        startIcon={<CollectionsIcon />}
                        sx={{
                            backgroundColor: "white",
                            color: 'black',
                            fontSize: '10px',
                            position: 'absolute',
                            borderRadius: '15px',
                            mt: 50,
                            ml: 105,
                            '&:hover': {
                                backgroundColor: '#818181',

                            },
                        }}

                    >
                        Show all photos
                    </Button>
                </Box>
                <Typography fontSize='18px' sx={{ mt: 3 }} >
                    {props.typeOfPlace} hosted by {props.hosterName}
                </Typography>
                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row' }} >
                    {props.guests} guests  ·  {props.bedrooms} bedrooms  ·  {props.beds} beds  ·  {props.baths} baths
                </Typography>

                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />

                <Typography fontSize='18px' sx={{ mt: 3 }} >
                    What this place offers
                </Typography>

                <Typography fontSize='15px' sx={{ mt: 1 }} >
                    Space
                </Typography>

                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >
                    <CottageOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                    Type of place:{props.typeOfPlace}        
                </Typography>

                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >
                    <BedroomChildOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                    Bedrooms:{props.bedrooms}
                </Typography>

                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                    <AirlineSeatIndividualSuiteOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                    Beds:{props.beds}


                </Typography>
                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                    <BathroomOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />
                    Bathrooms:{props.baths}

                </Typography>

                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                    <FenceOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />


                </Typography>

                <Typography fontSize='12px' sx={{ display: "flex", flexDirection: 'row', mt: 2 }} >

                    <ChairOutlinedIcon sx={{ height: '24px', mt: '-5px' }} />


                </Typography>


                <Divider sx={{ borderColor: '#606060', mt: 2, width: '550px' }} />


            </Box>
        </>
    )
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },

];