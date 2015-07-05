var React = require('react');
var IssueStore = require('../stores/issue');
var ErrorStore = require('../stores/error');
var actions = require('../actions/actions');
var Link = require('react-router').Link;
var Navigation = require('react-router').Navigation;
var History = require('react-router').History;
var Issue = React.createClass({
    mixins: [Navigation],
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
    _go: function(e) {
        e.preventDefault();
        this.goBack();
    },
    _onError: function() {},
    render: function() {
        var labels = this.state.issue.labels ? this.state.issue.labels.map(function(label) {
            return <li>{label.name}</li>;
        }) : null;

        var goBack = History.length > 1 ? <button onClick={this._go}>Go back</button> : null;
        var login = 'https://github.com/' + this.state.issue.user.login;
        return (
            <div className="issue">
                <div className="header">
                    <div className="content">
                        {goBack}
                    </div>
                </div>
                <div className="content">
                    <div className="issue__head">
                        <div className="issue__photo">
                            <img className="issue__photo-img" src={this.state.issue.user.avatar_url}/>
                        </div>
                        <div className="issue__body">
                            <h3 className="issue__title">{this.state.issue.title}</h3>
                            <div className="issue__info">
                                #{this.state.issue.number}
                                <span>
                                    opened #{this.state.issue.date_pretty} by
                                    <a href={login}>{this.state.issue.user.login}</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="labels">
                        <ul>
                            {labels}
                        </ul>
                    </div>
                    <div className="issue__description">
                        { this.state.issue.body}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Issue;
