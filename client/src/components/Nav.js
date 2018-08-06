import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'
import {NavLink} from 'react-router-dom'
import {server_url} from '../config.json'


let myHeaders = new Headers();

export class Nav extends Component {
  log_out = (e) => {
    e.preventDefault()
    if (typeof(sessionStorage['Authorization-token']) !== 'undefined'){
      myHeaders.append('Authorization', 'Token ' + sessionStorage['Authorization-token']);
      fetch(server_url+'/log-out', {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors'
      })
        .then((response)=>{ return response.json(); })
        .then((data) => {
          if(data.success){
            sessionStorage.removeItem('Authorization-token')
            console.log("Token successfuly removed")
          }
          else{
            alert(data.msg);
          }
        })
    }
    else alert("You are not authenticated")
  }

  render() {
    return (
        <Navbar brand='Event.me' right>
          <li><NavLink to='log-in'>Log In</NavLink></li>
          <NavItem onClick={this.log_out} href="log-out">Log Out</NavItem>
        </Navbar>
    );
  }
}
