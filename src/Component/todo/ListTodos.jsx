import moment from 'moment'
import {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class ListTodosComponent extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            message: null
        }
        this.addTodoClicked=this.addTodoClicked.bind(this)
        this.updateTodoClicked=this.updateTodoClicked.bind(this)
        this.deleteTodoClicked=this.deleteTodoClicked.bind(this)
        this.refreshTodos=this.refreshTodos.bind(this)
    }

    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos(){
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retreiveAllTodos(username)
        .then(
            Response => {
                // console.log(Response)
                this.setState({
                    todos: Response.data
                })
            }
        )
    }

    addTodoClicked(){
        console.log("add")
        this.props.history.push(`/todos/-1`)
        
    }

    updateTodoClicked(id){
        console.log("update", id)
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUsername()
        // // console.log(id,username)
        // TodoDataService.updateTodo(username, id)
        // .then(
        //     Response => {
        //         this.setState({
        //             message: `Delete of todo ${id} Successful`
        //         })
        //         this.refreshTodos()
        //     }
        // )

    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername()
        // console.log(id,username)
        TodoDataService.deleteTodo(username, id)
        .then(
            Response => {
                this.setState({
                    message: `Delete of todo ${id} Successful`
                })
                this.refreshTodos()
            }
        )

    }

    
    render(){
        return (
            <div> 
                <h1>
                    List Todos
                </h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>    
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map((todo,index) =>  
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }  
                        </tbody>    
                    </table>      
                </div>
                <div>
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add New Todo</button>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent