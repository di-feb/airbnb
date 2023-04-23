import StarIcon from '@mui/icons-material/Star';



export default function Card(props) {
    return (
        <div className="card">
            <a href="/accomondation">
                <img src={require(`./images/${props.img}`)} className="card--image" />
            </a>
            <div style={{ display: "flex", flexDirection: 'column' }}>
                <div style={{ display: "flex", flexDirection: 'row' }}>

                    <span className="bold">{props.city}, {props.country}</span>
                    <span style={{ display: "flex", flexDirection: 'row' }}>
                        <StarIcon sx={{ color: 'red', height: '14px', ml: '85px' }} />
                        {props.rating}
                    </span>
                </div>
                <span className='gray'>{props.distance} away</span>
                <span className='gray'>{props.date}</span>
                <span className="bold">${props.price} per night</span>

            </div>
        </div>
    )
}