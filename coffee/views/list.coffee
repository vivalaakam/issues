define (require, exports, module) ->
  Backbone = require 'backbone'
  IssueCollection = require 'collections/issues'
  listTemplate = require 'templates'
  issueView = require 'views/issuePreview'
  Pagination = require 'views/pagination'
  Repositories = require 'collections/repositories'
  class ListView extends Backbone.View
    events:
      'click #buttonSend': 'fetchIssues'
      'change .input' : 'changeData'
      'change #inputOwner' : 'fetchRepos'
      'keyup #inputRepo' : 'searchRepos'
      'click ul.repos a': 'setRepos'
    data:
      {}
    initialize: (opts = {}) ->
      @issues = new IssueCollection
      @pagination = new Pagination
      @repositories = new Repositories
      @data = opts extends @data
      @render()
      @issues.on 'add' , @addIssue , @
      @issues.on 'reset' , @addIssues , @
      @issues.on 'sync' , @paginator , @
      @issues.on 'error' , @error , @
      @issues.on 'request' , @request , @
      if opts.repo and opts.owner
        @issues.fetchData opts.owner , opts.repo , opts.page
    render: ->
      self = @
      @$el.html listTemplate["templates/list"] @data
      @$el.find('.pagination').html @pagination.el
      @
    changeData: (e) ->
      @data[e.currentTarget.name] = e.currentTarget.value
    addIssues: () ->
      @$el.find('.issues').empty()
      @issues.forEach @addIssue , @
    addIssue: (model) ->
      view = new issueView model: model , owner : @data.owner , repo : @data.repo
      @$el.find('.issues').append view.render().el
    fetchIssues: () ->
      @issues.fetchData @data.owner , @data.repo
      @pagination.render(1,1);
    fetchRepos: () ->
      @repositories.fetchData(@data.owner);
    searchRepos: () ->
      repo = @$el.find('#inputRepo').val()
      @$el.find('.repos').empty()
      if repo
        @repositories.search(repo).forEach @showRepos , @
    showRepos: (model) ->
      @$el.find('.repos').append listTemplate["templates/repo"] model.toJSON()
    setRepos:(e) ->
      @data.repo = $(e.currentTarget).html()
      @$el.find('#inputRepo').val(@data.repo);
      @$el.find('.repos').empty()
      @fetchIssues()
    paginator: ->
      @pagination.render @issues.pages , @issues.page , "#{@issues.owner}/#{@issues.repo}/issues"
    error : () ->
      @$el.find('.issues').html 'error! something wrong!'
    request: () ->
      @$el.find('.issues').html 'loading in progress'
