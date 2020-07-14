import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            priority: '',
            isCompleted: false
        }
    }

    onChangeTodoCompleted = (event) => {
        this.setState({
            isCompleted: !this.state.isCompleted
        });
    }

    onChangeTodo = (event) => {
        debugger;
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/todo/GetById/' + this.props.match.params.id)
            .then(response => {
                debugger;
                this.setState({
                    id: response.data.id,
                    description: response.data.description,
                    priority: response.data.priority,
                    isCompleted: response.data.isCompleted
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: this.state.id,
            description: this.state.description,
            priority: this.state.priority,
            isCompleted: this.state.isCompleted
        };
        axios.put('http://localhost:3001/todo/UpdateToDo', newTodo)
            .then(res => {
                toast.success("ToDo updated Successfully!");
                this.props.history.push('/');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            id: this.state.id,
            description: this.state.description,
            priority: this.state.priority,
            isCompleted: this.state.isCompleted
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/', obj)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            name="description"
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
                    <div className="form-check">
                        <input className="form-check-input"
                            id="isCompleted"
                            type="checkbox"
                            name="isCompleted"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.isCompleted}
                            value={this.state.isCompleted}
                        />
                        <label className="form-check-label" htmlFor="isCompleted">
                            Completed
                    </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                        <ToastContainer />
                    </div>
                </form>
            </div>
        )
    }
}