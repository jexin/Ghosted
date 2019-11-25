import React, {Component} from 'react';
import AuthUser from '../AuthUser/AuthUser'
import CreateUser from '../CreateUser/CreateUser'
import AddEntry from '../AddEntry';
import Entry from '../Entry/Entry'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './ListEntries.css'; 

export default class ListEntries extends Component {
    constructor() {
        super()
        this.state = {
            entries: [],
            total: 0,
            rejectRate: 0,
            acceptRate: 0,
            ghostRate: 0,
        }
        this.addEntry = this.addEntry.bind(this)
        this.updateEntry = this.updateEntry.bind(this)
        this.deleteEntry = this.deleteEntry.bind(this)
        this.calculateStats = this.calculateStats.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        axios.get('https://mighty-ghost.herokuapp.com/entries/')
            .then(response => {
                this.setState({
                    entries: response.data
                })
                this.calculateStats()
            })
    }

    addEntry(entry) {
        this.setState({
            total : this.state.total + 1,
            entries: [entry, ...this.state.entries]
        })   
    }

    updateEntry(id, company, status, notes) {
        const entry = {
            username: this.props.username,
            name: this.props.name,
            company: company,
            status: status,
            notes: notes,
        }
        axios.post('https://mighty-ghost.herokuapp.com/entries/update/' + id, entry)
            .then(() => {
                axios.get('https://mighty-ghost.herokuapp.com/entries/')
                .then(response => {
                    this.setState({
                        entries: response.data
                    })
                    this.calculateStats(entry.username)
                })
            })
    }

    deleteEntry(id, username) {
        axios.delete('https://mighty-ghost.herokuapp.com/entries/' + id)
            .then(() => this.setState({
                entries: this.state.entries.filter(entry => entry._id !== id)
            }, () => {
                this.calculateStats(username)
            }))     
    }

    calculateStats(username) {
        let rejectTotal = 0
        let acceptTotal = 0
        let ghostTotal = 0
        let totalEntries = 0;
        let entries = username ? 
            this.state.entries.filter(entry => entry.username === username) : 
            this.state.entries

        this.setState(() => {
            entries.map(entry => {
                if (entry.status === "Rejected") {
                    rejectTotal += 1
                } else if (entry.status === "Accepted") {
                    acceptTotal += 1
                } else if (entry.status === "Ghosted") {
                    ghostTotal += 1
                }
                totalEntries += 1
                return entry
            })
    
            return {
                rejectRate: rejectTotal,
                acceptRate: acceptTotal,
                ghostRate: ghostTotal,
                total: totalEntries
            }  
        })
    }

    onSubmit(e) {
        e.preventDefault()

        this.props.changeUser('', '')
        this.calculateStats()
    }

    render() {

        return(
            <div>
                {this.props.username ? (
                    <>
                        <div id="top">
                            <span id="name">{this.props.name}</span>
                            <span onClick={this.onSubmit}><FontAwesomeIcon icon={faSignOutAlt} color="#c5c7c5"/></span>
                        </div>
                        <AddEntry username={this.props.username} name={this.props.name} addEntry={this.addEntry}/>
                    </>
                ) : (
                    <>
                        <AuthUser changeUser={this.props.changeUser} calculateStats={this.calculateStats}/>
                        <CreateUser changeUser={this.props.changeUser} entries={this.state.entries}/>
                    </>
                )} 
                <table id="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Company</th>
                            <th id="rejected">Rejected</th>
                            <th id="accepted">Accepted</th>
                            <th id="ghosted">Ghosted</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.username ? (
                            <>
                                {this.state.entries.filter(entry => entry.username === this.props.username)
                                    .map((entry, index) => <Entry 
                                        index={index}
                                        key={entry._id}
                                        entry={entry}
                                        total={this.state.total}
                                        updateEntry={this.updateEntry}
                                        deleteEntry={this.deleteEntry}
                                        visibility='private'
                                />)}
                            </>
                        ) : (
                            <>
                                {this.state.entries.map(entry => <Entry 
                                    key={entry._id}
                                    entry={entry}
                                    visibility='public'
                                />)}
                            </>
                        )} 
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            <th></th>
                            <th>{this.state.rejectRate}</th>
                            <th>{this.state.acceptRate}</th>
                            <th>{this.state.ghostRate}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}