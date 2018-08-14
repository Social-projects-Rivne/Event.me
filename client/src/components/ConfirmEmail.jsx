import React, { Component } from 'react';
import { request } from '../utils';

class ConfirmEmail extends Component{
    state = {
        msg: ''
    }

    componentDidMount(){
        request('/email_confirm/'+this.props.match.params.token)
            .then(data=>{
                this.setState({msg: data.msg})
                window.Materialize.toast(this.state.msg, 3000)
            })
    }
    render() {
        return <div></div>
    }
}

export default ConfirmEmail;
