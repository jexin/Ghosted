import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Entry.css'; 

export default class Entry extends Component {
    constructor() {
        super()
        this.state = {
            status: '',
            notes: ''
        }
        this.changeStatus = this.changeStatus.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
    }

    componentDidMount() {
        this.setState({
            status: this.props.entry.status,
            notes: this.props.entry.notes
        })
    }

    changeStatus(status) {
        if (this.props.visibility === "private") {
            this.setState({
                status: status
            })
            this.props.updateEntry(this.props.entry._id, this.props.entry.company, status, this.props.entry.notes)
        }
    }

    changeNotes(e) {
        if (this.props.visibility === "private") {
            this.setState({
                notes: e.target.value
            })
            this.props.updateEntry(this.props.entry._id, this.props.entry.company, this.props.entry.status, e.target.value)
    
        }
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.visibility === "private" ? (
                        <>
                            {this.props.total - this.props.index}
                        </>
                    ) : (
                        <>
                            {this.props.entry.name}
                        </>
                    )}
                </td>
                <td>
                    {this.props.entry.createdAt.substring(0,10)}
                </td>
                <td style={{color: this.state.status !== "" && "#f4ffad"}}>
                    {this.props.entry.company}</td>
                <td className="button">
                    <i 
                        style={{color: this.state.status === "Rejected" && "#f74e48"}}
                        onClick={() => this.changeStatus("Rejected")}>
                            <FontAwesomeIcon icon={faTimes} />
                    </i>
                </td>
                <td className="button">
                    <i
                        style={{color: this.state.status === "Accepted" && "#6bff90"}}
                        onClick={() => this.changeStatus("Accepted")}>
                            <FontAwesomeIcon icon={faCheck} />
                    </i>
                </td>
                <td className="button">
                    <i 
                        style={{color: this.state.status === "Ghosted" && "#5da8f5"}}
                        onClick={() => this.changeStatus("Ghosted")}>
                            <FontAwesomeIcon icon={faGhost} />
                    </i>
                </td>
                <td>
                    <textarea 
                        onChange={this.changeNotes}
                        value={this.state.notes}
                    />
                </td>
                <td>
                    {this.props.visibility === "private" && 
                        <>
                            <i onClick={() => {this.props.deleteEntry(this.props.entry._id, this.props.username)}}>
                            <FontAwesomeIcon icon={faTrashAlt} /></i>
                        </>
                    }
                </td>
            </tr>
        )
    } 
}