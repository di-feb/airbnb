import React from 'react';
import StarIcon from '@mui/icons-material/Star';


export default function Card(props) {
    const [imageError, setImageError] = React.useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="card">
            <a href="/accomondation">
                {imageError ? (
                    <img
                        className="card--image"
                        src={require("./images/notAvailable.png")}
                        alt="Default"
                    />
                ) : (
                    <img
                        className="card--image"
                        src={props.img}
                        alt={props.city}
                        onError={handleImageError}
                    />
                )}
            </a>
            <div className='card--text'>
                <div className='card--country'>

                    <span className="bold">{props.city}, {props.country}</span>
                    {
                        props.rating !== '' &&

                        <div className='card--rating'>
                            <StarIcon  sx={{ color: 'red', height: '14px'}} />
                            {(props.rating / 20).toFixed(1)}
                        </div>
                    }
                </div>
                <span className='gray'>{props.property_type}</span>
                <span className='gray'>{props.date}</span>
                <div className='card--price'>
                    <span className="bold">{props.price.slice(0, -3) } </span>
                    <span> night </span>
                </div>

            </div>
        </div>
    )
}