var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/app.jsx');
var Main = require('./components/main.jsx');


var routes = (
        <Route handler={App} path="/">
            <Route handler={Main} name="main" path="/"/>
        </Route>
);
module.exports = routes;
