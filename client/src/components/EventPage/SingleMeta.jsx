import React from 'react';
import { Icon, Col } from 'react-materialize';
import { Link } from 'react-router-dom';


const EventMeta = (props) => {
    return (
      <React.Fragment>
        {props.icon ? <Icon>{props.icon}</Icon> : ''}
        &nbsp;
        {props.link ? <Link to={props.link}>{props.children}</Link> : props.children}
      </React.Fragment>
    );
}

export default EventMeta;
