'use strict'

import React, { Component, PropTypes } from 'react'
import {NavDropdown, MenuItem} from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

class GenresDropdown extends Component {
    static propTypes = {
        response: PropTypes.object
    }

    render () {
        return (
            <NavDropdown title="Genres" id="menu-genres-dropdown">
                {this.props.response.genres.map(
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
