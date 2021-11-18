import React, { Component } from 'react';
import './header.css';
import {NavLink} from 'react-router-dom';
import {authContext} from '../../contexts/authContext';

class Header extends Component {
    static contextType=authContext;

    render() {
        const {loginStatus}=this.context;
        return ( 
            <>
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <div className="container">

                        <a className="navbar-brand me-auto" href="/">
                            <div className="title ms-4"> <span className="ms-2">My way to Blog It</span></div>
                        </a>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navId" aria-controls="navId" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" id="navId">
                            <ul class="navbar-nav ms-auto me-4 nav">
                                {!loginStatus
                                    ?
                                    <>
                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/login">
                                                <span className="fa fa-sign-in fa-lg"></span> Log in
                                            </NavLink>
                                        </li>
                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/signup">
                                                <span className="fa fa-sign-in fa-lg"></span> Sign up
                                            </NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/home">
                                                <span className="fa fa-home fa-lg"></span> Home
                                            </NavLink>
                                        </li>

                                        <li class="nav-item">
                                            <NavLink className="nav-link" to="/blog/new">
                                                <span className="fa fa-plus"></span> New Blog
                                            </NavLink>
                                        </li>

                                        <li class="nav-item dropdown">
                                            <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="fa fa-user"></span>
                                            </div>

                                            <ul class="dropdown-menu mx-3" aria-labelledby="navbarDropdownMenuLink">
                                                <NavLink className="dropdown-item nav-link" to="/"><span className="fa mx-1 fa-id-badge fa-lg"></span>{this.context.user.emailId}</NavLink>
                                                <NavLink className="dropdown-item nav-link" to="/" onClick={this.context.logOut}><span className="fa mx-1 fa-sign-out fa-lg"></span> Sign out</NavLink>
                                            </ul>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }
}
export default Header;
