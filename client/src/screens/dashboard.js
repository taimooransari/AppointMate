import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    logoutUser, selectUser
} from '../store/user/authSlice';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { ReactComponent as Logo } from "../logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route} from "react-router-dom";

import ProfileScreen from './profile';
import NotificationScreen from './notifications';
import AppointmentScreen from './appointment';

import { useNavigate } from "react-router-dom";
// import { createBrowserRouter } from "react-router-dom";


function NavBar(props) {

    const logout = () => {
        props.logout()
    }

    const navigate = useNavigate();
    // const navigate = () => { }
    const navigateScreen = (path) => {
        navigate(path);
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <Logo
                    alt=""
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                AppointMate
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav>

                    <Nav.Link onClick={() => { navigateScreen("/") }}> Home</Nav.Link>

                </Nav>




                <Nav>


                    <NavDropdown title="USER" id="collasible-nav-dropdown">





                        <NavDropdown.Item onClick={() => { navigateScreen("/profile") }}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => { navigateScreen("/notification") }}>Notifications</NavDropdown.Item>


                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            Sign Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

            </Navbar.Collapse>


        </Navbar>)
}


function DashScreen(props) {
    const dispatch = useDispatch();

    var user = useSelector(selectUser);
    // console.log(user)

    const logoutBtn = () => {

        dispatch(logoutUser())
    }



    return (


        <div>

            {/* <NavBar logout={logoutBtn} /> */}

            <BrowserRouter>

                <NavBar logout={logoutBtn} />
                <Routes>

                    {/* <Route path="/*" element={<NavBar logout={logoutBtn} />} /> */}
                    <Route path="/*" element={<AppointmentScreen />} />
                    <Route path="profile" element={<ProfileScreen />} />
                    <Route path="notification" element={<NotificationScreen />} />
                    {/* </Route> */}
                </Routes>
            </BrowserRouter>


        </div>

    );
}

// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <DashScreen />,
//       children: [
//         // {
//         //   path: "",
//         //   element: <AppointmentScreen />,
//         // },
//         {
//           path: "profile",
//           element: <ProfileScreen />,
//         },
//         {
//             path: "notification",
//             element: <NotificationScreen />,
//           },
//       ],
//     },
//   ]);

export default DashScreen;
