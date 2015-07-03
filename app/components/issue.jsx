var React = require('react');
var IssueStore = require('../stores/issue');
var ErrorStore = require('../stores/error');
var actions = require('../actions/actions');

var Issue = React.createClass({
    getInitialState: function() {
        return {
            issue: {
                labels: [],
                user: {}
            }
        };
    },
    componentDidMount: function() {
        IssueStore.addChangeListener(this._onChange);
        ErrorStore.addChangeListener(this._onError);
        this.load();
    },
    componentWillReceiveProps: function(props) {
        this.load();
    },
    load: function() {
        actions.loadIssue(this.props.params.owner, this.props.params.repo, this.props.params.number);
    },
    _onChange: function() {
        this.setState({
            issue: IssueStore.getIssue()
        });
    },
    _onError: function() {},
    render: function() {
        var labels = this.state.issue.labels ? this.state.issue.labels.map(function(label) {
            return <li>{label.name}</li>;
        }) : null;
        return (
            <div className="issue">
                <h1>{this.state.issue.title}</h1>
                <span className="number">
                    #{this.state.issue.number}</span>
                <div className="labels">
                    <ul>
                        {labels}
                    </ul>
                </div>
                <div className="info">
                    <div className="photo">
                        <img src={this.state.issue.user.avatar_url}/>
                    </div>
                    <div className="cont">
                        <div className="head">{this.state.issue.user.login}
                            <span className="date">{this.state.issue.date_pretty}</span>
                        </div>
                        <div className="body">{ this.state.issue.body}</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Issue;
