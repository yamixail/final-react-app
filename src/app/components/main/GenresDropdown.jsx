'use strict'

import React, { Component, PropTypes } from 'react'
import {NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

class GenresDropdown extends Component {
    static propTypes = {
        genres: PropTypes.array
    }

    render () {
        if (!this.props.genres)
            return <IndexLinkContainer to="/genres">
                <NavItem>Genres</NavItem>
            </IndexLinkContainer>

        return (
            <NavDropdown title="Genres" id="menu-genres-dropdown">
                {this.props.genres.map(
                    el =>
                        <IndexLinkContainer
                            key={el.id}
                            to={`/genres/${el.id}`}>
                            <MenuItem>{el.name}</MenuItem>
                        </IndexLinkContainer>
                )}
            </NavDropdown>
        )
    }
}

export default GenresDropdown;
