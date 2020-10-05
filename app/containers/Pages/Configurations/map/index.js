import React, { createRef } from 'react'
import axios from 'axios';
import {Map, TileLayer } from 'react-leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import './app.css';
import PropTypes from 'prop-types';
const height = { height: "400px" };
const center = { lat: 30.997087391331213, lng: -5.650096631702044 };
class MapBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
      zoom: 5
    };
  }

  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const geocoder = L.Control.Geocoder.nominatim({
      reverseQueryParams: {
        'accept-language': 'en-US'
      }
    });
    let marker;
    map.on("click", e => {
      geocoder.reverse(
        e.latlng,
        map.options.crs.scale(map.getZoom()),
        results => {
          const r = results[0];
          console.log('info =>', results);
          if (r) {
            console.log(r.properties.address.country);
            console.log(r);
            const { countryFunc } = this.props;
            countryFunc({ country: r.properties.address.country });
            if (marker) {
              marker
                .setLatLng(r.center)
                .setPopupContent(r.html || r.name)
                .openPopup();
            } else {
              marker = L.marker(r.center)
                .bindPopup(r.name)
                .addTo(map)
                .openPopup();
            }
          }
        }
      );
    });
  }

  mapRef = createRef();

  handleClick = (e) => {
    const map = this.mapRef.current;
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${e.latlng.lat}+${e.latlng.lng}&key=818d754fbc3744c4832480760307190b`).then(re => {
      console.log(re);
    });
    if (map != null) {
      map.leafletElement.locate();
    }
  }

  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
  };

  render() {
    return (
      <div>
        <Map
          style={height}
          center={center}
          zoom={6}
          ref={m => {
            this.leafletMap = m;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}
MapBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  countryFunc: PropTypes.func.isRequired,
};
export default MapBlock;
