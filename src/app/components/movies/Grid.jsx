'use strict'

import React, { Component, PropTypes } from 'react'
import {

    Alert,
    Button,
    Col,
    Pagination,
    Row,
    Thumbnail
} from 'react-bootstrap'

class MovieGrid extends Component {
    static propTypes = {
        proportions: PropTypes.object,
        posterWidth: PropTypes.number,
        topPaging: PropTypes.bool,
        bottomPaging: PropTypes.bool,
        onPageChange: PropTypes.func,
        results: PropTypes.array,
        page: PropTypes.number,
        total_pages: PropTypes.number,
        error: PropTypes.instanceOf(Error),
        tryAgain: PropTypes.func
    }

    static defaultProps = {
        list: [],
        proportions: {},
        posterWidth: 185,
        topPaging: false,
        bottomPaging: false
    }

    // Requirement from TMDB
    static MAX_PAGES = 1000

    render () {
        if (this.props.error)
            return (
                <Alert bsStyle="danger">
                    <h4>Oops...</h4>
                    <p>Something went wrong.</p>
                    <p><Button bsStyle="success" onClick={this.props.tryAgain}>Try again</Button></p>
                </Alert>
            )

        const moviesList = this.props.results

        if (!moviesList) return <p>Loading... Please wait.</p>

        if (!moviesList.length) return <p>Nothing found.</p>

        if (this.props.total_pages > 1 && (this.props.topPaging || this.props.bottomPaging))
            var PagingComp = () => (
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={
                        this.props.total_pages > this.MAX_PAGES
                            ? this.MAX_PAGES
                            : this.props.total_pages
                    }
                    maxButtons={5}
                    activePage={this.props.page}
                    onSelect={this.props.onPageChange} />
            )

        return (
            <div>
                {this.props.topPaging && PagingComp ? <PagingComp /> : ''}
                <Row>
                {moviesList.map(el =>
                    <Col
                        key={el.id}
                        {...this.props.proportions}
                        style={{
                            float: 'none',
                            display: 'inline-block',
                            verticalAlign: 'top'
                        }}>
                        <Thumbnail
                            src={el.poster_path &&
                                `${location.protocol}//image.tmdb.org/t/p/w${this.props.posterWidth + el.poster_path}`}
                            alt={el.title}
                            style={{textAlign: 'center'}}>
                            <h4>{el.title}</h4>
                            <Button bsStyle="primary" href={`/film/${el.id}`}>Details</Button>
                        </Thumbnail>
                    </Col>
                )}
                </Row>
                {this.props.bottomPaging && PagingComp  ? <PagingComp /> : ''}
            </div>
        )
    }
}

export default MovieGrid
