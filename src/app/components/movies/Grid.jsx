'use strict'

import React, { Component, PropTypes } from 'react'
import {
    Row,
    Col,
    Thumbnail,
    Button
} from 'react-bootstrap'

class MovieGrid extends Component {
    static propTypes = {
        response: PropTypes.object,
        proportions: PropTypes.object,
        needWidth: PropTypes.number
    }

    static defaultProps = {
        proportions: {},
        needWidth: 185
    }

    render () {
        return (
            <Row>
                {this.props.response.results.map(el =>
                    <Col
                        key={el.id}
                        {...this.props.proportions}
                        style={{
                            float: 'none',
                            display: 'inline-block',
                            verticalAlign: 'top'
                        }}>
                        <Thumbnail
                            src={el.poster_path &&
                                `http://image.tmdb.org/t/p/w${this.props.needWidth + el.poster_path}`}
                            alt={el.title}
                            style={{textAlign: 'center'}}>
                            <h4>{el.title}</h4>
                            <Button bsStyle="primary" href={`/film/${el.id}`}>Details</Button>
                        </Thumbnail>
                    </Col>
                )}
            </Row>
        )
    }
}

export default MovieGrid;
