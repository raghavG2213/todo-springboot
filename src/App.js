// import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import { Component } from 'react';
import TodoApp from './Component/todo/TodoApp'


class App extends Component{
  render(){
    return (
      <div className="App">
        <TodoApp/>
      </div>
    )
  }

}

export default App;
