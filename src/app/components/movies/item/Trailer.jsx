'use strict'

import React, {Component, PropTypes} from 'react'
import requestTMDB from '../../../requestTMDB'

class Trailer extends Component {
    static propTypes = {
        movieId: PropTypes.number.isRequired
    }

    state = {
        list: [],
        trailer: null
    }

    componentWillMount() {
        this._requestVideos(this.props.movieId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movieId !== this.props.movieId)
            this._requestVideos(nextProps.movieId)
    }

    _requestVideos(movieId) {
        requestTMDB('/movie/' + movieId + '/videos')
            .then(json =>
                this.setState({
                    videos: json.results,
                    trailer: this._getMainTrailer(json.results)
                })
            )
    }

    _getMainTrailer(list) {
        if (!list || !list.length) return false

        const index = list.findIndex(
            video => video.site.toLowerCase() === 'youtube'
        )

        if (index > -1)
            return list[index]
    }

    render () {
        if (!this.state.trailer) return <div />

        return (
            <div>
                <h3>Trailer</h3>
                <div
                    style={{
                        position: 'relative',
                        paddingTop: '56.25%' // it's 1/(16:9)
                    }}>
                    <iframe
                        width="535"
                        height="300"
                        src={'https://www.youtube.com/embed/' + this.state.trailer.key}
                        frameBorder="0"
                        allowFullScreen
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }} />
                </div>
            </div>
        )
    }
}

export default Trailer;
