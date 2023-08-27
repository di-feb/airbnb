import React from 'react';

export default function Logo() {

    const [count, setCount] = React.useState(0);

    // Redirects the user to Homepage 
    React.useEffect(() => {
        count && window.location.replace('/');
    }, [count]);

    return (
        <img src={require('./images/logo.png')}
            className='logo'
            alt="logo"
            onClick={() => setCount(prevCount => prevCount + 1)}
        />
    );

}