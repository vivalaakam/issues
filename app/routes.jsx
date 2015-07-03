var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/app.jsx');
var Main = require('./components/main.jsx');
var Issue = require('./components/issue.jsx');
var routes = (
    <Route handler={App} path="/">
        <Route handler={Main} name="main" path="/"></Route>
        <Route handler={Main} name="issues" path=":owner/:repo/issues/:page"></Route>
        <Route handler={Issue} name="issue" path=":owner/:repo/issue/:number"></Route>
    </Route>
);
module.exports = routes;
