import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginList from "./components/login.component";
import SignUpComponent from "./components/sign-up.component";
import HomeList from "./components/home";
import ProfilePage from "./components/user-profile.component";
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    config.headers["x-access-token"]= localStorage.getItem("token");
    return config;
  },
  error => {
    return Promise.reject(error)
  }

)

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" exact component={LoginList} />
        <Route path="/SignUp" component={SignUpComponent} />
        <Route path="/file-store/:id" component={HomeList} />
        <Route path="/profile" component={ProfilePage} />
      </div>
    </Router>
  );
}


export default App;
