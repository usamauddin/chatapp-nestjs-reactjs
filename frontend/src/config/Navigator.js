import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import Home from '../screens/home/Home'
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import URL from "./api";



export default function Navigator() {

    const [ cookies, setCookies ] = useState()
    // const [tokenExpiration, setTokenExpiration] = useState(null)
    
    const data = useSelector(state => state.userReducer.user)
    // console.log(data)
    
    const getCookie = async () => {
        await axios.get(`${URL}/auth/cookies`, { withCredentials: true })
            .then(res => {
                setCookies(res.data.cookies)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCookie()
    }, [])
    
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/home' element={<Home />} /> */}
                <Route path='/home' element= {<Home /> } />
            </Routes>
        </Router>
    );
}


function ProtectedRoute(data, component, navigateTo = '/') {
    return data ? component : <Navigate to={navigateTo} />;
}