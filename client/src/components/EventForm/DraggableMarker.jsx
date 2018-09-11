import React, { Component } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'


class DraggableMarker extends Component {
  state = {
    center: {
      lat: 50.619900,
      lng: 26.251617,
    },
    marker: {
      lat: 50.619900,
      lng: 26.251617,
    },
    zoom: 13,
  }
  refmarker = React.createRef()

  componentDidUpdate(prevProps) {
    if (this.props.lat !== prevProps.lat || this.props.long !== prevProps.long) {
      if (this.props.lat && this.props.long) {
        this.setState({
          marker: {
            lat: this.props.lat,
            lng: this.props.long,
          }
        })
      }
    }
  }

  renderEventMarker() {
    return (
      <Marker
        draggable
        onDragend={this.updatePosition}
        position={[this.state.marker.lat, this.state.marker.lng]}
        ref={this.refmarker}>
      </Marker>
    )
  }


  updatePosition = () => {
    const { lat, lng } = this.refmarker.current.leafletElement.getLatLng();
    this.setState({
      marker: { lat, lng },
    });
    if (this.props.coordinatesHandle) this.props.coordinatesHandle(lat, lng);
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng]

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.renderEventMarker()}
      </Map>
    )
  }
}

export default DraggableMarker;
