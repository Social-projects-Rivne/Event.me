import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { isLogged, request } from '../../utils';

class Comments extends Component {
  state = {
    comments: [],
  }

  componentDidMount = () => this.getComments();

  addComment = e => {
    const parentCommentId = e.currentTarget.getAttribute('data-id');
    let comment = {
      comment: document.getElementById('textarea-1').value,
      unix_time: Date.now(),
    }
    if (parentCommentId) {
      comment.father_comment_id = parentCommentId;
    }

    request(`/comment/${this.props.eventId}`, 'POST', JSON.stringify(comment))
      .then(data => {
        if ('success' in data && data.success) {
          document.getElementById('textarea-1').value = '';
          this.getComments();
        } else {
          window.Materialize.toast(`Your comment didn't added`, 5000);
        }
      })
  }

  getComments() {
    request(`/comment/${this.props.eventId}`).then(data => {
      if ('comments' in data && data.comments.length) {
        this.setState({ comments: data.comments });
      }
    })
  }

  renderCommentForm() {
    if (isLogged()) {
      return (
        <React.Fragment>
          <Row>
            <Col s={12} className="input-field">
              <textarea id="textarea-1" className="materialize-textarea"></textarea>
              <label htmlFor="textarea-1">Type your comment</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this.addComment}>
                Add comment
            </Button>
            </Col>
          </Row>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <p className="flow-text">
            If you want add a comment, log in or register on <Link to="/">home page</Link>.
          </p>
        </React.Fragment>
      )
    }
  }

  renderChildComments(childs, parentIndex) {
    if (childs.length) {
      return (
        <React.Fragment>
          {
            childs.map((obj, index) => {
              let commentId;
              if (parentIndex !== '') {
                commentId = parentIndex + '.' + index;
              } else commentId = index;
              return (
                <Card className="comment-card" key={commentId}>
                  <Row>
                    <Col s={6}>
                      <Link to={`/profile/${obj.author_id}`}>Author</Link>
                      &nbsp;
                  {moment(obj.timestamp).format("YYYY-MM-DD HH:mm")}
                    </Col>
                    <Col s={6} className="right-align hover-buttons">
                      <Button flat data-id={commentId} onClick={this.addComment}>Answer</Button>
                    </Col>
                  </Row>
                  <Row>{obj.comment}</Row>
                  <Row>{this.renderChildComments(obj.child, commentId)}</Row>
                </Card>
              )
            })
          }
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderCommentForm()}
        {this.renderChildComments(this.state.comments, '')}
      </React.Fragment>
    )
  }
}

export default Comments;
