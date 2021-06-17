import { Component } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import Moment from 'moment'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: Moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
    }
    

   

    validate(values) {
        let errors={}
        if(!values.description){
            errors.description = 'Enter a description'
        }else if(values.description.length<5){
            errors.description = 'Enter a description length more than 4'
        }

        if(!Moment(errors.targetDate).isValid()){
            errors.targetDate = 'Enter a valid Date'
        }

        return errors;
    }

    onSubmit(values){

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            let username = AuthenticationService.getLoggedInUsername()
            TodoDataService.createTodo(username, todo).then(() => { this.props.history.push('/todos') })

            console.log(values)
        } else {

            let username = AuthenticationService.getLoggedInUsername()
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => { this.props.history.push('/todos') })

            console.log(values)
        }
    }

    componentDidMount(){

        if(this.state.id===-1){
            return
        }

        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retreiveTodo(username, this.state.id)
        .then(
            Response => {
                this.setState({
                    description: Response.data.description,
                    targetDate: Moment(Response.data.targetDate).format('YYYY-MM-DD')
                })
            }
        )
    }

    render(){
        let {description, targetDate} = this.state
        // let targetDate = this.state.targetDate
        return (
            <div>
                <h1>
                    Todo
                </h1>
                <div className="container">
                    <Formik 
                        initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                               <Form>
                                   <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                   <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                   <fieldset className="form-group">
                                       <label>Description</label>
                                       <Field className="form-control" type="text" name="description"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <label>Target Date</label>
                                       <Field className="form-control" type="date" name="targetDate"/>
                                   </fieldset>
                                   <button className="btn btn-success" type="submit">Save</button>
                               </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent