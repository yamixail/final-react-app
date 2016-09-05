'use strict'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router'
import {
    Navbar,
    Nav,
    NavItem,
    FormGroup,
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'
import RequestTMDB from '../RequestTMDB'
import GenresDropdown from './GenresDropdown'

class Menu extends Component {
    static propTypes = {
        router: PropTypes.object
    }

    _handleSearch() {
        const query = ReactDOM.findDOMNode(this.refs.search).value

        this.props.router.push({
            pathname: '/search',
            query: {query}
        })
    }

    render () {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse style={{
                        marginLeft: '-30px',
                        marginRight: '-15px'
                    }}>
                    <Nav stacked>
                        <IndexLinkContainer to="/">
                            <NavItem>Main</NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/top">
                            <NavItem>Top rated</NavItem>
                        </IndexLinkContainer>
                        <RequestTMDB path="/genre/movie/list">
                            <GenresDropdown />
                        </RequestTMDB>
                        <IndexLinkContainer to="/filter">
                            <NavItem>Filter</NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/about">
                            <NavItem>About</NavItem>
                        </IndexLinkContainer>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <InputGroup>
                                <FormControl
                                    type="search"
                                    ref="search"
                                    placeholder="Query"
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
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Menu);
