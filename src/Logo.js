export default function Logo(props) {
    return (
        <img src={require('./images/logo.png')} alt="logo" width={"100px"} href={props.href}/>
    );
  }