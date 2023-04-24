import React from 'react';
import AuthScreen from './authenticate';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUser
} from '../store/user/authSlice';
import DashScreen from './dashboard';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { fetchData } from '../store/user/authSlice';
import { auth } from '../fire';

function MainScreen(props) {


  var user = useSelector(selectUser);
  const dispatch = useDispatch();


  // const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = u.uid;
        // ...
        dispatch(fetchData(uid));



      }
    });


  }, [])









  return (
    <div>

      {!user ? (<AuthScreen />) : (<DashScreen />)}
    </div>
  );
}







export default MainScreen;
