'use strict'

import React, {Component} from 'react'
import {Row} from 'react-bootstrap'
import RequestTMDB from '../RequestTMDB'
import MovieGrid from '../movies/Grid'

class Home extends Component{
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
                        }} />
                </RequestTMDB>
            </Row>
        )
    }
}

export default Home
