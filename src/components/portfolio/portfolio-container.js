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
        if (filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
    }
    
    getPortfolioItems(filter = null) {
        // Filter is optional. If you pass one in, then the function can work with it. 
        axios
        .get("https://galenmontague.devcamp.space/portfolio/portfolio_items")
        .then(response => {
            if (filter) {
                this.setState({
                    data: response.data.portfolio_items.filter(item => {
                        return item.category === filter;
                            // this will filter the data in "data" above
                            // .filter is used on an array
                        })
                    })
                } else {
                    this.setState({
                        data: response.data.portfolio_items
                    })
                }
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
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter('HTML/CSS')}>
                        HTML/CSS
                    </button>
                    {/* // the arrown func invokes the handleFilter function */}
                    <button className="btn" onClick={() => this.handleFilter('JavaScript')}>
                        JavaScript
                    </button>
                    <button className="btn" onClick={() => this.handleFilter('Python')}>
                        Python
                    </button>
                    <button className="btn" onClick={() => this.handleFilter('React')}>
                        React
                    </button>
                    <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>
                        All
                    </button>
                </div>
                <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
            </div>
        )   
    }
}