import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Main() {
    const [listingData, setListingData] = useState([]);
    const [calendarData, setCalendarData] = useState([]);
    const [availableDates, setAvailableDates] = useState({});
    const [dataReady, setDataReady] = useState(false);

    function formatDate(dateString) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];

        return `${day} ${month}`;
    }

    const fetchData = async () => {
        try {
            const [listingsResponse, calendarResponse] = await Promise.all([
                axios.get('http://localhost:8080/listings'),
                axios.get('http://localhost:8080/calendar'),
            ]);

            if (listingsResponse.status === 200 && calendarResponse.status === 200) {
                return {
                    listings: listingsResponse.data,
                    calendar: calendarResponse.data,
                };
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const { listings, calendar } = await fetchData();

                if (listings && calendar) {
                    setListingData(listings);
                    setCalendarData(calendar);
                    setDataReady(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndSetData();
    }, []);


    useEffect(() => {
        // Create a dictionary to store available dates for each listing ID
        const availableDatesMap = {};
        let findFirstDate = false;
        let findLastDate = false;
        let firstDate = '';
        let lastDate = '';
        let listingId = 0;


        for (const entry of calendarData) {
            if (entry.listing_id !== listingId) {
                findFirstDate = false;
                findFirstDate = false;

            }
            listingId = entry.listing_id;

            if (entry.available === 't' && findFirstDate === false) {
                firstDate = entry.date;
                findFirstDate = true;
                continue;
            }
            if (entry.available === 'f' && findFirstDate === true) {
                lastDate = entry.date;
                findLastDate = true;
            }
            if (!(listingId in availableDatesMap) && findLastDate === true) {
                availableDatesMap[listingId] = `${formatDate(firstDate)} - ${formatDate(lastDate)}`;
            }

        }
        setAvailableDates(availableDatesMap);
    }, [calendarData]);


    if (!dataReady) {
        // Data is not ready yet, show loading or placeholder
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="20vh"

            >
                <img
                    loading="lazy"
                    src={require('./images/stitch.png')}
                    width='400px'
                    height='500px'
                    style={{ position: 'absolute', borderRadius:'10%', top:'50%', transform: 'translateY(-50%)' }}
                >
                </img>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                    zIndex='2'
                >
                    <Typography fontSize={20}>
                        The page is still loading...
                    </Typography>
                    <CircularProgress sx={{ maxWidth: '30px', maxHeight: '30px', ml: 2 }} />

                </Box>
            </Box>
        );
    }


    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                padding: '10px',
                marginTop: '30px',
            }}
        >
            {listingData.map((item) => (
                <Card
                    key={item.id}
                    img={item.picture_url}
                    city={item.city}
                    country={item.country}
                    rating={item.review_scores_rating}
                    property_type={item.property_type}
                    date={availableDates[item.id]}
                    price={item.price}
                />
            ))}
        </div>
    );
}
