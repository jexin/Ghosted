import React, {Component} from 'react';
import ListEntries from '../ListEntries/ListEntries'
import './App.css'; 

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      name: ''
    }
    this.changeUser = this.changeUser.bind(this)
  }

  changeUser(username, name) {
    this.setState({
      username: username,
      name: name
    })
  }

  render() {
    return (
      <ListEntries changeUser={this.changeUser} username={this.state.username} name={this.state.name}/>
    );
  }
}
