define (require, exports, module) ->
  Backbone = require 'backbone'
  templates = require 'templates'
  class Pagination extends Backbone.View
    className : 'pagination-wrapper'
    calculate: (pages , current) ->
      page_list = []
      if pages > 1
        current = + current

        if current > 1 then page_list.push type : 'ruler' , value : current - 1 , name : 'prev'
        if pages < 13
           page_list.push type: 'link', active : current is num , value : num for num in [1..pages]
        else
          page_list.push type: 'link', active : current is num , value : num for num in [1..2]
          start = Math.max 3 , current - 2
          finish = Math.min current + 2 , pages - 1

          if start > 3 then page_list.push type: 'semiliricon'
          page_list.push type: 'link', active : current is num , value : num for num in [start..finish]
          if finish < pages - 1 then page_list.push type: 'semiliricon'

          page_list.push type: 'link', active : current is num , value : num for num in [pages - 1..pages]
        if current < pages then page_list.push type : 'ruler' , value :  current + 1 , name : 'next'
      page_list
    render: (pages , current , link) ->
      pages = @calculate pages , current
      @$el.html templates["templates/pagination"] pages: pages , link : link , current : current
