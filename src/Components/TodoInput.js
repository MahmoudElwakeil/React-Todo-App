import React from 'react';
import Alert from 'react-s-alert';
import '../CSS/TodoInput.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

export default class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 'test' };

        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.addTodoOnEnter = this.addTodoOnEnter.bind(this);
    }
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    addTodo(todo) {
        //Ensure that the todo length > 0 then add this todo then reset the value of the textbox
        if (todo.length > 0) {
            this.props.addTodo(todo);
            this.setState({ value: '' });
        }
        else {
            this.showEmptyTODOWarning('jelly');
        }
    }
    showEmptyTODOWarning(effect) {
        Alert.warning("Please Enter TODO Text", {
            position: 'bottom-left',
            effect: effect,
        });
    }

    addTodoOnEnter(e) {
        if (e.key === 'Enter' && e.target.value.length > 0) {
            this.props.addTodo(e.target.value);
            this.setState({ value: '' });
        }
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <input className="form-control input-lg" type="text"
                        value={this.state.value} onChange={this.handleChange}
                        onKeyPress={this.addTodoOnEnter} />

                    <button type="button" className="btn btn-primary"
                        onClick={() => this.addTodo(this.state.value)}>Add TODO</button>
                </div>
            </div>
        );
    }
}