import { Component } from "react";
import axios from "axios";

class TodoDataService extends Component{
    
    retreiveAllTodos(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }

    retreiveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    createTodo(name, todo) {
        return axios.post(`http://localhost:8080/users/${name}/todos`, todo)
    }

    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }


}

export default new TodoDataService()