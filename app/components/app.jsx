/** @jsx React.DOM */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

var Template = React.createClass({
    render: function () {
        return (
            <div className="container">
                <RouteHandler />
            </div>
        );
    }
});
module.exports = Template;
