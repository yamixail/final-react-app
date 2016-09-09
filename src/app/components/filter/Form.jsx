'use strict'

import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {
    Button,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    Row
} from 'react-bootstrap'
import GenresInput from './GenresInput'
import PersonInput from './PersonInput'

class FilterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            values: Object.assign(
                {},
                FilterForm.filterDefaultQuery,
                props.defaultValues
            )
        }

        this._sortChange = this._sortChange.bind(this)
    }

    static propTypes = {
        defaultValues: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    }

    static filterDefaultQuery = {
        'page': 1,
        'primary_release_year': '',
        'sort_by': 'popularity.desc',
        'vote_average.gte': '',
        'vote_average.lte': '',
        'vote_count.gte': '',
        'vote_count.lte': '',
        'with_genres': '',
        'with_people': ''
    }

    // Update filter parameter value in this.state.values
    _updateValue(paramName, value, cb = null) {
        this.setState({
            values: {
                ...this.state.values,
                [paramName]: value
            }
        },
        cb)
    }

    _handleChange(name) {
        return e => this._updateValue(name, e.target.value)
    }

    _sortChange() {
        const value = ReactDOM.findDOMNode(this.refs.sortBy).value + '.' +
            ReactDOM.findDOMNode(this.refs.sortDirection).value

        this._updateValue('sort_by', value, this._handleFilter)
    }

    _handleFilter() {
        let filterProps = {}

        for (let key in this.state.values)
            if (this.state.values[key])
                filterProps[key] = this.state.values[key]

        this.props.onSubmit(filterProps)
    }

    render () {
        const {defaultValues} = this.props,
            sortPieces = defaultValues.sort_by ? defaultValues.sort_by.split('.') : [],
            ifEnterKeyThenRequest = e => {
                if (e.key === 'Enter') this._handleFilter()
            }

        return (
            <div>
                <FormGroup>
                    <ControlLabel>Primary release year</ControlLabel>
                    <FormControl
                        type="input"
                        defaultValue={defaultValues.primary_release_year}
                        onChange={this._handleChange('primary_release_year')}
                        onKeyPress={ifEnterKeyThenRequest} />
                </FormGroup>
                <GenresInput
                    defaultValue={defaultValues.with_genres}
                    onChange={value => this._updateValue('with_genres', value, this._handleFilter)} />
                <PersonInput
                    defaultValue={defaultValues.with_people}
                    onChange={value => this._updateValue('with_people', value, this._handleFilter)} />
                <FormGroup style={{marginBottom: 0}}>
                    <ControlLabel>Vote average</ControlLabel>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel>greater or equal than</ControlLabel>
                                <FormControl
                                    type="number"
                                    min="0"
                                    max="10"
                                    defaultValue={defaultValues['vote_average.gte']}
                                    onChange={this._handleChange('vote_average.gte')}
                                    onKeyPress={ifEnterKeyThenRequest} />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel>lower or equal than</ControlLabel>
                                <FormControl
                                    type="number"
                                    min="0"
                                    max="10"
                                    defaultValue={defaultValues['vote_average.lte']}
                                    onChange={this._handleChange('vote_average.lte')}
                                    onKeyPress={ifEnterKeyThenRequest} />
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup style={{marginBottom: 0}}>
                    <ControlLabel>Vote count</ControlLabel>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel>greater or equal than</ControlLabel>
                                <FormControl
                                    type="number"
                                    defaultValue={defaultValues['vote_count.gte']}
                                    onChange={this._handleChange('vote_count.gte')}
                                    onKeyPress={ifEnterKeyThenRequest} />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <ControlLabel>lower or equal than</ControlLabel>
                                <FormControl
                                    type="number"
                                    defaultValue={defaultValues['vote_count.lte']}
                                    onChange={this._handleChange('vote_count.lte')}
                                    onKeyPress={ifEnterKeyThenRequest} />
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Sort by</ControlLabel>
                    <FormControl
                        ref="sortBy"
                        componentClass="select"
                        defaultValue={sortPieces[0]}
                        onChange={this._sortChange} >
                        <option value="popularity">popularity</option>
                        <option value="descrelease_date">descrelease date</option>
                        <option value="revenue">revenue</option>
                        <option value="primary_release_date">primary release date</option>
                        <option value="original_title">original title</option>
                        <option value="vote_average">vote average</option>
                        <option value="vote_count">vote count</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Sorting direction</ControlLabel>
                    <FormControl
                        ref="sortDirection"
                        componentClass="select"
                        defaultValue={sortPieces[1]}
                        onChange={this._sortChange} >
                        <option value="desc">descending</option>
                        <option value="asc">ascending</option>
                    </FormControl>
                </FormGroup>
                <Button
                    block
                    bsStyle="primary"
                    onClick={() => this._handleFilter()}
                     >Filter</Button>
            </div>
        )
    }
}

export default FilterForm;
