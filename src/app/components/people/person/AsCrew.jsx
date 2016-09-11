'use strict'

import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Col} from 'react-bootstrap'

class AsCrew extends Component {
    static propTypes = {
        list: PropTypes.array
    }

    state = {
        listByJob: {}
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

        const objByJob = list.reduce(function (result, movie) {
            if (!result[movie.job])
                result[movie.job] = [movie]
            else
                result[movie.job].push(movie)

            return result
        }, {})

        let listByJob = []

        for (let key in objByJob) {
            listByJob.push({jobName: key, movies: objByJob[key]})
        }

        this.setState({listByJob})
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
        if (!this.state.listByJob.length) return <div />

        return (
            <Col md={6} sm={12}>
                {this.state.listByJob.map((job, i) =>
                    <div key={i}>
                        <h3>{job.jobName}</h3>
                        <ul>
                            {job.movies.map((movie, j) =>
                                <li key={j} style={{marginBottom: '10px'}}>
                                    <Link to={'/movie/' + movie.id}>{movie.title}</Link>
                                    {movie.year && ` (${movie.year})`}
                                    {movie.character && <p>Character: {movie.character}</p>}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Col>
        )
    }
}

export default AsCrew;
