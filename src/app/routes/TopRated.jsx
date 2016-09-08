'use strict'

import React, {Component, PropTypes} from 'react'
import { withRouter } from 'react-router'
import MovieGrid from '../components/movies/Grid'

class TopRated extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    }

    render () {
        return (
            <div>
                <h1>Top rated movies all time</h1>
                <MovieGrid
                    path="/movie/top_rated"
                    oParams={this.props.location.query}
                    proportions={{
                        md: 3,
                        sm: 4,
                        xs: 6
                    }}
                    topPaging
                    bottomPaging
                    onPageChange={page =>
                        this.props.router.push({
                            pathname: '/top',
                            query: {page}
                        })
                    } />
            </div>
        )
    }
}

export default withRouter(TopRated)
