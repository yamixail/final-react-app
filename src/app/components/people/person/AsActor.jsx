'use strict'

import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Col} from 'react-bootstrap'

class AsActor extends Component {
    static propTypes = {
        list: PropTypes.array
    }

    state = {
        list: []
    }

    _prepareList(list) {
        list.sort(function (a, b) {
            a.year = a.release_date && parseInt(a.release_date.slice(0, 4))
            b.year = b.release_date && parseInt(b.release_date.slice(0, 4))

            const diff = b.year - a.year

            if (!a.year || !b.year || !diff)
                return a.title.localeCompare(b.title)

            return diff
        })

        this.setState({list})
    }

    componentWillMount() {
        if (this.props.list)
            this._prepareList(this.props.list)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list && nextProps.list != this.props.list)
            this._prepareList(nextProps.list)
    }

    render () {
        if (!this.state.list || !this.state.list.length) return <div />

        return (
            <Col md={6} sm={12}>
                <h3>Actor</h3>
                <ul>
                    {this.state.list.map((movie, i) =>
                        <li key={i} style={{marginBottom: '10px'}}>
                            <Link to={'/movie/' + movie.id}>{movie.title}</Link>
                            {movie.year && ` (${movie.year})`}
                            {movie.character && <p>Character: {movie.character}</p>}
                        </li>
                    )}
                </ul>
            </Col>
        )
    }
}

export default AsActor;
