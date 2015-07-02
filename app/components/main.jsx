var React = require('react');
var IssuesStore = require('../stores/issue');
var actions = require('../actions/actions');
var Issue = require('./issuePreview.jsx');
var Pagination = require('./pagination.jsx');
var Router = require('react-router');
var Component = React.createClass({
    mixin: [Router.Navigation],
    getInitialState: function() {
        return {
            issues: [],
            owner: this.props.owner || "",
            repo: this.props.repo || "",
            page: this.props.page || 1
        };
    },
    componentDidMount: function() {
        IssuesStore.addChangeListener(this._onChange);
        if (this.state.owner && this.state.repo) {
            actions.loadIssues(this.state.owner, this.state.repo, this.state.page);
        }
    },
    changePage: function(page) {
        this.setState({
            page: page
        });
        actions.loadIssues(this.state.owner, this.state.repo, this.state.page);
    },
    _onChange: function() {
        this.setState({
            issues: IssuesStore.getIssues(),
            pages: IssuesStore.getLastPage()
        });

    },
    _onSubmit: function(e) {
        e.preventDefault();
        var owner = this.refs.owner.getDOMNode().value,
            repo = this.refs.repo.getDOMNode().value;
        this.setState({
            owner: owner,
            repo: repo
        });
        actions.loadIssues(owner, repo, 1);
    },
    render: function() {
        var issues = this.state.issues.map(function(issue) {
            return <Issue issue={issue}/>;
        });
        return (
            <div>
                <div className="header">
                    <form onSubmit={this._onSubmit}>
                        <input defaultValue={this.state.owner} ref="owner" type="text"/>
                        <input defaultValue={this.state.repo} ref="repo" type="text"/>
                        <button>Load</button>
                    </form>
                </div>
                <div className="issues">{issues}</div>
                <Pagination _onChangePage={this.changePage} current={this.state.page} pages={this.state.pages}/>
            </div>
        );
    }
});

module.exports = Component;
