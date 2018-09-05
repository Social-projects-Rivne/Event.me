import React, { Component } from 'react';
import { Row, Col, Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { isLogged, request } from '../../utils';

class Comments extends Component {
  state = {
    comments: [],
  }

  componentDidMount = () => this.getComments();

  getComments() {
    request(`/comment/${this.props.eventId}`).then(data => {
      if ('comments' in data && data.comments.length) {
        this.setState({ comments: data.comments });
      }
    })
  }

  showAnswerForm = e => e.currentTarget.parentNode.parentNode.lastChild.style.display = 'block';

  addComment = e => {
    let forms = document.getElementsByClassName('answer-form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].style.display = 'none';
    }

    const parentCommentId = e.currentTarget.getAttribute('data-id');
    let comment = {
      comment: document.getElementById(`textarea-${parentCommentId}`).value,
      unix_time: Date.now(),
    }
    document.getElementById(`textarea-${parentCommentId}`).value = '';

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

  deleteComment = e => {
    const commentParams = {
      comment_id: e.currentTarget.getAttribute('data-id'),
    }
    console.log(commentParams)
    request(`/comment/${this.props.eventId}`, 'DELETE', JSON.stringify(commentParams))
      .then(data => {
        if ('success' in data && data.success) {
          this.getComments();
        } else {
          window.Materialize.toast(`Your comment didn't deleted`, 4000);
        }
      })
  }

  renderCommentForm(comment_id) {
    if (isLogged()) {
      return (
        <React.Fragment>
          <Row>
            <Col s={12} className="input-field">
              <textarea id={`textarea-${comment_id}`} className="materialize-textarea"></textarea>
              <label htmlFor={`textarea-${comment_id}`}>Type your comment</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button data-id={comment_id} onClick={this.addComment}>
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

  renderCommentOptionsButton(commentId) {
    return (
      <div className="fixed-action-btn horizontal click-to-toggle">
        <a>...</a>
        <ul>
          <li className="waves-effect waves-red hoverable card-panel"><a data-id={commentId} onClick={this.deleteComment}>Delete comment</a></li>
        </ul>
      </div>
    )
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
                <div className="comment-block" key={commentId}>
                  <Row>
                    <Col s={6}>
                      <Link to={`/profile/${obj.author_id}`}>{obj.author_nickname}</Link>
                      &nbsp;
                      {moment(obj.timestamp).format("YYYY-MM-DD HH:mm")}
                    </Col>
                    <Col s={6} className="right-align hover-buttons">
                      {parseInt(sessionStorage['User-id'], 10) === obj.author_id ? this.renderCommentOptionsButton(commentId) : ''}
                    </Col>
                  </Row>
                  <Row>
                    <Col s={12}>{obj.comment}</Col>
                  </Row>
                  <Row>
                    <Col s={1}>
                      <a className="answer-link" onClick={this.showAnswerForm}>Answer</a>
                    </Col>
                    <Col s={11} className="answer-form">
                      {this.renderCommentForm(commentId)}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="child-wrapper" s={12}>
                      <Col s={12}>
                        {this.renderChildComments(obj.child, commentId)}
                      </Col>
                    </Col>
                  </Row>
                </div>
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
        {this.renderCommentForm('')}
        {this.state.comments.length ? this.renderChildComments(this.state.comments, '') : <p className="flow-text">No comments</p>}
      </React.Fragment>
    )
  }
}

export default Comments;
