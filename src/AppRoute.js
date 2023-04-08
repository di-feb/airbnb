import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';

export default function AppRoute() {
    <Router>
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
}