import React, { useEffect, useState } from 'react';
import Card from './Card';
import Papa from 'papaparse';
import listings from './csv/listings.csv';
import calendar from './csv/calendar.csv';

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

    const fetchData = async (csvFilePath) => {
        try {
            const response = await fetch(csvFilePath);
            const text = await response.text();
            // Use PapaParse to parse the CSV data
            const parsedData = Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                delimiter: ',',
            });
            // Check for parsing errors
            if (parsedData.errors.length > 0) {
                console.error('Error parsing the CSV data:', parsedData.errors);
                return null;
            }
            // Get the records from the parsed data
            const records = parsedData.data;
            return records;
        } catch (error) {
            console.error('Error fetching or parsing the CSV file:', error);
            return null;
        }
    };

    useEffect(() => {
        async function fetchDataAndSetListingData() {
            const records = await fetchData(listings);
            if (records) {
                setListingData(records);
            }
        }
        async function fetchDataAndSetCalendarData() {
            const records = await fetchData(calendar);
            if (records) {
                setCalendarData(records);
            }
        }

        Promise.all([fetchDataAndSetListingData(), fetchDataAndSetCalendarData()])
            .then(() => setDataReady(true))
            .catch((error) => console.error('Error fetching data:', error));
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
        return <div>Loading...</div>;
    }


    return (
        <div
            accept=".csv"
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
