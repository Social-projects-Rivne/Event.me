import React, {Component} from 'react';
import ProfilePage from './Profile-Page';
import LoadingScreen from './LoadingScreen';

export class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			wait_please: false,
			component: <LoadingScreen/>
		}
	}

	componentDidMount() {
		this.timeoutHandle = setTimeout(() => {
			this.setState({wait_please: true, component: <ProfilePage/>})
		}, 3000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutHandle);
	}
	render() {
		return (this.state.component);
	}
}
