import React from "react";
import "./Profile.css";

const uName = sessionStorage.getItem('userName');
const uEmail = sessionStorage.getItem('userEmail');

const Profile = () => {
    return (
        <div className="profile-container">
        <h1>Welcome, {uName}</h1>
        <p>Email: {uEmail}</p>
        </div>
    );
}
export default Profile;