'use strict'

import React, {Component, PropTypes} from 'react'
import {Label, ControlLabel, FormGroup, Glyphicon} from 'react-bootstrap'
import Typeahead from 'react-bootstrap-typeahead'
import requestTMDB from '../../requestTMDB'

class GenresInput extends Component {
    state = {
        genresList: [],
        defaultSelected: []
    }

    static propTypes = {
        defaultValue: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    static SPLITTER = ','

    componentWillMount() {
        let callback = null

        if (this.props.defaultValue) {
            const selectedIds = this.props.defaultValue.split(GenresInput.SPLITTER)
            callback = () => {
                const defaultSelected = this.state.genresList.reduce(
                    function (result, genre) {
                        if (selectedIds.some(el => genre.id == el))
                            result.push(genre)

                        return result
                    }, []
                )

                this.setState({defaultSelected})
            }
        }

        requestTMDB('/genre/movie/list')
            .then(json => this.setState(
                    {genresList: json.genres},
                    callback
            ))
    }

    _handleChange(values) {
        const parsedValue = values.map(el => el.id).join(GenresInput.SPLITTER)

        this.setState(
            {defaultSelected: values},
            () => this.props.onChange(parsedValue)
        )
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
            defaultSelected.length < defaultValue.split(GenresInput.SPLITTER).length)
            return <span />

        return (
            <FormGroup>
                <ControlLabel>Genres</ControlLabel>
                <Typeahead
                    align="justify"
                    defaultSelected={this.state.defaultSelected}
                    labelKey="name"
                    maxHeight={500}
                    multiple
                    onChange={this._handleChange.bind(this)}
                    options={this.state.genresList}
                    renderToken={this._renderToken.bind(this)}
                    />
            </FormGroup>
        )
    }
}

export default GenresInput;
