import React, {Component} from 'react';
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class CreateEntry extends Component {
    constructor() {
        super()
        this.state = {
            company: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            company: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const entry = {
            username: this.props.username,
            name: this.props.name,
            company: this.state.company,
            status: '',
            notes: '',
        }

        axios.post('https://mighty-ghost.herokuapp.com/entries/add', entry)
            .then(res => this.props.addEntry(res.data))
            .catch(err => console.log(err))

        this.setState({company: ''})
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    required 
                    placeholder="Company"
                    value={this.state.company}
                    onChange={this.handleChange}
                />
                <span onClick={this.onSubmit}><FontAwesomeIcon icon={faPlus} color="#c5c7c5"/></span>
            </form>
        )
    }
}