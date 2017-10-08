import React from 'react';

import 'leaflet/dist/leaflet.css';
import MapContainer from '../components/Map/MapContainer';
import data from '../data/mapDatasets';

const Mappa = props => <MapContainer data={props.data} />;

class MappaContainer extends React.Component {
  state = {
    dataInView: data,
  };

  onViewChange = list => {
    this.setState({ dataInView: list });
  };

  render() {
    const data = this.state.dataInView;
    return (
      <div className="Grid Grid--fit Grid--withGutter u-padding-all-l">
        <div className="Grid-cell">
          <div className="u-background-50 u-color-white u-margin-bottom-l u-borderRadius-m u-padding-all-m">
            <Mappa data={data[0]} onViewChange={this.onViewChange} />
          </div>
        </div>
        <div className="Grid-cell">
          <div
            className="u-background-50 u-color-white u-margin-bottom-l u-borderRadius-m u-padding-all-m"
            style={{ minHeight: '95%' }}
          >
            <div id="location" />
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default MappaContainer;
