import React, { Component } from "react";
import axios from "axios";

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
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this);
        // bind allows handlePageTitleUpdate below to access "this". Gives access to the data of the component in the object above.
    }
    
    portfolioItems() {
        // map interates over a collection, performs a function, and returns the new collection. It accepts a function as an arguement (a "call back"), so map is a higher order function. It always needs to 'return' on every loop.
        return this.state.data.map(item => {
            return (
                <PortfolioItem
                    key={item.id}
                    item={item}
                />
            );
        });
    }

    handleFilter(filter) { 
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
            // this will filter the data in "data" above
            // .filter is used on an array
        })
    }
    
    getPortfolioItems() {
        // this is from axios at npm.com
        // the url is from https://www.devcamp.space/project/portfolio
        axios
            .get("https://galenmontague.devcamp.space/portfolio/portfolio_items")
            .then(response => {
            this.setState({
                data: response.data.portfolio_items
            })
            })
            .catch(error => {
            console.log(error);
        });
    }
    
    componentDidMount() {
        this.getPortfolioItems();
    }
    
    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;                
        }
        
        return (
    // JSX code here (not actually HTML)
            <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter('eCommerce')}>
                    eCommerce
                </button>
                {/* // the arrown func invokes the handleFilter function */}
                <button className="btn" onClick={() => this.handleFilter('Scheduling')}>
                    Scheduling
                </button>
                <button className="btn" onClick={() => this.handleFilter('Enterprise')}>
                    Enterprise
                </button>
            {this.portfolioItems()}</div>
        )   
    }
}