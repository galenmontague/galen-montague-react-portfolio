import React, { Component } from "react";

import {
  BrowserRouter as Router,
  // creates an alias (just renaming the original browser module)
  Switch, // a pre-built module
  Route
} from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

// this is the parent component for our whole application
export default class App extends Component {
  render() {
    return (
      // return can only return one element (so one div only)
      <div className="container">
        <Router>
          <div>
              <NavigationContainer />

              <Switch>
                  {/* "switch" is like a set if/else conditions */}
                  {/* "switch" switches the old component with a new component */}
                <Route exact path="/" component={Home} />
                  {/* the forward stands for the root (or landing). So it will find the root when deployed. */}
                  {/* "exact" means only the slash and nothing else */}
                  {/* the slash is standing in for the root url (the landing url) */}
                  {/* only one exact path is allowed */}
                <Route path="/about-me" component={About} />
                <Route path="/auth" component={Auth} />
                  {/* "Route" can take props "path" is the prop */}
                <Route path="/contact" component={Contact} />
                <Route path="/blog" component={Blog} />
                <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
                  {/* the colon before slug means that the item behind it is intended to be changed */}
                <Route component={NoMatch} />
                      {/* we're listing a route that doesn't have a path, so we can catch missed typed urls on our site */}

              </Switch>
          </div>
        </Router>

      </div>
    );
  }
}
