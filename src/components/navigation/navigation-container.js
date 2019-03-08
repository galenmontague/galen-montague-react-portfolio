import React from 'react';
import axios from 'axios';
import { withRouter } from  "react-router";
// higher order components (starts with lowercase)
import { NavLink } from "react-router-dom";

const NavigationComponent = (props) => {
    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">         
                <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
                {/* NavLink enables the active class functionality */}
            </div>
        );
    };

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", { withCredentials: true }).then(response => {
            if (response.status === 200) {
                props.history.push("/");
                // console.log(props)
                props.handleSuccessfulLogout();
            }
            return response.data;
        }).catch(error => {
            console.log("Error signing out", error);
        })
        // checks credentials so can log you out of session and "DELETE" it
    };

    return (
        <div className="nav-wrapper">
            <div className="left-side">
                <div className="nav-link-wrapper">
                    <NavLink exact to="/" activeClassName="nav-link-active">
                        Home
                    </NavLink>
                </div>

                <div className="nav-link-wrapper">
                    <NavLink to="/about-me" activeClassName="nav-link-active">About</NavLink>
                </div>

                <div className="nav-link-wrapper">    
                    <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                </div>
                
                <div className="nav-link-wrapper">    
                    <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                </div>

                {props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}

                {/* <a href="/">Wrong Home</a> */}
                    {/* This will reload the entire page. This goes around how react is supposed to work! */}
                    {/* can use a tags if navigating to outside sites (but not internal component) */}
            </div>

            <div className="right-side">
                GALEN MONTAGUE

                {props.loggedInStatus === 'LOGGED_IN' ? <a onClick={handleSignOut}>Sign Out</a> : null} 
            </div>
        </div>
    );
}

export default withRouter(NavigationComponent);
    // this is performing composition with the higher order component (withRouter). This will have access to props.history so we can access the browser history.
    // still treating this as our default export