define (require, exports, module) ->
  Backbone = require 'backbone'
  templates = require 'templates'
  class IssuePreview extends Backbone.View
    data:{}
    className : 'issue'
    initialize: (opts = {})->
      @data = opts extends @data
    render: ->
      model = @data extends @model.toJSON();
      @$el.html templates["templates/issuePreview"] model
      @
