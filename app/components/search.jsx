var React = require('react');
var actions = require('../actions/actions');
var RepoStores = require('../stores/repo');
var Link = require('react-router').Link;

var Search = React.createClass({
    getInitialState: function() {
        return {
            owner: this.props.owner,
            repo: this.props.repo,
            repos: [],
            list: []
        };
    },
    componentDidMount: function() {
        RepoStores.addChangeListener(this.changeRepos);
        if (this.state.owner) {
            this.load();
        }
    },
    componentWillReceiveProps: function(props) {
        console.log(props);
        this.setState(props, this.load);
    },
    load: function() {
        if (this.state.owner !== "") {
            actions.loadRepos(this.state.owner);
        }
    },
    changeRepos: function() {
        this.setState({
            repos: RepoStores.getRepos()
        });
    },
    searchRepos: function(e) {
        e.preventDefault();
        var owner = this.refs.owner.getDOMNode().value;
        this.setState({
            owner: owner
        }, this.load);

    },
    searchRepo: function(e) {
        e.preventDefault();
        var repo = this.refs.repo.getDOMNode().value;
        var reg = new RegExp(repo, "gi");
        var repos = this.state.repos.filter(function(r) {
            return reg.test(r.name);
        });
        this.setState({
            list: repos,
            repo: repo
        });
    },
    setRepo: function(name) {
        this.setState({
            repo: name,
            list: []
        });
        this.props._onChange(this.state.owner, name);
    },
    _onSubmit: function(e) {
        e.preventDefault();
        var owner = this.refs.owner.getDOMNode().value,
            repo = this.refs.repo.getDOMNode().value;

        this.props._onChange(owner, repo);
    },
    render: function() {
        list = this.state.list.map(function(l) {
            return (
                <li className="search__autocomplete-li">
                    <a className="search__autocomplete-a" href="javascript:void(0)" onClick={this.setRepo.bind(this,l.name)}>{l.name}</a>
                </li>
            );
        }, this);
        return (
            <div className="search">
                <form onSubmit={this._onSubmit}>
                    <div className="search__field">
                        <input onChange={this.searchRepos} ref="owner" type="text" value={this.state.owner}/>
                    </div>
                    <div className="search__field search__autocomplete">
                        <input disabled={this.state.repos.length === 0} onChange={this.searchRepo} onKeyUp={this.searchRepo} ref="repo" type="text" value={this.state.repo}/>
                        <ul className="search__autocomplete-ul">{list}</ul>
                    </div>
                    <div className="search__field">
                        <button>
                            Load</button>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Search;
