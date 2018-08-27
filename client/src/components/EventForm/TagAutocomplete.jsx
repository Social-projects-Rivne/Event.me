import React, { Component } from 'react';
import { Col } from 'react-materialize';
import { request } from '../../utils';


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
      window.$('#chips-tags').material_chip({
        autocompleteOptions: {
          data: autocomplete,
          limit: Infinity,
          minLength: 2,
        },
        placeholder: 'Enter a tag',
      });
    });
  }

  componentDidUpdate() {
    if ('value' in this.props) {
      let chip_data = []
      for (const key in this.props.value) {
        chip_data.push({ tag: String([key]) });
      }

      window.$('#chips-tags').material_chip({
        data: chip_data,
        autocompleteOptions: {
          data: this.state.tags_autocomplete,
          limit: Infinity,
          minLength: 2,
        },
        placeholder: 'Enter a tag',
      });
    }
  }

  render(){
    return (
      <Col s={12}><div id="chips-tags" className="chips chips-autocomplete"></div></Col>
    );
  }
}

export default TagAutocomplete;
