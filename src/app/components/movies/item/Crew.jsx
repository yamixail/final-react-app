'use strict'

import React, {Component, PropTypes} from 'react'
import {Table} from 'react-bootstrap'

class Crew extends Component {
    static propTypes ={
        list: PropTypes.array
    }

    state = {
        listByJob: []
    }

    static importantDepartments = ['Directing', 'Production', 'Writing']

    _parseCrew(list) {
        if (!list || !list.length) return false

        const objPeopleByJob = list.reduce(function (result, person) {
            if (Crew.importantDepartments.indexOf(person.department) > -1) {
                if (!result[person.job])
                    result[person.job] = [person]
                else
                    result[person.job].push(person)
            }

            return result
        }, {})

        let parsedPeopleByJob = []
        for (let key in objPeopleByJob) {
            parsedPeopleByJob.push({
                name: key,
                people: objPeopleByJob[key]
            })
        }

        this.setState({listByJob: parsedPeopleByJob})
    }

    componentWillMount() {
        this._parseCrew(this.props.list)
    }

    componentWillReceiveProps(newProps) {
        this._parseCrew(newProps.list)
    }

    render () {
        if (!this.state.listByJob.length) return <div />

        return (
            <div>
                <h3>Crew</h3>
                <Table striped bordered condensed hover>
                    <tbody>
                        {this.state.listByJob.map( (job, i) => (
                            <tr key={i}>
                                <td>{job.name}</td>
                                <td>
                                    {job.people.map(person =>
                                        <a
                                            key={person.id}
                                            href="#"
                                            style={{marginRight: '5px'}}>
                                            {person.name}
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Crew;
