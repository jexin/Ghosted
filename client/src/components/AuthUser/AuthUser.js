import React, {Component} from 'react';
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './AuthUser.css'; 

export default class AuthUser extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            username: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        axios.get('https://mighty-ghost.herokuapp.com/users/')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
    }

    handleChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.state.users.map(user => {
            if (user.username === this.state.username) {
                this.props.changeUser(user.username, user.name)
            }
            return user
        })
        this.props.calculateStats(this.state.username)
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <label>Existing User</label>
                <input 
                    type="text" 
                    required 
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <span onClick={this.onSubmit}><FontAwesomeIcon icon={faUser} color="#c5c7c5"/></span>
            </form>
        )
    }
}