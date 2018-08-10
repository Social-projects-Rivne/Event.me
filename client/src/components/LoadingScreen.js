import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

export default class LoadingScreen extends Component {
	timer = null;

	constructor(props) {
		super(props);

		this.state = {
			wait_please: true
		};
	}

	componentDidMount() {
		this.timeoutHandle = setTimeout(() => {
			this.setState({wait_please: false})
		}, 2000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutHandle);
	}

	render() {
		return (<div style={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '22em'
			}}>
			<Fade in={this.state.wait_please}><CircularProgress size={150} thickness={4}/></Fade>
		</div>);
	}
}
