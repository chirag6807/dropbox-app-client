import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginList from "./components/login.component";
import SignUpComponent from "./components/sign-up.component";
import HomeList from "./components/home";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import ProfilePage from "./components/user-profile.component";
// import logo from "./logo.png";


function App() {
  return (
    <Router>
    <div className="container">
          <br/>
          <Route path="/" exact component={LoginList} />        
          <Route path="/SignUp"  component={SignUpComponent} />
          <Route path="/file-store/:id" component={HomeList} />      
          <Route path="/profile" component={ProfilePage} />
          {/* <Route path="/file-store/:id" component={FileList} /> */}
          {/* <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} /> */}
          {/* <Route path="/file-store" component={FileStoreList} /> */}
        </div>
    </Router>
  );
}

export default App;
