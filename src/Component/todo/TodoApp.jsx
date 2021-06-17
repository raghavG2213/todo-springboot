import {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginComponent from './Login'
import WelcomeComponent from './Welcome'
import ErrorComponent from './Error'
import ListTodosComponent from './ListTodos'
import HeaderComponent from './Header'
import FooterComponent from './Footer'
import LogoutComponent from './Logout'
import AuthenticatedRoute from './AuthenticatedRoute'
import TodoComponent from './TodoComponent'


class TodoApp extends Component{
    render(){
        return (
            <div className="TodoApp">
                <Router>
                    <div>
                    <HeaderComponent/>    
                    <Switch>
                        <Route exact path="/" component={LoginComponent}/>
                        <Route exact path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute exact path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute exact path="/todos" component={ListTodosComponent}/>
                        <AuthenticatedRoute exact path="/logout" component={LogoutComponent}/>
                        <AuthenticatedRoute exact path="/todos/:id" component={TodoComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>        
                    <FooterComponent/>        
                    
                    </div>
                </Router>
            </div>
        )
    }
}

export default TodoApp