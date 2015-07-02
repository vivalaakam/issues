var React = require('react');

var Pagination = React.createClass({
    componentDidMount: function() {},
    nextPage: function(e) {
        e.preventDefault();
        this.props._onChangePage(this.props.current + 1);
    },
    prevPage: function(e) {
        e.preventDefault();
        this.props._onChangePage(this.props.current - 1);
    },
    changePage: function(page, e) {
        e.preventDefault();
        this.props._onChangePage(page);
    },
    getPages: function() {
        var page_list = [],
            current = +this.props.current,
            pages = +this.props.pages,
            className,
            i;
        if (pages > 1) {
            if (current > 1) {
                page_list.push(<button className="ruler" onClick={this.prevPage}>Prev</button>);
            }
            if (pages < 13) {
                for (i = 1; i <= this.props.pages; i += 1) {
                    className = current === i ? 'link active' : "link";
                    page_list.push(<button className={className} onClick={this.changePage.bind(this, i)}>{i}</button>);
                }
            } else {
                for (i = 1; i <= 2; i += 1) {
                    className = current === i ? 'link active' : "link";
                    page_list.push(<button className={className} onClick={this.changePage.bind(this, i)}>{i}</button>);
                }
                var start = Math.max (3,
                    current - 2),
                    finish = Math.min(current + 2, pages - 1);
                if (start > 3) {
                    page_list.push(<span className="semiliricon">...</span>);
                }

                for (i = start; i <= finish; i += 1) {
                    className = current === i ? 'link active' : "link";
                    page_list.push(<button className={className} onClick={this.changePage.bind(this, i)}>{i}</button>);

                }

                if (finish < pages - 1) {
                    page_list.push(<span className="semiliricon">...</span>);

                }

                for (i = pages - 1; i <= pages; i += 1) {
                    className = current === i ? 'link active' : "link";
                    page_list.push(<button className={className} onClick={this.changePage.bind(this, i)}>{i}</button>);

                }
            }

            if (current < pages) {
                page_list.push(<button className="ruler" onClick={this.nextPage}>Next</button>);

            }
        }
        return page_list;
    },
    render: function() {
        return (
            <div className="pagination">
                <div className="pagination__wrapper">
                    {this.getPages()}
                </div>
            </div>
        );
    }
});

module.exports = Pagination;
