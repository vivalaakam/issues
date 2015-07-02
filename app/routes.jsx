var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var App = require('./components/app.jsx');
var Main = require('./components/main.jsx');

var routes = (
    <Route handler={App} path="/">
        <Route handler={Main} name="main" path="/">
            <Route handler={Main} name="issues" path="/issues">
                <Route handler={Main} name="issues-owner" path=":owner">
                    <Route handler={Main} name="issues-owner-repo" path=":repo">
                        <Route handler={Main} name="issues-owner-repo-page" path=":page"></Route>
                    </Route>
                </Route>
            </Route>
        </Route>
    </Route>
);
module.exports = routes;
