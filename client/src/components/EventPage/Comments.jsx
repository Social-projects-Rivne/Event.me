import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CommentForm from './CommentForm';
import { request } from '../../utils';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
    this.addComment = this.addComment.bind(this);
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
    let comment = { comment: document.getElementById(`textarea-${parentCommentId}`).value }
    if (parentCommentId) comment.parent_comment_id = parentCommentId;

    request(`/comment/${this.props.eventId}`, 'POST', JSON.stringify(comment))
      .then(data => {
        if ('success' in data && data.success) {
          document.getElementById(`textarea-${parentCommentId}`).value = '';
          this.getComments();
        } else {
          window.Materialize.toast(`Your comment hasn't been added`, 4000);
        }
      })
  }

  deleteComment = e => {
    const commentParams = { comment_id: e.currentTarget.getAttribute('data-id') }

    request(`/comment/${this.props.eventId}`, 'DELETE', JSON.stringify(commentParams))
      .then(data => {
        if (data.success) {
          this.getComments();

          let toggleButtons = document.getElementsByClassName('click-to-toggle');
          for (let i = 0; i < toggleButtons.length; i++) {
            toggleButtons[i].classList.remove('active');
          }
        } else {
          window.Materialize.toast(`Your comment hasn't been deleted`, 4000);
        }
      })
  }

  renderCommentOptionsButton(commentId, deleted, author_id) {
    if (
      parseInt(sessionStorage['User-id'], 10) === author_id
      && !deleted
    ) {
      return (
        <div className="fixed-action-btn horizontal click-to-toggle">
          <a className="points">...</a>
          <ul>
            <li className="waves-effect waves-red hoverable card-panel">
              <a data-id={commentId} onClick={this.deleteComment}>Delete comment</a>
            </li>
          </ul>
        </div>
      )
    }
  }

  renderChildComments(childs, parentIndex) {
    if (childs.length) {
      return (
        <React.Fragment>
          {
            childs.map((obj, index) => {
              let commentId = parentIndex ? parentIndex + '.' + index : index;

              return (
                <div className="comment-block" key={commentId}>
                  <Row>
                    <Col s={6} className="valign-wrapper">
                      <img
                        alt="user pictogram"
                        className="user-pictogram"
                        src="/img/person.jpg"
                      />
                      <Link className="author-link" to={`/profile/${obj.author_id}`}>
                        {obj.author_nickname}
                      </Link>
                      {moment(obj.timestamp).format("MMMM D, YYYY HH:mm")}
                    </Col>
                    <Col s={6} className="right-align hover-buttons">
                      {this.renderCommentOptionsButton(commentId, obj.deleted, obj.author_id)}
                    </Col>
                  </Row>
                  <Row>
                    <Col s={12} className={obj.deleted ? 'comment-deleted' : ''}>
                      <p>{obj.comment}</p>
                    </Col>
                  </Row>
                  {
                    obj.deleted ? ''
                      :
                      <Row>
                        <Col s={1}>
                          <a className="answer-link" onClick={this.showAnswerForm}>Answer</a>
                        </Col>
                        <Col s={11} className="answer-form">
                          <CommentForm commentId={commentId} addComment={this.addComment} />
                        </Col>
                      </Row>
                  }
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
        <CommentForm commentId='' addComment={this.addComment} />
        {this.state.comments.length ?
          this.renderChildComments(this.state.comments, '')
          : <p className="flow-text">No comments</p>}
      </React.Fragment>
    )
  }
}

export default Comments;
