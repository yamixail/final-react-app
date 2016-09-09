'use strict'

import React, {Component, PropTypes} from 'react'
import {Col, Label, Thumbnail, Row} from 'react-bootstrap'
import requestTMDB from '../requestTMDB'
import Cast from '../components/movies/item/Cast'
import Crew from '../components/movies/item/Crew'
import Reviews from '../components/movies/item/Reviews'
import Similar from '../components/movies/item/Similar'
import Trailer from '../components/movies/item/Trailer'
import PageNotFound from './NoMatch'

class Home extends Component{
    static propTypes = {
        routeParams: PropTypes.object.isRequired
    }

    state = {
        info: null,
        movieNotFound: false
    }

    _requestMovie(id) {
        requestTMDB('/movie/' + id)
            .then(json => this.setState({info: json, movieNotFound: false}))
            .catch(() => this.setState({movieNotFound: true}))

        requestTMDB('/movie/' + id + '/credits')
            .then(json => this.setState({cast: json.cast, crew: json.crew}))
    }

    componentWillMount() {
        this._requestMovie(this.props.routeParams.movieId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.routeParams.movieId !== this.props.routeParams.movieId)
            this._requestMovie(nextProps.routeParams.movieId)
    }

    render () {
        if (this.state.movieNotFound) return <PageNotFound />

        if (!this.state.info) return <span />

        const {info} = this.state,
            posterThumbSrc = location.protocol +
                '//image.tmdb.org/t/p/w300' + info.poster_path

        return (
            <div>
                <h1>{info.title}</h1>
                <p>{info.tagline}</p>
                <Row>
                    <Col md={2} mdPush={10} xs={6} xsPush={6} >
                        <Cast list={this.state.cast} />
                    </Col>
                    <Col md={3} mdPull={2} xs={6} xsPull={6} >
                        <Thumbnail src={posterThumbSrc} alt={info.title} />
                        <h4>Rating: {info.vote_average} <small>({info.vote_count} votes)</small></h4>
                    </Col>
                    <Col md={7} mdPull={2} xs={12} >
                        <h3>Overview</h3>
                        <p>{info.overview}</p>
                        <p>{info.genres.map(
                            genre =>
                                <Label
                                    key={genre.id}
                                    bsStyle="primary"
                                    style={{
                                        fontSize: '100%',
                                        marginRight: '10px'
                                    }} >
                                    {genre.name}
                                </Label>
                        )}</p>
                        <Trailer movieId={info.id} />
                        <Crew list={this.state.crew} />
                    </Col>
                    <Col xs={12}>
                        <Similar movieId={info.id} />
                    </Col>
                    <Col xs={12}>
                        <Reviews movieId={info.id} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;
