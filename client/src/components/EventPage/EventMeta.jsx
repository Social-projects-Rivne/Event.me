import React from 'react';
import SingleMeta from './SingleMeta';


const EventMeta = (props) => {
    return (
      <div className="valign-wrapper">
        <SingleMeta icon="person" link={`/profile/${props.author_id}`}>
          {props.author_name}
        </SingleMeta>
        <SingleMeta icon="folder" link={`/category/${props.category_id}`}>
          {props.category}
        </SingleMeta>
      </div>
    );
  }

export default EventMeta;
