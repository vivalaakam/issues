var AppDispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var ApiUtils = require('../utils/apiutils');

module.exports = {
    loadIssues: function(owner, repo, page) {
        ApiUtils.loadIssues(owner, repo, page).then(function(response) {
            AppDispatcher.dispatch({
                type: ActionTypes.RESET_ERRORS
            });
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_ISSUES,
                data: response.issues,
                pages: response.pages
            });
        }, function(error) {
            AppDispatcher.dispatch({
                type: ActionTypes.ADD_ERROR,
                error: error
            });
        });
    },
    loadIssue: function(owner, repo, issue) {
        ApiUtils.loadIssue(owner, repo, issue).then(function(response) {
            AppDispatcher.dispatch({
                type: ActionTypes.RESET_ERRORS
            });
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_ISSUE,
                data: response
            });
        }, function(error) {
            AppDispatcher.dispatch({
                type: ActionTypes.ADD_ERROR,
                error: error
            });
        });
    },
    loadRepos: function(owner) {
        ApiUtils.loadRepos(owner).then(function(response) {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_REPOS,
                data: response
            });
        }, function(error) {
            /*AppDispatcher.dispatch({
                type: ActionTypes.ADD_ERROR,
                error: error
            });*/
        });
    }
};
