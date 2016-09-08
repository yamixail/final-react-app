'use strict'

import React, { Component, PropTypes } from 'react'
import {NavItem, Nav} from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'
import requestTMDB from '../requestTMDB'

class GenresDropdown extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired
    }

    state = {
        genres: [],
        error: false
    }

    sendRequest(path) {
        requestTMDB(path)
            .then(json => this.setState({genres: json.genres, error: false}))
            .catch(error => this.setState({genres: [], error}))
    }

    componentWillMount() {
        this.sendRequest(this.props.path)
    }

    componentWillReceiveProps(nextProps) {
        this.sendRequest(nextProps.path)
    }

    render () {
        if (!this.state.genres.length) return <span />

        return (
            <Nav bsStyle="pills" stacked>
                {this.state.genres.map(
                    el =>
                        <IndexLinkContainer
                            key={el.id}
                            to={`/genre/${el.id}`}>
                            <NavItem>{el.name}</NavItem>
                        </IndexLinkContainer>
                )}
            </Nav>
        )
    }
}

export default GenresDropdown;
