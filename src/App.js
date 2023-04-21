
import AppRoute from "./AppRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import Host from "./Host";
import "./css/style.css"


export default function App() {
    const path = window.location.pathname

    const currentPath = ( (path === "/") ? <Home /> : null)
  
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/host" element={<Host />} />
                </Routes>
            </Router>
            {currentPath}

            
        </div >
    );
}
