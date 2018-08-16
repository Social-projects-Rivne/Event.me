import React, { Component } from 'react';
import { Input } from 'react-materialize';
import { request } from '../utils';

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

  render(){
    return (
      <Input id="category" defaultValue="1" label="Category"
      onChange={this.props.onChangeHandler} type="select" s={12} >
        <option value="1" disabled>Choose your category</option>
        {this.renderCategoryOptions()}
      </Input>
    );
  }
}

export default SelectCategory;
