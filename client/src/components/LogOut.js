import React, { Component } from 'react'
import { NavItem } from 'react-materialize'
import { server_url } from '../config.json'

let myHeaders = new Headers();

export class LogOut extends Component {
    state = {
        msg: ''
    }
    log_out = (e) => {
        e.preventDefault()

        if (this.props.isLogged()) {
            myHeaders.append('Authorization', 'Token ' + sessionStorage['Authorization-token']);

            fetch(server_url + '/log-out', {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors'
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        sessionStorage.removeItem('Authorization-token')
                        sessionStorage.removeItem('User-nickname')
                        sessionStorage.removeItem('User-avatar')
                        console.log("Token successfuly removed")
                        this.props.update()
                    }
                    else {
                        console.log(data.msg);
                        this.setState({msg: data.msg})
                    }
                })
        }
        else alert("You are not authenticated")
    }

    render() {
        return <NavItem onClick={this.log_out} href="log-out">Log Out</NavItem>
    }
}
