var React = require('react');
var IssuesStore = require('../stores/issue');
var actions = require('../actions/actions');
var Issue = require('./IssuePreview.jsx');

var Component = React.createClass({
    getInitialState: function() {
        return {
            issues: []
        };
    },
    componentDidMount: function() {
        IssuesStore.addChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState({
            issues: IssuesStore.getIssues()
        });
    },
    _onSubmit: function(e) {
        e.preventDefault();
        var owner = this.refs.owner.getDOMNode().value;
        var repo = this.refs.repo.getDOMNode().value;
        actions.loadIssues(owner, repo);
    },
    render: function() {
        var issues = this.state.issues.map(function(issue) {
            return <Issue issue={issue}/>;
        });
        return (
            <div>
                <div className="header">
                    <form onSubmit={this._onSubmit}>
                        <input ref="owner" type="text"/>
                        <input ref="repo" type="text"/>
                        <button>Load</button>
                    </form>
                </div>
                <div className="issues">{issues}</div>
            </div>
        );
    }
});

module.exports = Component;
