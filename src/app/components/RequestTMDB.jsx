'use strict'

import React, { Component, PropTypes } from 'react'

class RequestTMDB extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        oParams: PropTypes.object,
        children: PropTypes.element.isRequired
    }

    state = {
        responseJSON: null
    }

    componentWillMount () {
        const url = new URL('http://api.themoviedb.org/3' + this.props.path)
        url.searchParams.append('api_key', '6a0faa2a8c71b6075d8fca40823c3a6d')

        if (this.props.oParams)
            for (let key in this.props.oParams)
                url.searchParams.append(key, this.props.oParams[key])

        fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(json => this.setState({responseJSON: json}))
    }

    render () {
        if (!this.state.responseJSON) return false;

        return React.cloneElement(
            this.props.children,
            {response: this.state.responseJSON}
        )
    }
}

export default RequestTMDB;
