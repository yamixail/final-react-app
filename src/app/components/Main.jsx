import React, { PropTypes } from 'react'

const Main = React.createClass({
    propTypes: {
        children: PropTypes.element.isRequired
    },
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

export default Main
