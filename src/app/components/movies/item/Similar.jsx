'use strict'

import React, {Component, PropTypes} from 'react'
import {Button, Col, Row, Thumbnail} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import requestTMDB, {getImgSrc} from '../../../requestTMDB'

class Similar extends Component {
    static propTypes = {
        movieId: PropTypes.number.isRequired
    }

    state = {
        list: []
    }

    componentWillMount() {
        this._requestSimilarMovies(this.props.movieId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movieId !== this.props.movieId)
            this._requestSimilarMovies(nextProps.movieId)
    }

    _requestSimilarMovies(movieId) {
        requestTMDB('/movie/' + movieId + '/similar')
            .then(json => this.setState({list: json.results.slice(0, 6)}))
    }

    render () {
        if (!this.state.list.length) return <div />

        return (
            <div>
                <h3>Similar movies</h3>
                <Row>
                {this.state.list.map(movie =>
                    <Col key={movie.id} md={2} sm={4} xs={6} >
                        <Thumbnail
                            src={movie.poster_path && getImgSrc(movie.poster_path, 'w185')} >
                            <p
                                style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }} >{movie.title}</p>
                            <LinkContainer to={'/movie/' + movie.id}>
                                <Button bsStyle="primary">Details</Button>
                            </LinkContainer>
                        </Thumbnail>
                    </Col>
                )}
                </Row>
            </div>
        )
    }
}

export default Similar;
