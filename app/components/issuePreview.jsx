var React = require('react');
var Link = require('react-router').Link;

var IssuePreview = React.createClass({
    render: function() {
        var link = '/' + this.props.owner + '/' + this.props.repo + '/issue/' + this.props.issue.number;
        return (
            <div className="issuePreview">
                <div className="photo">
                    <img src={this.props.issue.user.avatar_url}/>
                </div>
                <div className="issue__body">
                    <h3 className="issue__title">{this.props.issue.title}</h3>
                    <div className="issue__info">
                        <Link to={link}>#{this.props.issue.number}</Link>
                        <span>
                            opened #{this.props.issue.date_pretty} by {this.props.issue.user.login}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = IssuePreview;
