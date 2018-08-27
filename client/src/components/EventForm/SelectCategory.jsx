import React, { Component } from 'react';
import { Input } from 'react-materialize';
import { request } from '../../utils';


class SelectCategory extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    request('/category').then(data => {
      this.setState({ categories: data.categories });
    });
  }

  renderCategoryOptions() {
    return (
      <React.Fragment>
        {
          this.state.categories.map((category, id) => {
            return <option key={id} value={category}>{category}</option>
          })
        }
      </React.Fragment>
    );
  }

  render() {
    return (
      <Input
        s={12} type="select" id="category"
        defaultValue={this.props.value !== " " ? this.props.value : 'default'}
        label="Category"
        error={this.props.error}
        onChange={this.props.onChangeHandler}
      >
        <option value="default" disabled>Choose your category</option>
        {this.renderCategoryOptions()}
      </Input>
    );
  }
}

export default SelectCategory;
