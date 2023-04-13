import React from 'react';
import AuthScreen from './authenticate';
import { useSelector } from 'react-redux';
import {
  selectUser
} from '../store/user/authSlice';
import DashScreen from './dashboard';



function MainScreen(props) {


  var user = useSelector(selectUser);

  return (
    <div>
      
      {!user ? (<AuthScreen />) : (  <DashScreen />)}
    </div>
  );
}

export default MainScreen;
