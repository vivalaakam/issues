var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';

var repos = [];

function _loadRepos(data) {
    repos = data;
}


var RepoStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getRepos: function() {
        return repos;
    },
    searchRepo: function() {

    }
});

RepoStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.LOAD_REPOS:
            _loadRepos(action.data);
            RepoStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = RepoStore;
