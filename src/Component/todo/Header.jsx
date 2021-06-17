import {Component} from 'react'
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService'

class HeaderComponent extends Component{
    render(){

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        
        return(
            <header> 
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div> 
                        <a href="http://www.in28minutes.com" className="navbar-brand">RG</a>
                    </div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className="nav-link"> <Link to="/welcome/rgUser">Home</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className="nav-link"><Link to="/">Login</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        //     <div>
        //         Header<hr/>
        //     </div>
        )
    }
}

export default withRouter(HeaderComponent)