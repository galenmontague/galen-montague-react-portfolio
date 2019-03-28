import React, { Component } from "react";

import {
  BrowserRouter as Router,
  // creates an alias (just renaming the original browser module)
  Switch, // a pre-built module
  Route
} from "react-router-dom";
import axios from "axios";
import NavigationComponent from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons"

// this is the parent component for our whole application
export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN" // better than a boolean true/false bc those can introduce bugs
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", { withCredentials: true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus

        // If loggedIn (from api call) and status is LOGGED_IN => return data
        // If loggedIn and status NOT_LOGGED_IN => update state
        // If not loggedIn and status is LOGGED_IN => update state and log out

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (!loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
    ]
  }
  
  render() {
    return (
      // return can only return one element (so one div only)
      <div className="container">
        <Router>
          <div>
              <NavigationComponent
                loggedInStatus={this.state.loggedInStatus}
                handleSuccessfulLogout={this.handleSuccessfulLogout}
              />

              <Switch>
                  {/* "switch" is like a set if/else conditions */}
                  {/* "switch" switches the old component with a new component */}
                <Route exact path="/" component={Home} />
                  {/* the forward stands for the root (or landing). So it will find the root when deployed. */}
                  {/* "exact" means only the slash and nothing else */}
                  {/* the slash is standing in for the root url (the landing url) */}
                  {/* only one exact path is allowed */}
                <Route path="/about-me" component={About} />
                
                <Route
                  path="/auth"
                  render={props => (
                    <Auth 
                    {...props}
                    // ... = spread operator 
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                    />
                    )}
                />

                  {/* "Route" can take props "path" is the prop */}
                <Route path="/contact" component={Contact} />
                <Route path="/blog" component={Blog} />
                {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}                
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
