'use strict'

import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap'

class Cast extends Component {
    static propTypes = {
        list: PropTypes.array
    }

    static CUTLINE_ELEMENTS = 10

    state = {
        isShowFull: false,
        cutedList: []
    }

    componentWillMount() {
        if (this.props.list)
            this.setState({
                cutedList: this.props.list.slice(0, Cast.CUTLINE_ELEMENTS)
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list)
            this.setState({
                cutedList: nextProps.list.slice(0, Cast.CUTLINE_ELEMENTS)
            })
    }

    _getToggleLink() {
        if (!this.props.list || Cast.CUTLINE_ELEMENTS >= this.props.list.length)
            return <div />

        let link = {
            text: 'Show less',
            glyph: 'chevron-up'
        }

        if (!this.state.isShowFull)
            link = {
                text: 'Show more',
                glyph: 'chevron-down'
            }

        return (
            <Button onClick={() => this.setState({isShowFull: !this.state.isShowFull})}>
                {link.text}
                <Glyphicon glyph={link.glyph} style={{marginLeft: '5px'}} />
            </Button>
        )
    }

    render () {
        const ToggleLink = this._getToggleLink(),
            castNowShow = this.state.isShowFull
                ? this.props.list
                : this.state.cutedList

        if (!castNowShow || !castNowShow.length) return <div />

        return (
            <div>
                <h3>Cast</h3>
                <ul className="list-unstyled">
                    {castNowShow.map(person =>
                        <li key={person.id}>
                            <OverlayTrigger
                                trigger={['hover', 'focus']}
                                placement="left"
                                overlay={
                                    <Tooltip
                                        id={'cast' + person.id}>
                                        {'Character: ' + person.character}
                                    </Tooltip>
                                } >
                                <a href="#">{person.name}</a>
                            </OverlayTrigger>
                        </li>
                    )}
                </ul>
                {ToggleLink}
            </div>
        )
    }
}

export default Cast;
