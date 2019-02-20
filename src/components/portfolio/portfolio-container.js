import React, { Component } from "react";

import PortfolioItem from './portfolio-item'

export default class PortfolioContainer extends Component {
    // if you want to use STATE, need to do class-based component (these are "smart")
    // LIFECYCLE HOOKS - need to do class-based component
    // use FUNCTIONAL COMPONENT for just rendering out (just passing it data). These are "dumb."
    // CONSTRUCTOR - can only use in class component. Its a built in key word.
    constructor() {
        // without super, we are overriding the parent constructor (what this class is inheriting from 'EXTEND')
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio.",
            isLoading: false,
            data: [
                {title: "QUip", category: "eCommerce" },
                {title: "Eventbrite", category: "Scheduling" },
                {title: "Ministry Safe", category: "Enterprise" },
                {title: "SwingAway", category: "eCommerce" }
            ]
        };

        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        // bind allows handlePageTitleUpdate below to access "this". Gives access to the data of the component in the object above.
        this.handleFilter = this.handleFilter.bind(this);
    }

    portfolioItems() {

        // map interates over a collection, performs a function, and returns the new collection. It accepts a function as an arguement (a "call back"), so map is a higher order function. It always needs to 'return' on every loop.
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url={"google.com"}/>;
            // will produce i portfolio items (3 in this case for 'const data')
        })
    }
    
    // handlePageTitleUpdate() {
    //     this.setState({
    //         pageTitle: "Something Else" // this changes the pageTitle above
    //     });
    // }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
            // this will filter the data in "data" above
            // .filter is used on an array
        })
    }


    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }
        return (
            // JSX code here (not actually HTML)
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                {/* // the arrown func invokes the handleFilter function */}
                <button onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>

                {this.portfolioItems()}


                {/* <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}

            </div>
        )
    }
}