import React from 'react';
import L from 'leaflet';
import {
  Map,
  Marker,
  Popup,
  LayersControl,
  TileLayer,
  FeatureGroup,
  Circle,
  GeoJSON,
} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

class MapContainer extends React.Component {
  state = {
    loaded: false,
    center: [42.405207, 12.216797],
    zoom: 6,
  };

  onViewChange = () => {};

  render() {
    let latLngs = [];
    if (this.props.data) {
      latLngs = this.props.data.features.map(feature =>
        L.GeoJSON.coordsToLatLng(feature.geometry.coordinates)
      );
    }

    return (
      <Map
        center={this.state.center}
        zoom={this.state.zoom}
        style={{ height: '475px' }}
        ref="leaflet-map"
        bounds={L.LatLngBounds(latLngs)}
        boundsOptions={{ padding: [50, 50] }}
        onViewportChanged={data => this.onViewChange(data)}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Stamen.Terrain">
            <TileLayer
              attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>, <a href=&quot;http://creativecommons.org/licenses/by/3.0&quot;>CC BY 3.0</a> &mdash; Map data &copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a>"
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Stamen.Toner Lite" checked>
            <TileLayer
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
              attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>, <a href=&quot;http://creativecommons.org/licenses/by/3.0&quot;>CC BY 3.0</a> &mdash; Map data &copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a>"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Markers" checked>
            <GeoJSON data={this.props.data || []} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Mappa Calore">
            <HeatmapLayer
              fitBoundsOnLoad
              fitBoundsOnUpdate
              points={latLngs}
              radius={5}
              gradient={{ '0.4': 'blue', '0.9': 'orange', '1.0': 'red' }}
              longitudeExtractor={m => m.lng}
              latitudeExtractor={m => m.lat}
              intensityExtractor={m => parseFloat(m[2])}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}

export default MapContainer;
