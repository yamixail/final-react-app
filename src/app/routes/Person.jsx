'use strict'

import React, {Component, PropTypes} from 'react'
import {Col, Row, Table, Thumbnail} from 'react-bootstrap'
import requestTMDB, {getImgSrc} from '../requestTMDB'
import AsActor from '../components/people/person/AsActor'
import AsCrew from '../components/people/person/AsCrew'
import PageNotFound from './NoMatch'

class Home extends Component{
    static propTypes = {
        routeParams: PropTypes.object.isRequired
    }

    state = {
        info: null,
        personNotFound: false
    }

    _requestPerson(id) {
        requestTMDB('/person/' + id)
            .then(json => this.setState({info: json, personNotFound: false}))
            .catch((e) => this.setState({personNotFound: e}))

        requestTMDB('/person/' + id + '/movie_credits')
            .then(json => this.setState({cast: json.cast, crew: json.crew}))
    }

    componentWillMount() {
        this._requestPerson(this.props.routeParams.personId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.routeParams.personId !== this.props.routeParams.personId)
            this._requestPerson(nextProps.routeParams.personId)
    }

    render () {
        if (this.state.personNotFound) return <PageNotFound />

        if (!this.state.info || !this.state.crew || !this.state.cast) return <span />

        const {info} = this.state

        return (
            <div>
                <h1>{info.name}</h1>
                <Row>
                    <Col md={3}>
                        <Thumbnail src={getImgSrc(info.profile_path, 'w300')} alt={info.name} />
                    </Col>
                    <Col md={9}>
                        <Table striped bordered hover style={{
                                maxWidth: '400px'
                            }}>
                            <tbody>
                                {[
                                    'Place of birth',
                                    'Birthday',
                                    'Deathday'
                                ].map((field, i) => {
                                    const propName = field.toLowerCase().replace(/\ /g, '_')

                                    if (!info[propName]) return null

                                    return (
                                        <tr key={i}>
                                            <td>{field}</td>
                                            <td>{info[propName]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {info.biography &&
                            <div>
                                <h3>Biography</h3>
                                {info.biography.split('\n\n').map((paragraph, i) =>
                                    <p key={i}>{paragraph}</p>
                                )}
                            </div>
                        }
                    </Col>
                </Row>
                <Row>
                    <AsActor list={this.state.cast} />
                    <AsCrew list={this.state.crew} />
                </Row>
            </div>
        )
    }
}

export default Home;
