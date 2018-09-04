import React, { Component } from 'react';
import {Row, Col, Input, Button} from 'react-materialize'
import EventMap from '../EventMap';
import { request } from '../../utils';
import SelectCategory from '../EventForm/SelectCategory';


class MapLayout extends Component {
  state = {
    events: [],
    day_filter: '0',
    category: ''
  }

  onChangeHandler = (e) => {
      // let {id} = e.currentTarget
      this.setState({group1: e.currentTarget.value})
  };
  filter = (e) => {
      let filterData = {
          day_filter: this.state.day_filter,
          category: this.state.category
      }
      request('/events-short-info', 'POST', JSON.stringify(filterData)).then(data => {
          if ('info' in data) {
              this.setState({ events: data.info })
          }
      });

  }

  componentDidMount() {
      let filterData = {
          day_filter: this.state.day_filter
      }
      request('/events-short-info', 'POST', JSON.stringify(filterData)).then(data => {
          if ('info' in data) {
              this.setState({ events: data.info })
          }
      });
  }

  render(){
    return (
      <Row>
          {/*<Input id='day_filter' s={3} type='select' label="Filter by days" defaultValue='' onChange={this.onChangeHandler}>*/}
              {/*<option value="" disabled selected>Choose filter</option>*/}
              {/*<option value='1' >Today</option>*/}
              {/*<option value='7'>One week</option>*/}
              {/*<option value='14'>Two weeks</option>*/}
          {/*</Input>*/}
          <Row>
              <Input name='group1'
                     defaultChecked={this.state.group1 === '1'}
                     type='radio'
                     value='1'
                     label='One day'
                     onChange={this.onChangeHandler}/>

              <Input name='group1'
                     defaultChecked={this.state.group1 === '7'}
                     type='radio'
                     value='7'
                     label='One week'
                     onChange={this.onChangeHandler}/>

              <Input name='group1'
                     defaultChecked={this.state.group1 === '14'}
                     type='radio'
                     value='14'
                     label='Two weeks'
                     onChange={this.onChangeHandler}/>

              <Input name='group1'
                     defaultChecked={this.state.group1 === '31'}
                     type='radio'
                     value='31'
                     label='A month'
                     onChange={this.onChangeHandler}/>
          </Row>

          <Button onClick={this.filter}>Filter</Button>
          <Col s={3}>
              <SelectCategory onChangeHandler={this.onChangeHandler}/>
          </Col>
        <Col s={4}>
          <div>
            &nbsp;
          </div>
        </Col>
        <Col s={8} className="map-page-container">
          <EventMap events={this.state.events}/>
        </Col>
      </Row>
    );
  }
}

export default MapLayout;
