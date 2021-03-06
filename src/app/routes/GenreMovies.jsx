'use strict'

import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'
import {Col, Row} from 'react-bootstrap'
import GenresLeftMenu from '../components/GenresLeftMenu'
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
                        <GenresLeftMenu path="/genre/movie/list" />
                    </Col>
                    <Col md={9}>
                        <MovieGrid
                            path={`/genre/${this.props.routeParams.genreId}/movies`}
                            oParams={this.props.location.query}
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
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(GenreMovies)
