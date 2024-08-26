import React from "react";

const uName = sessionStorage.getItem('userName');
const uEmail = sessionStorage.getItem('userEmail');

const Profile = () => {
    return (
        <div className="flex flex-colm shadow-xl">
            <div className="bg-white p-8 rounded-lg w-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {uName}</h1>
                <p className="text-gray-600">Email: {uEmail}</p>
            </div>
        </div>
    );
}

export default Profile;