https://rails.devcamp.com/dissecting-react-js/react-router/basic-route-setup-react

Basic Route Setup in React

we have to mock or "fake" the routes
    it will look the same to users, but only loading one page
    see documentation (reacttraining.com?)


Victor Laucas [2:41 PM]
- Use the <Switch> component to group <Route>s. The <Switch> will iterate over its children elements (the routes) and only render the first one that matches the current pathname.