var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var utils = require('../utils/helpers');

var issue = {};

function _loadIssue(data) {
    issue = data;
    issue.pretty_date = utils.pretty_date(issue.date);
}

var IssueStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getIssue: function() {
        return issue;
    }
});

IssueStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.LOAD_ISSUE:
            _loadIssue(action.data);
            IssueStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = IssueStore;
