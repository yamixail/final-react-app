'use strict'

import React, { Component } from 'react'

class NoMatch extends Component {
    render () {
        return (
            <div>
                <h1>About project</h1>
                <p>
                    This is open-source project. App source you can find
                    {' '}<a href="https://github.com/yamixail/final-react-app">here</a>
                </p>
                <p>
                    Project is made to learn how to build application with
                    {' '}<a href="https://facebook.github.io/react/" target="_blank">React.js</a>
                </p>
            </div>
        )
    }
}

export default NoMatch;
