define (require, exports, module) ->
  Backbone = require 'backbone'
  List = require 'views/list'
  Issue = require 'views/issue'
  class AppRouter extends Backbone.Router
    data: {}
    routes:
      '': 'showList'
      ':owner/:repo/issues/:page' : 'paginatorList'
      ':owner/:repo/issue/:issue' : 'viewIssue'
    showList: ->
      $('.container .content').html(new List().el) ;
    paginatorList: (owner , repo , page) ->
      $('.container .content').html new List( owner: owner , repo: repo , page: page ).el
    viewIssue: (owner, repo, issue) ->
      $('.container .content').html new Issue( owner: owner , repo: repo , issue: issue ).el
