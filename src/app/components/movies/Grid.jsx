'use strict'

import React, { Component, PropTypes } from 'react'
import {

    Alert,
    Button,
    Col,
    Pagination,
    Row,
    Thumbnail
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import requestTMDB from '../../requestTMDB'

// Requirement from TMDB
const MAX_PAGES = 1000

class MovieGrid extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        oParams: PropTypes.object,
        proportions: PropTypes.object,
        posterWidth: PropTypes.number,
        topPaging: PropTypes.bool,
        bottomPaging: PropTypes.bool,
        onPageChange: PropTypes.func
    }

    static defaultProps = {
        list: [],
        proportions: {},
        posterWidth: 185,
        topPaging: false,
        bottomPaging: false
    }

    state = {
        json: {},
        error: false
    }

    sendRequest(path, oParams) {
        requestTMDB(path, oParams)
            .then(json => this.setState({json, error: false}))
            .catch(error => this.setState({json: {}, error}))
    }

    componentWillMount() {
        this.sendRequest(this.props.path, this.props.oParams)
    }

    componentWillReceiveProps(nextProps) {
        this.sendRequest(nextProps.path, nextProps.oParams)
    }

    render () {
        const {json, error} = this.state,
            moviesList = json.results

        if (error)
            return (
                <Alert bsStyle="danger">
                    <h4>Oops...</h4>
                    <p>Something went wrong.</p>
                    <p>
                        <Button
                            bsStyle="success"
                            onClick={() => this.sendRequest(
                                this.props.path,
                                this.props.oParams
                            )}>
                            Try again
                        </Button>
                    </p>
                </Alert>
            )


        if (!moviesList) return <p>Loading... Please wait.</p>

        if (!moviesList.length) return <p>Nothing found.</p>


        if (json.total_pages > 1 && (this.props.topPaging || this.props.bottomPaging))
            var PagingComp = () => (
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={
                        json.total_pages > MAX_PAGES
                            ? MAX_PAGES
                            : json.total_pages
                    }
                    maxButtons={5}
                    activePage={json.page}
                    onSelect={this.props.onPageChange} />
            )

        return (
            <div>
                {this.props.topPaging && PagingComp ? <PagingComp /> : ''}
                <Row>
                {moviesList.map(el =>
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
                                `${location.protocol}//image.tmdb.org/t/p/w${this.props.posterWidth + el.poster_path}`}
                            alt={el.title}
                            style={{textAlign: 'center'}}>
                            <h4>{el.title}</h4>
                            <LinkContainer to={'/movie/' + el.id}>
                                <Button bsStyle="primary">Details</Button>
                            </LinkContainer>
                        </Thumbnail>
                    </Col>
                )}
                </Row>
                {this.props.bottomPaging && PagingComp  ? <PagingComp /> : ''}
            </div>
        )
    }
}

export default MovieGrid
