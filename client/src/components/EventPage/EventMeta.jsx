import React, { Component } from 'react';
import SingleMeta from './SingleMeta';


class EventMeta extends Component {


  render() {
    return (
      <div>
        <SingleMeta icon="person" link={`/profile/${this.props.author_id}`}>
          {this.props.author_name}
        </SingleMeta>
        <SingleMeta icon="folder" link={`/category/${this.props.category_id}`}>
          {this.props.category}
        </SingleMeta>
      </div>
    );
  }
}

export default EventMeta;
