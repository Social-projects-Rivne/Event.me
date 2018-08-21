import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { request } from '../../utils';


class MapLayout extends Component {
  state = {
    events: [],
    lat: 50.619900,
    lng: 26.251617,
    zoom: 13,
  }

  componentDidMount() {
    request('/events-short-info').then(data => {
      if ('info' in data) {
        data.info.forEach(element => {
          let eventShortInfo = this.state.events;
          eventShortInfo.push(element);
          this.setState({ events: eventShortInfo });
        });
      }
    });
  }

  renderEventMarkers() {
    return (
      <React.Fragment>
        {
          this.state.events.map(eventShortInfo => {
            return (
              <Marker key={eventShortInfo.id} position={[eventShortInfo.long, eventShortInfo.lat]}>
                <Popup onOpen={this.onPopupOpen}>
                  <Link to={`/event/${eventShortInfo.id}`}>{eventShortInfo.name}</Link>
                </Popup>
              </Marker>
            )
          })
        }
      </React.Fragment>
    )
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="mapWrapper">
        <Map onClick={this.onClickMarker} center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.renderEventMarkers()}
        </Map>
      </div>
    );
  }
}

export default MapLayout;
