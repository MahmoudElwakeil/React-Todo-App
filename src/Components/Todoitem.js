import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '../CSS/Todoitem.css';
import '../CSS/TodoInput.css';

class Todoitem extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }
  removeTodo(id) {
    this.props.removeTodo(id);
  }
  editTodo(todoItem) {
    this.props.editTodo(todoItem);
  }
  doneUndone(id) {
    this.props.doneUndone(id);
  }
  openEditMode() {
    this.setState({ editMode: true, changedText: this.props.todo.text });
  }
  handleEditMode(e) {
    if (e.key === 'Enter') {
      this.saveEdit();
    }
    else if(e.key === 'Escape'){
      this.setState({ editMode: false });
      Alert.info("Edit Cancelled", {
        position: 'bottom-right',
        effect: 'slide',
      });
    }
  }
  saveEdit(){
    this.setState({ editMode: false });
    Alert.success("TODO, Edited Successfully", {
      position: 'top-right',
      effect: 'slide',
    });
        this.editTodo({ id: this.props.todo.id, text: this.state.changedText, done: this.props.todo.done });
  }
  handleTextChange(e) {
    let newText = e.target.value;
    this.setState({ changedText: newText });
  }
  handleOnBlur(){
    this.setState({ editMode: false });
    //this.saveEdit();
  }
  render() {
    return (
      <div className="todoitem" onDoubleClick={this.openEditMode.bind(this)}>
        <button type="button" className="btn btn-danger"
          onClick={(e) => this.removeTodo(this.props.todo.id)}>Remove TODO</button>
        <input type="checkBox" style={{ fontsize: 'x-large' }} onClick={(e) => this.doneUndone(this.props.todo.id)} />
        <div className="form-control input-lg" type="text"
          onClick={(e) => this.editTodo(this.props.todo)}
          style={{ display: !this.state.editMode ? 'inline' : 'none' }}>{this.props.todo.text}</div>
        <input type="text" value={this.state.changedText} className="form-control input-lg"
          onKeyDown={this.handleEditMode.bind(this)}  
          onChange={this.handleTextChange.bind(this)} onBlur={this.handleOnBlur.bind(this)}
          style={{ display: this.state.editMode ? 'inline' : 'none' }} />
      </div>
    );
  }
}
export default Todoitem;