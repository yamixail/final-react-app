'use strict'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router'
import {Button, FormControl, FormGroup, InputGroup} from 'react-bootstrap'
import RequestTMDB from '../components/RequestTMDB'
import MovieGrid from '../components/movies/Grid'

class Search extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    }

    _handleSearch() {
        const query = ReactDOM.findDOMNode(this.refs.search).value

        this.props.router.push({
            pathname: '/search',
            query: {query}
        })
    }

    render () {
        const queryObj = this.props.location.query
        var content

        if (!queryObj.query)
            content = <p>Please, use the words</p>
        else
            content = (
                <RequestTMDB
                    path="/search/movie"
                    oParams={this.props.location.query}>
                    <MovieGrid
                        proportions={{
                            md: 3,
                            sm: 4,
                            xs: 6
                        }}
                        bottomPaging
                        onPageChange={page =>
                            this.props.router.push({
                                pathname: '/search',
                                query: {...queryObj, page}
                            })
                        } />
                </RequestTMDB>
            )

        return (
            <div>
                <h1>Search</h1>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="search"
                            ref="search"
                            placeholder="Search query"
                            defaultValue={queryObj.query}
                            onKeyPress={e => {
                                if (e.key === 'Enter')
                                    this._handleSearch()
                            }}/>
                        <InputGroup.Button>
                            <Button
                                type="submit"
                                onClick={() => {
                                    this._handleSearch()
                                }}>Search</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
                {content}
            </div>
        )
    }
}

export default withRouter(Search)
