import React, {Component} from 'react';
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import './CreateUser.css'

export default class CreateUser extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            name: '',
            exists: false
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changeName = this.changeName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
        this.props.entries.map(entry => {
            if (entry.username === e.target.value) {
                this.setState({
                    exists: true
                })
            } else {
                this.setState({
                    exists: false
                })
            }
            return entry
        })
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            name: this.state.name
        }

        axios.post('https://mighty-ghost.herokuapp.com/users/add', user)
            .then(() => this.props.changeUser(user.username, user.name))
            .catch(() => this.setState({
                username: '',
                name: ''
            }))
    }

    render() {
        return(
            <form>
                <label>New User</label>
                <input 
                    type="text" 
                    required
                    placeholder="Unique Username"
                    value={this.state.username}
                    onChange={this.changeUsername}
                />
                <input
                    type="text" 
                    required 
                    placeholder="Display Name"
                    value={this.state.name}
                    onChange={this.changeName}
                />
                <span onClick={this.onSubmit}><FontAwesomeIcon icon={faUserPlus} color="#c5c7c5"/></span>
                {this.state.exists && 
                    <span id="warning">Username already taken</span>
                }
            </form>
        )
    }
}