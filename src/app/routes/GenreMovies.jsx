'use strict'

import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'
import {Col, Row} from 'react-bootstrap'
import RequestTMDB from '../components/RequestTMDB'
import GenresLeftMenu from '../components/main/GenresLeftMenu'
import MovieGrid from '../components/movies/Grid'

class GenreMovies extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
        routeParams: PropTypes.object.isRequired
    }

    render () {
        return (
            <div>
                <h1>Movies by genres</h1>
                <Row>
                    <Col md={3}>
                        <RequestTMDB path="/genre/movie/list">
                            <GenresLeftMenu />
                        </RequestTMDB>
                    </Col>
                    <Col md={9}>
                        <RequestTMDB
                            path={`/genre/${this.props.routeParams.genreId}/movies`}
                            oParams={this.props.location.query}>
                            <MovieGrid
                                proportions={{
                                    md: 4,
                                    sm: 6
                                }}
                                topPaging
                                bottomPaging
                                onPageChange={page =>
                                    this.props.router.push({
                                        pathname: '/genre/' + this.props.routeParams.genreId,
                                        query: {page}
                                    })
                                } />
                        </RequestTMDB>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(GenreMovies)
