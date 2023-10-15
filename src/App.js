
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import Host from "./Host";
import Accommodation from "./Accommodation";
import ContactHost from "./ContactHost";
import HostHome from "./HostHome";
import Admin from './admin/Admin';
import "./css/style.css"


export default function App() {


    return (

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/host" element={<Host />} />
                <Route path="/hostHome" element={<HostHome />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/contactHost" element={<ContactHost />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>

    );
}
