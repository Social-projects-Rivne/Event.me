import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


class MapLayout extends Component {
  state = {
    lat: 50.619900,
    lng: 26.251617,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="mapWrapper">
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup> A pretty CSS3 popup. <br /> Easily customizable. A</Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default MapLayout;