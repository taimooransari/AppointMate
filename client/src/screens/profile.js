import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/authSlice";
function ProfileScreen() {

  var user = useSelector(selectUser);
  return (
    <div>
      <h1>Your Profile</h1><br /><br /><br />
      <h4><b>Name :</b><br />{user.name} </h4><br /><br />
      <h4><b>Email :</b><br />{user.email} </h4>
    </div>
  )
}

export default ProfileScreen;