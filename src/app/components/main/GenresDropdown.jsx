'use strict'

import React, { Component, PropTypes } from 'react'
import {NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'
import requestTMDB from '../../requestTMDB'

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
            .catch(() => this.sendRequest(path))
    }

    componentWillMount() {
        this.sendRequest(this.props.path)
    }

    componentWillReceiveProps(nextProps) {
        this.sendRequest(nextProps.path)
    }

    render () {
        if (!this.state.genres.length)
            return <IndexLinkContainer to="/genres">
                <NavItem>Genres</NavItem>
            </IndexLinkContainer>

        return (
            <NavDropdown title="Genres" id="menu-genres-dropdown">
                {this.state.genres.map(
                    el =>
                        <IndexLinkContainer
                            key={el.id}
                            to={`/genre/${el.id}`}>
                            <MenuItem>{el.name}</MenuItem>
                        </IndexLinkContainer>
                )}
            </NavDropdown>
        )
    }
}

export default GenresDropdown;
