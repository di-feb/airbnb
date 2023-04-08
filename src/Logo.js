import React from 'react';

export default function Logo(props) {

    const [count, setCount] = React.useState(0);

    // Redirects the user to Homepage 
    React.useEffect(()=> {
        count && window.location.replace('/');
    }, [count]);
     
    const centerOfPage = props.windowWidth / 2
    const logoPosition =  (props.windowWidth > 700) ? "30px" : `${centerOfPage}px`
    console.log(logoPosition, props.windowWidth > 700, props.windowWidth)
    return (
        <img src={require('./images/logo.png')}
            alt="logo" 
            style={{ display: 'flex', maxWidth: '100px', maxHeight: '100px', marginTop: "-7px"}}
            onClick={() => setCount(prevCount => prevCount + 1)}
        />
        
    );

}