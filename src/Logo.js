import { Box } from '@mui/material';
import React from 'react';

export default function Logo(props) {

    const [count, setCount] = React.useState(0);

    // Redirects the user to Homepage 
    React.useEffect(() => {
        count && window.location.replace('/');
    }, [count]);

    return (
        <img src={require('./images/logo.png')}
            alt="logo"
            style={{ display: 'flex', maxWidth: '100px', maxHeight: '100px', marginTop: "-7px", cursor: 'pointer' }}
            onClick={() => setCount(prevCount => prevCount + 1)}
        />
    );

}