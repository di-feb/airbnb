import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';

export default function AppRoute() {
    <Router>
        <Routes>
            <Route path="/home" element={<Home />} />   
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
}