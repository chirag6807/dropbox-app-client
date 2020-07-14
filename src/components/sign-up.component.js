import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class SignUpComponent extends Component {
    constructor(props) {
        debugger
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errors: {}
        }
    }

    onChangeHandler = (event) => {
        debugger;
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    onSubmit = async (e) => {
        const { email, password,firstName,lastName } = this.state;
        let userName = this.state.firstName + " " + this.state.lastName;
        e.preventDefault();
        if (this.validateForm()) {
            try {
                const response = await axios.post(
                    'http://localhost:3001/login/AddUser', {
                    userName,
                    email,
                    password,
                    firstName,
                    lastName
                },
                );           
                toast.success("User Added Successfully!");
                setTimeout(function () {
                  //  window.location.replace('/');
                    window.history.pushState(null, null,  window.location.replace('/'));
                }, 1000);           
              
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
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

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }
        if (fields["password"] !== "") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
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



            <div id="logreg-forms">
                <form onSubmit={this.onSubmit} className="form-signin" >
                    <center><h1 className="h3 mb-3 font-weight-normal" > Sign Up</h1></center>

                    <input type="text" id="firstname" className="form-control"
                        placeholder="First Name" required=""
                        value={this.state.firstName} name="firstName"
                        onChange={this.onChangeHandler} />
                    <span className="errorMsg">{this.state.errors.firstName}</span>
                    <br></br>
                    <input type="text" id="lastname" className="form-control"
                        placeholder="Last Name" required="" name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChangeHandler} />
                    <span className="errorMsg">{this.state.errors.lastName}</span>
                    <br></br>
                    <input type="email" id="email" className="form-control"
                        placeholder="Email address" name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler} />
                    <span className="errorMsg">{this.state.errors.email}</span>
                    <br></br>
                    <input type="password" id="password" className="form-control"
                        placeholder="Password" required="" name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler} />
                    <span className="errorMsg">{this.state.errors.password}</span>
                    {/* <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt"></i> Sign in</button> */}
                    {/* <a href="#" id="forgot_pswd">Forgot password?</a> */}
                    <hr />
                    <button className="btn btn-primary btn-block" type="submit" id="btn-signup">
                        <i className="fas fa-user-plus"></i> Create an Account</button>
                    <ToastContainer />
                </form>
            </div>





        )
    }
}


// export default TodosList;