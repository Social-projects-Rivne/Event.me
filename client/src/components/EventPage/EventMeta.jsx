import React, { Component } from 'react';
import { Icon, Col } from 'react-materialize';
import SingleMeta from './SingleMeta';
import { isEmpty } from '../../utils';

class EventMeta extends Component {
  renderTags() {
    if (!isEmpty(this.props.tags)) {
      let tags_arr = [];
      for (const key in this.props.tags) {
        if (this.props.tags.hasOwnProperty(key)) tags_arr[this.props.tags[key]] = key;
      }

      return (
        <Col className="valign-wrapper">
          <Icon>local_offer</Icon>
          &nbsp;
          {tags_arr.map((element, id)=> <span key={id}>{element}&nbsp;</span>)}
        </Col>
      );
    }
  }

  render() {
    return (
      <div>
        <SingleMeta icon="person" link={`/profile/${this.props.author_id}`}>
          {this.props.author_name}
        </SingleMeta>
        <SingleMeta icon="folder" link={`/category/${this.props.category_id}`}>
          {this.props.category}
        </SingleMeta>
        {this.renderTags()}
      </div>
    );
  }
}

export default EventMeta;
