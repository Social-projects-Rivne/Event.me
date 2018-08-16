import React, { Component } from 'react';
import { Autocomplete } from 'react-materialize';
import { request } from '../utils';

class TagAutocomplete extends Component {
  state = {
    tags_autocomplete: {},
  }

  componentDidMount() {
    request('/tag').then(data => {
      let autocomplete = {};
      for (let i = 0; i < data.tags.length; i++) {
        autocomplete[data.tags[i]] = null;
      };

      this.setState({ tags_autocomplete: autocomplete });
    });
  }

  render(){
    return (
      <Autocomplete
        s={12}
        id="tags"
        title="Tags"
        onChange={this.onChangeHandler}
        data={this.state.tags_autocomplete}
      />
    );
  }
}

export default TagAutocomplete;
