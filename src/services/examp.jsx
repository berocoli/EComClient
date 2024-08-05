import React from "react";
fetch("localhost:5060/api/Customers/list", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(response => response.json())
.catch(error => console.error('Error:', error));