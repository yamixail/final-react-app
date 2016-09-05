'use strict'

import React from 'react'
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

const Menu = () => (
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
                        <FormControl type="search" placeholder="Query" />
                        <InputGroup.Button>
                            <Button type="submit">Search</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
)

export default Menu;
