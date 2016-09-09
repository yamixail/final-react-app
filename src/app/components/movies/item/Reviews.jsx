'use strict'

import React, {Component, PropTypes} from 'react'
import requestTMDB from '../../../requestTMDB'

class Reviews extends Component {
    static propTypes = {
        movieId: PropTypes.number.isRequired
    }

    state = {
        list: []
    }

    _requestReviews(movieId) {
        // Now don't need reviews pagination because few reviews,
        // even from well-known films
        requestTMDB('/movie/' + movieId + '/reviews')
            .then(json => this.setState({list: json.results}))
    }

    componentWillMount() {
        this._requestReviews(this.props.movieId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movieId !== this.props.movieId)
            this._requestReviews(nextProps.movieId)
    }

    render () {
        if (!this.state.list.length) return <div />

        return (
            <div>
                <h3>Reviews</h3>
                {this.state.list.map(review =>
                    <blockquote key={review.id}>
                        {review.content.split('\r\n').map((paragraph, i) =>
                            <p key={i}>{paragraph}</p>
                        )}
                        <small>{review.author}</small>
                    </blockquote>
                )}
            </div>
        )
    }
}

export default Reviews;
