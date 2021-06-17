import {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorld'


class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            welcomeMessage: ''
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render(){
        return (

            <div>
                <h1>Welcome!</h1>
                <div className="container"> Welcome, {this.props.match.params.name}!
                       You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container"> Click here to get a customizeed welcome message
                     <button onClick={this.retrieveWelcomeMessage} 
                     className="btn btn-success">Get Welcome Message</button>  
                </div>
                <div className="container"> 
                    {this.state.welcomeMessage} 
                </div>
            </div>
            
        )
    }

    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(Response => this.handleSuccessfulResponse(Response))
        // // .catch()

        // HelloWorldService.executeHelloBeanService()
        // .then(Response => this.handleSuccessfulResponse(Response))
        // // .catch()

        HelloWorldService.executeHelloWorldPathService(this.props.match.params.name)
        .then(Response => this.handleSuccessfulResponse(Response))
        // .catch()
    }

    handleSuccessfulResponse(Response){
        this.setState({
            welcomeMessage: Response.data.message
        })
    }
}

export default WelcomeComponent