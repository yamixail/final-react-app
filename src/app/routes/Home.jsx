'use strict'

import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router'
import {Row} from 'react-bootstrap'
import RequestTMDB from '../components/RequestTMDB'
import MovieGrid from '../components/movies/Grid'

class Home extends Component{
    static propTypes = {
        router: PropTypes.object.isRequired
    }
    render () {
        return (
            <Row>
                <h1>Now in cinemas</h1>
                <RequestTMDB path="/movie/now_playing">
                    <MovieGrid
                        proportions={{
                            md: 3,
                            sm: 4,
                            xs: 6
                        }}/>
                </RequestTMDB>
            </Row>
        )
    }
}

export default withRouter(Home)
