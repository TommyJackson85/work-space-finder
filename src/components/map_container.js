import React from 'react';
//import { compose, withProps } from "recompose";
import { withGoogleMap, GoogleMap } from 'react-google-maps';
const Map = ({geocode}) => {
//class Map extends Component {
  // render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: geocode.lat, lng: geocode.lng} }
        defaultZoom = { 13 }
      >
      </GoogleMap>
   ));
   return(
    <div>
      <GoogleMapExample
        containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
      />
    </div>
 );
//   }
//};
}
export default Map;