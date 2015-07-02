var React = require('react');
var actions = require('../actions/actions');
var RepoStores = require('../stores/repo');

var Search = React.createClass({
    getInitialState: function() {
        return {
            owner: '',
            repo: '',
            repos: [],
            list: []
        };
    },
    componentDidMount: function() {
        RepoStores.addChangeListener(this._loadRepos);
    },
    _loadRepos: function() {
        this.setState({
            repos: RepoStores.getRepos()
        });
    },
    loadRepos: function(e) {
        e.preventDefault();
        var owner = this.refs.owner.getDOMNode().value;
        this.setState({
          owner: owner
        });
        actions.loadRepos(owner);
    },
    searchRepo: function() {
        var repo = this.refs.repo.getDOMNode().value;
        var reg = new RegExp(repo, "gi");
        var repos = this.state.repos.filter(function(r) {
            return reg.test(r.name);
        });
        this.setState({
            list: repos
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
                    <a href="javascript:void(0)" className="search__autocomplete-a" onClick={this.setRepo.bind(this,l.name)}>{l.name}</a>
                </li>
            );
        }, this);
        return (
            <div className="search">
                <form onSubmit={this._onSubmit}>
                    <div className="search__field">
                        <input defaultValue={this.state.owner} onChange={this.loadRepos} ref="owner" type="text"/>
                    </div>
                    <div className="search__field search__autocomplete">
                        <input defaultValue={this.state.repo} disabled={this.state.repos.length === 0} onKeyUp={this.searchRepo} ref="repo" type="text"/>
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
