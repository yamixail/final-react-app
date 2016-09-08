'use strict'

import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'
import {Col, Row} from 'react-bootstrap'
import FilterForm from '../components/filter/Form'
import MovieGrid from '../components/movies/Grid'

class Filter extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
        routeParams: PropTypes.object.isRequired
    }

    state = {}

    render () {
        return (
            <div>
                <h1>Filter</h1>
                <Row>
                    <Col md={3}>
                        <FilterForm
                            defaultValues={this.props.location.query}
                            onSubmit={query =>
                                this.props.router.push({
                                    pathname: '/filter',
                                    query
                                })
                            } />
                    </Col>
                    <Col md={9}>
                        <MovieGrid
                            path="/discover/movie"
                            oParams={this.props.location.query}
                            proportions={{
                                md: 4,
                                sm: 6
                            }}
                            topPaging
                            bottomPaging
                            onPageChange={page =>
                                this.props.router.push({
                                    pathname: '/filter',
                                    query: {
                                        ...this.props.location.query,
                                        page
                                    }
                                })
                            } />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Filter)
