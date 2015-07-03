var keyMirror = require('keymirror');
module.exports = {
    ActionTypes: keyMirror({
        LOAD_ISSUES: null,
        LOAD_ISSUE: null,
        ADD_ERROR: null,
        SET_ERRORS: null,
        RESET_ERRORS: null,
        REMOVE_ERROR: null,
        LOAD_REPOS: null
    })
};
