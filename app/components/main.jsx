var React = require('react');
var IssuesStore = require('../stores/issues');
var ErrorStore = require('../stores/error');
var actions = require('../actions/actions');
var Issue = require('./issuePreview.jsx');
var Pagination = require('./pagination.jsx');
var Search = require('./search.jsx');
var Navigation = require('react-router').Navigation;

var Component = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {
            issues: [],
            owner: this.props.params.owner || "",
            repo: this.props.params.repo || "",
            page: this.props.params.page || 1,
            inProgress: false,
            errors: []
        };
    },
    componentWillReceiveProps: function(props) {
        this.setState(props.params, this.load);
    },
    load: function() {
        this.setState({
            inProgress: true
        });
        actions.loadIssues(this.state.owner, this.state.repo, this.state.page);
    },
    componentDidMount: function() {
        IssuesStore.addChangeListener(this._onChange);
        ErrorStore.addChangeListener(this._onError);
        if (this.state.owner && this.state.repo) {
            this.load();
        }
    },
    changePage: function(page) {
        this.setState({
            page: page
        }, function() {
            this.replaceWith('issues', this.state);
        });
    },
    _onError: function() {
        this.setState({
            errors: ErrorStore.getErrors(),
            inProgress: false
        });
    },
    _onChange: function() {
        this.setState({
            issues: IssuesStore.getIssues(),
            pages: IssuesStore.getLastPage(),
            inProgress: false
        });
    },
    _onSubmit: function(repo, owner) {
        this.setState({
            owner: owner,
            repo: repo
        }, function() {
            this.load();
        });
    },
    render: function() {
        var issues = this.state.inProgress ? <div>Load in progress</div> : this.state.issues.map(function(issue) {
            return <Issue issue={issue} owner={this.state.owner} repo={this.state.repo}/>;
        }, this);
        var errors = this.state.errors ? this.state.errors.map(function(error) {
            return <li>{error.name}</li>;
        }) : null;
        return (
            <div>
                <div className="header">
                    <div className="content">
                        <Search _onChange={this._onSubmit} owner={this.state.owner} repo={this.state.repo}/>
                    </div>
                </div>
                <div className="content">
                    <div className="errors">
                        <ul>{errors}</ul>
                    </div>
                    <div className="issues">{issues}</div>
                    <Pagination _onChangePage={this.changePage} current={this.state.page} pages={this.state.pages}/>
                </div>
            </div>
        );
    }
});

module.exports = Component;
