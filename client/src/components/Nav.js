import React, {Component} from 'react';
import {Navbar, NavItem} from 'react-materialize'

export class Nav extends Component {
	render() {
		return (<Navbar brand='Event.me' right="right" style={{
				paddingLeft: "3em"
			}}>
			<NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
		</Navbar>);
	}
}
