import React from 'react'
import Card from './Card'
import Papa from 'papaparse';

export default function Main() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        // Function to read and parse the CSV data
        const fetchData = async () => {
            const csvFilePath = './csv/listings.csv.csv';
            const response = await fetch(csvFilePath);
            const text = await response.text();

            // Use PapaParse to parse the CSV data
            const parsedData = Papa.parse(text, { header: true });

            // Check for parsing errors
            if (parsedData.errors.length > 0) {
                console.error('Error parsing the CSV data:', parsedData.errors);
                return;
            }

            // Get the records from the parsed data
            const records = parsedData.data;
            setData(records);
        };

        fetchData();
    }, []);




    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            padding: "10px",
            marginTop: "30px"
        }}>
            {data.map((item) => (
                <Card
                    key={item.id}
                    img={item.picture_url}
                    city={item.city}
                    country={item.country}
                    rating={item.rating}
                    distance={item.distance}
                    date={item.date}
                    price={item.price}
                />
            ))}
        </div>
    )

}