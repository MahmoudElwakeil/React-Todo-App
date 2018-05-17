import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import TodoInput from './Components/TodoInput';
import Todoitem from './Components/Todoitem';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        { id: 0, text: 'Study React Fundamentals', done: false },
        { id: 1, text: 'Perform Task', done: false },
        { id: 2, text: 'Finish All Interview Process', done: false },
        { id: 3, text: 'Get Hired and Relocation ISA', done: false }
      ],
      nextid: 4
    }
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.doneUndone = this.doneUndone.bind(this);
  }
  addTodo(todoText) {
    let temTodos = this.state.todoList;
    temTodos.push({ id: this.state.nextid, text: todoText, done: false });
    this.setState(
      {
        todoList: temTodos,
        nextid: this.state.nextid + 1
      }
    );
    Alert.success("TODO Added");
  }
  removeTodo(id) {
    Alert.info('TODO, ' + this.state.todoList.find(t => t.id == id).text + " Has been Deleted Successfully", {
      position: 'bottom-right',
      effect: 'slide',
    });
    this.setState(
      {
        todoList: this.state.todoList.filter((todo, index) => todo.id !== id),
        nextid: this.state.todoList.length
      }
    );
  }
  editTodo(todo) {
    let tempTodoList = this.state.todoList;
    tempTodoList.find(t => t.id == todo.id).text = todo.text;
    this.setState({ todoList: tempTodoList });
  }
  doneUndone(id) {
    let temTodos = this.state.todoList;
    let targetTodo = temTodos.find(t => t.id == id);
    if (targetTodo != null) {
      targetTodo.done = !targetTodo.done;
    }
    Alert.success("TODO, " + targetTodo.text + (targetTodo.done == true ? " Is Done " : " Is Undone"),
      {
        position: 'top-right',
        effect: 'slide',
      });
    this.setState(
      {
        todoList: temTodos,
      }
    )
  }
  clearcompletedTodos() {
    let uncompletedTodos = this.state.todoList.filter(t => t.done == false);
    this.setState({ todoList: uncompletedTodos });
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <div className="container">
          <TodoInput addTodo={this.addTodo} todoText=""></TodoInput>
          <ul>{
            this.state.todoList.map((todo) => {
              return <Todoitem todo={todo} key={todo.id} id={todo.id}
                removeTodo={this.removeTodo} editTodo={this.editTodo}
                doneUndone={this.doneUndone}></Todoitem>
            })
          }
          </ul>
          <div>
            <p><h4>Total Tasks: {this.state.todoList.length}</h4></p>
            <p><h4>Completed Tasks: {this.state.todoList.filter(t => t.done == true).length}</h4></p>
            <p><h4>UnCompleted Tasks: {this.state.todoList.filter(t => t.done == false).length}</h4></p>
          </div>
          <button className="btn btn-primary" onClick={this.clearcompletedTodos.bind(this)}>Clear Completed</button>
        </div>
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

export default App;
