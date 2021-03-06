import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class LoginList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onSubmit = async (e) => {
        const { email, password } = this.state;
        e.preventDefault();
        if (this.validateForm()) {
            try {
                const response = await axios.post(
                    'http://localhost:3001/login/login',
                    {
                        email,
                        password,
                    },
                );
                localStorage.setItem('token', response.data.jwtoken);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userName', response.data.userName);
                window.history.pushState(null, null, window.location.replace('/file-store/Home'));
                this.setState({
                    email: '',
                    password: ''
                })
            } catch (error) {
                toast.error(error.response.data.error,{transition:Flip,autoClose:3000});
            }
        }
    }

    validateForm() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter email.";
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
        this.setState({
            errors: errors
        });
        console.log(this.state.errors);
        return formIsValid;
    }

    render() {
        return (
            <div id="logreg-forms">
                <form className="form-signin" onSubmit={this.onSubmit}>
                    <center><h1 className="h3 mb-3 font-weight-normal" > Login</h1></center>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                        required=""
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                    />
                    <span className="errorMsg">{this.state.errors.email}</span>
                    <br></br>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        required="" />
                    <span className="errorMsg">{this.state.errors.password}</span>
                    <button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i> Sign in</button>
                    {/* <a href="#" id="forgot_pswd">Forgot password?</a> */}
                    <hr />

                    <Link to={"/SignUp"} >
                        <button className="btn btn-primary btn-block" type="button" id="btn-signup">
                            <i className="fas fa-user-plus"></i> Sign up New Account</button>
                    </Link>
                    <ToastContainer />
                </form>
            </div>
        )
    }
}


// export default TodosList;