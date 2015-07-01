var React = require('react');

var IssuePreview = React.createClass({
    render: function() {
        return (
            <div className="issue">
                <div className="photo">
                    <img src={this.props.issue.user.avatar_url}/>
                </div>
                <div className="issue__body">
                    <h3 className="issue__title">{this.props.issue.title}</h3>
                    <div className="issu__info">
                        #{this.props.issue.number}
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
