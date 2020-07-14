import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
        
    }

 removeItem(e) {
        this.props.removeTodo(e);
    }

    DeleteStudent = () => {
        debugger;
     
        axios.delete('http://localhost:3001/todo/Delete/' + this.props.obj.id)
            .then(response => {
                debugger;
              console.log("Testing")
               // this.props.parentCallback("Hey Popsie, How’s it going?");
                this.props.onSubmitMessage("Hey Popsie, How’s it going?");

            })
            .catch(function (error) {
                console.log(error);
            })

      
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.priority}</td>
                <td>{this.props.obj.isCompleted ? 'Yes' : 'No'}</td>

                <td>
                    <Link to={"/edit/" + this.props.obj.id} className="btn btn-success">Edit</Link>&nbsp;&nbsp;&nbsp;
                    <button type="button" onClick={this.DeleteStudent} className="btn btn-danger">Delete</button>

                </td>


            </tr>
        );
    }

}

export default Table;  