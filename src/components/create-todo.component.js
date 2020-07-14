import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            priority: '',
            isCompleted: false
        }
    }

    onChangeTodo = (event) => {
        debugger;
        let nam = event.target.name;
        let val = event.target.value;

        this.setState({ [nam]: val });
    }

    onSubmit = (e) => {
        debugger;
        e.preventDefault();
        if(this.state.description === ''){
            toast.error("Please add description!");
            return;
        }
        if(this.state.priority === ''){
            toast.error("Please select priority!");
            return;
        }
        const newTodo = {
            description: this.state.description,
            priority: this.state.priority,
            isCompleted: this.state.isCompleted
        };
        axios.post('http://localhost:3001/todo/AddToDo', newTodo)
            .then(res => {
                toast.success("ToDo Added Successfully!");
                this.props.history.push('/');
                this.setState({
                    description: '',
                    priority: '',
                    isCompleted: false
                })
            })
            .catch(function (error) {
                console.log(error);
            })
      
    }


    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            name="description"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeTodo}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priority"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.priority === 'Low'}
                                onChange={this.onChangeTodo}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priority"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.priority === 'Medium'}
                                onChange={this.onChangeTodo}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priority"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.priority === 'High'}
                                onChange={this.onChangeTodo}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                        <ToastContainer />
                    </div>
                </form>
            </div>
        )
    }
}