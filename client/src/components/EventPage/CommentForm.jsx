import React from 'react';
import { Row, Col, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { isLogged } from '../../utils';


const CommentForm = props => {
  if (isLogged()) {
    return (
      <React.Fragment>
        <Row>
          <Col s={12} className="input-field">
            <textarea id={`textarea-${props.commentId}`} className="materialize-textarea"></textarea>
            <label htmlFor={`textarea-${props.commentId}`}>Type your comment</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button data-id={props.commentId} onClick={props.addComment}>
              Add comment
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  } else {
    return (
      <Row>
        <Col>
          <p>
            If you want add a comment, log in or register on <Link to="/">home page</Link>.
          </p>
        </Col>
      </Row>
    )
  }
}

export default CommentForm;
