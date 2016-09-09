'use strict'

import React, {Component} from 'react'
import {Row} from 'react-bootstrap'
import MovieGrid from '../components/movies/Grid'

class Home extends Component{
    render () {
        return (
            <Row>
                <h1>Now in cinemas</h1>
                <MovieGrid
                    path="/movie/now_playing"
                    proportions={{
                        md: 3,
                        sm: 4,
                        xs: 6
                    }}/>
            </Row>
        )
    }
}

export default Home;
