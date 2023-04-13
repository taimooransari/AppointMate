import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    logoutUser, selectUser
} from '../store/user/authSlice';
import { Button } from 'react-bootstrap';

function DashScreen(props) {
    const dispatch = useDispatch();

    var user = useSelector(selectUser);

    const logoutBtn = () => {

        dispatch(logoutUser())
    }



    return (


        <div>
            <h2>{user.name}</h2>
            <Button variant="link" onClick={logoutBtn}>
                Logout USER
            </Button>

        </div>

    );
}

export default DashScreen;
