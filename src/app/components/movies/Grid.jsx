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

    render () {
        if (this.props.error)
            return (
                <Alert bsStyle="danger">
                    <h4>Oops...</h4>
                    <p>{this.props.error.toString()}</p>
                    <p><Button bsStyle="success" onClick={this.props.tryAgain}>Try again</Button></p>
                </Alert>
            )

        const moviesList = this.props.results

        if (!moviesList) return <p>Loading... Please wait.</p>

        if (this.props.total_pages > 1 && (this.props.topPaging || this.props.bottomPaging))
            var PagingComp = () => (
                <div>
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={this.props.total_pages}
                        maxButtons={5}
                        activePage={this.props.page}
                        onSelect={this.props.onPageChange} />
                </div>
            )

        return (
            <div>
                {this.props.topPaging ? <PagingComp /> : null}
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
                {this.props.bottomPaging ? <PagingComp /> : null}
            </div>
        )
    }
}

export default MovieGrid
