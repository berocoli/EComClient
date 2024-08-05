import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'  // Ensure this line is present to import the CSS
import App from './App'
import FormComponent from './loginComponent/login'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
