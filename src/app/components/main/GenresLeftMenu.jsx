'use strict'

import React, { Component, PropTypes } from 'react'
import {NavItem, Nav} from 'react-bootstrap'
import {IndexLinkContainer} from 'react-router-bootstrap'

class GenresDropdown extends Component {
    static propTypes = {
        genres: PropTypes.array
    }

    render () {
        if (!this.props.genres) return null

        return (
            <Nav bsStyle="pills" stacked>
                {this.props.genres.map(
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
