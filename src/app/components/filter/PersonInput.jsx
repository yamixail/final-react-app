'use strict'

import React, {Component, PropTypes} from 'react'
import {Label, ControlLabel, FormGroup, Glyphicon} from 'react-bootstrap'
import Typeahead from 'react-bootstrap-typeahead'
import requestTMDB from '../../requestTMDB'

class PersonInput extends Component {
    state = {
        personsList: [],
        defaultSelected: []
    }

    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    static SPLITTER = ','

    componentWillMount() {
        if (!this.props.defaultValue) return false

        this.props.defaultValue.split(PersonInput.SPLITTER).forEach(
            personId =>
                requestTMDB('/person/' + personId)
                    .then(
                        json => this.setState({
                            defaultSelected: [...this.state.defaultSelected, json]
                        })
                    )
        )
    }

    _handleChange(values) {
        const parsedValue = values.map(el => el.id).join(PersonInput.SPLITTER)

        this.setState(
            {defaultSelected: values},
            () => this.props.onChange(parsedValue)
        )
    }

    _handleInputChange(value) {
        if (value.length < 2) {
            this.setState({personsList: []})
            return false
        }

        requestTMDB('/search/person', {query: value})
            .then(json => this.setState({personsList: json.results}))
    }

    _renderToken(option, onRemove) {
        return (
            <Label
                key={option.id}
                bsStyle="primary"
                style={{
                    display: 'inline-block',
                    marginRight: '5px'
                }} >
                {option.name + ' '}
                <Glyphicon
                    glyph="remove"
                    onClick={onRemove}
                    style={{
                        cursor: 'pointer'
                    }} />
            </Label>
        )
    }

    render () {
        const {defaultValue} = this.props,
            {defaultSelected} = this.state

        if (defaultValue &&
            defaultSelected.length < defaultValue.split(PersonInput.SPLITTER).length)
            return <span />

        return (
            <FormGroup>
                <ControlLabel>Cast or crew persons</ControlLabel>
                <Typeahead
                    align="justify"
                    defaultSelected={this.state.defaultSelected}
                    labelKey="name"
                    maxHeight={500}
                    multiple
                    onChange={this._handleChange.bind(this)}
                    onInputChange={this._handleInputChange.bind(this)}
                    options={this.state.personsList}
                    renderToken={this._renderToken.bind(this)}
                    />
            </FormGroup>
        )
    }
}

export default PersonInput;
