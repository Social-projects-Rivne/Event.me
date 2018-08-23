import React from 'react';
import { Icon, Col } from 'react-materialize';
import { Link } from 'react-router-dom';


const EventMeta = (props) => {
    return (
      <Col className="valign-wrapper">
        {props.icon ? <Icon>{props.icon}</Icon> : ''}
        &nbsp;
        {
          props.link ?
            <Link to={props.link}>{props.children}</Link>
            : props.children
        }
      </Col>
    );
}

export default EventMeta;
