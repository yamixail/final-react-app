'use strict'

import React, { Component, PropTypes } from 'react'
import { Grid } from 'react-bootstrap'
import Menu from '../main/Menu'

class Main extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    render () {
        return (
            <div>
                <Menu />
                <Grid>
                    {this.props.children}
                </Grid>
            </div>
        )
    }
}

export default Main
