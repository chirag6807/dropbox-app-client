import Sidebar from "./dashboard-material.js";

import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from "react-moment";
import moment from "moment";
var ImageBaseData;

export default class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            address: '',
            errors: {},
            profilePath: ''
        }
    }



    componentDidMount() {
        axios.get('http://localhost:3001/login/GetUserById/' + localStorage.getItem("userId"))
            .then(response => {
                debugger;
                this.setState({
                    userId: response.data.userId,
                    userName: response.data.userName,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    dob: response.data.dob,
                    address: response.data.address,
                    profilePath: response.data.profilePath
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    onSubmit = (e) => {
        debugger;
        let userName = this.state.firstName + " " + this.state.lastName;
        e.preventDefault();
        const objectData = {
            userId: this.state.userId,
            userName: userName,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob != null  ? new Date(this.state.dob) : null,
            address:this.state.address != null  ? this.state.address :'',
            profilePath:  this.state.profilePath != null  ? this.state.profilePath :'',
        };
        debugger;
        axios.put('http://localhost:3001/login/UpdateUser', objectData)
            .then(res => {
                toast.success("User Profile updated Successfully!");
                setTimeout(function () {
                    window.history.pushState(null, null, window.location.replace('/file-store/Home'));
                  //  window.location.replace('/file-store');
                }, 1000);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // _handleImageChange(e) {
    //     e.preventDefault();

    //     let reader = new FileReader();
    //     let file = e.target.files[0];

    //     reader.onloadend = () => {
    //       this.setState({
    //         file: file,
    //         profilePath: reader.result
    //       });
    //     }

    //     reader.readAsDataURL(file)
    //   }

    //Image Upload Code
    handleFileInput = (e) => {
        debugger;
        let userName = this.state.firstName + " " + this.state.lastName;
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        var temp = '';
        reader.onloadend = () => {
        
            this.setState({
                userId: this.state.userId,
                userName: userName,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dob: this.state.dob ? new Date(this.state.dob) : null,
                address: this.state.address,
                profilePath: reader.result
            })
        };
     
        reader.readAsDataURL(file);
    }

    validateForm() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.firstName) {
            formIsValid = false;
            errors["firstName"] = "*Please enter your first name.";
        }
        if (fields.firstName !== "") {
            if (!fields.firstName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["firstName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields.lastName) {
            formIsValid = false;
            errors["lastName"] = "*Please enter your last name.";
        }
        if (fields.lastName !== "") {
            if (!fields.lastName.match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["lastName"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }
        if (fields["email"] !== "") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email.";
            }
        }
        this.setState({
            errors: errors
        });
        console.log(this.state.errors);
        return formIsValid;
    }


    render() {
        return (
            <>
                <Sidebar></Sidebar>

                <div>
                    <form onSubmit={this.onSubmit}>
                        <center><h1 className="h3 mb-3 font-weight-normal" > Edit User Profile</h1></center>

                        <div className="form-group">
                        <input type="file" accept="" name="Upload Profile" onChange={this.handleFileInput} />
                        <img src={this.state.profilePath}  className="rounded-circle"/>
                        </div>                        
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="Please Enter First Name" name="firstName"
                                onChange={this.onChangeHandler} value={this.state.firstName} />
                            <span className="errorMsg">{this.state.errors.firstName}</span>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Please Enter Last Name" name="lastName"
                                onChange={this.onChangeHandler} value={this.state.lastName} />
                            <span className="errorMsg">{this.state.errors.lastName}</span>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Please Enter Email" disabled name="email"
                                onChange={this.onChangeHandler} value={this.state.email} />
                            <span className="errorMsg">{this.state.errors.email}</span>
                        </div>

                        <div className="form-group">
                            <label>DOB</label>
                            <input type="date" className="form-control" placeholder="Please select DOB" name="dob"
                                onChange={this.onChangeHandler} value={moment(this.state.dob).format("YYYY-MM-DD")} />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea className="form-control rounded-0" rows="2" placeholder="Please Enter Address" name="address"
                                onChange={this.onChangeHandler} value={this.state.address}></textarea>

                        </div>


                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                    <ToastContainer />

                </div>




            </>
        )
    }
}


// export default TodosList;