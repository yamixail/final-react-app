'use strict'

import React, { Component, PropTypes } from 'react'

class RequestTMDB extends Component {
    static propTypes = {
        path: PropTypes.string.isRequired,
        oParams: PropTypes.object,
        children: PropTypes.element.isRequired
    }
    static defaultProps = {
        oParams: {}
    }

    state = {
        requestUrl: null,
        response: null
    }

    _createUrl(path, oParams = null) {
        const url = new URL(location.protocol + '//api.themoviedb.org/3' + path)

        url.searchParams.append('api_key', '6a0faa2a8c71b6075d8fca40823c3a6d')

        if (oParams)
            for (let key in oParams)
                url.searchParams.append(key, oParams[key])

        return url
    }

    _sendRequest (url) {
        if (!url) return false

        fetch(url, {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(json => this.setState({
            requestUrl: url,
            response: json
        }))
        .catch(error =>
            this.setState({
                requestUrl: null,
                response: {
                    error,
                    tryAgain: () => this._sendRequest(url)
                }
            })
        )
    }

    componentWillMount() {
        const requestUrl = this._createUrl(this.props.path, this.props.oParams)

        this._sendRequest(requestUrl)
    }

    componentWillReceiveProps(nextProps) {
        const nextRequestUrl = this._createUrl(nextProps.path, nextProps.oParams)

        // Prevent sending useless repeated requests
        if (
            !this.state.requestUrl ||
            this.state.requestUrl.pathname !== nextRequestUrl.pathname ||
            this.state.requestUrl.search !== nextRequestUrl.search
        ) {
            this._sendRequest(nextRequestUrl)
        }
    }


    render () {
        return React.cloneElement(
            this.props.children,
            this.state.response
        )
    }
}

export default RequestTMDB;
