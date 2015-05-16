define (require, exports, module) ->
  Backbone = require 'backbone'
  Issue = require 'models/issue'
  class Issues extends Backbone.Collection
    page: 1
    url: ->
      "/issues/#{ @owner }/#{ @repo }/#{@page}"
    model : Issue
    initialize: () ->
      @on 'all' , (e) ->
        console.log e
    parse: (response) ->
      @pages = response.pages
      response.values
    fetchData: (owner , repo , page) ->
      @owner = owner
      @repo = repo
      @page = page if page
      @fetch({reset: true} )
    getParams: ->
      owner: @owner , repo: @repo , page: @page
