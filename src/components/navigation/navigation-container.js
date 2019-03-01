import React, { Component } from 'react';
import { NavLink } from "react-router-dom";


export default class NavigationContainer extends Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <div>
                <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>

                <NavLink to="/about-me" activeClassName="nav-link-active">About</NavLink>

                <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>

                <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                    {/* NavLink enables the active class functionality */}


                {/* <a href="/">Wrong Home</a> */}
                    {/* This will reload the entire page. This goes around how react is supposed to work! */}
                    {/* can use a tags if navigating to outside sites (but not internal component) */}

                {false ? <button>Add Blog</button> : null}
                {/* // ternary operator */}
            </div>
        );
    }
};