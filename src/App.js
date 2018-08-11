//import _ from 'lodash';
import React, { Component } from 'react';
//import PropTypes from 'prop-types';
//import ReactDOM from 'react-dom';
//import axios from 'axios';
//import { Map, KmlLayer, DataLayer, Feature, InfoWindow, CustomOverlay, Marker, MapControl, SearchBox} from 'google-react-maps';
//import MapContainer from './components/map_container';
import { geocodeByAddress } from 'react-places-autocomplete';
//import { GoogleApiWrapper } from 'google-maps-react';
//import PlacesAutocomplete from './components/search_bar.js';
import LocationSearchInput from './components/search_bar.js';
//import PlaceDetail from './components/place_detail.js';
import Map from './components/map_container.js';
//"homepage": "http://TommyJackson85.github.io/google-place-map",
//const API_KEY = 'AIzaSyBPUql23u1EAJpikg4FOedC_jUEm-Xqcuo';
class App extends Component {//should be responsible for fetching data
    constructor(props) {
        console.log('hello');
        super(props);  
        this.state = {
            input: '',
            address: '',
            data: {},
            addressComponents: [],
            geocode: {lat: 51.89460, lng: -8.47103},
            placeId: '',
            placeDetails: '',
            placeName: '',
            icon: '',
            open: false,

            hasError: false
        }
        this.request =  { 
            query: this.state.address,
            fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
        };
        this.initMap = this.initMap.bind(this);
        this.callback = this.callback.bind(this);
        //service.findPlaceFromQuery(request, callback);
    }
   
    handleChange = (input) => {
        this.setState({ input });
       // console.log(this.state.data);//doesn't change
        console.log(this.state.input);//changes
        console.log(this.state.geocode.lat);//doesn't change
        console.log(this.state.geocode);//doesn't change
        console.log(this.state.addressComponents);//doesn't change
        console.log(this.state.placeId);//doesn't change
        //console.log(this.state.placeName);
        console.log(this.state.placeDetails);
        console.log(this.state.placeName);
    }
    handleSelect = (input) => {
            // Do something with address and placeId
        console.log(input);
        geocodeByAddress(input)
          .then(results => //getLatLng(results[0]))
         // console.log(results[0]),
            this.setState({
                address: results[0].address_components,
                geocode: {   
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                },
                placeId: results[0].place_id
            }),
            this.initMap(input)   
        )
        .catch(error => console.error('Error', error));
    
    }

    initMap = (input) => {

        let mapCenter= new window.google.maps.LatLng(this.state.geocode.lat,this.state.geocode.lng);
        let map = new window.google.maps.Map(this.refs.map, {
            center: mapCenter,
            zoom: 15
          });
        let request =  { 
            query: input,
            fields: ['photos', 'name', 'rating', 'opening_hours'],
        };
        let service = new window.google.maps.places.PlacesService(map);

        console.log('big ears1');
        console.log(request);
        //service.findPlaceFromQuery(request, this.callback());

        service.findPlaceFromQuery(request, (results, status) => {
            const google = window.google;
            console.log(results[0]);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.setState({
                            icon: results[0].photos[0].html_attributions[0],
                            placeName: results[0].name,
                            rating: results[0].rating,
                            open: results[0].opening_hours.open_now
                    });
                    console.log(this.state.icon);
                    console.log(this.state.placeName);
                    console.log(this.state.rating);
                    console.log(this.state.open);
            }
            else {
                console.log("ERROR!: "+results)
            }
        })

    }

    callback = (results, status) => {
        console.log(results);
        console.log('big ears2');
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              console.log(results[i]);
            }
        }
    }

    render(){
        //value or Address
        return (
            <div>
                <LocationSearchInput
                    value={this.state.input}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect} />
                <Map geocode={this.state.geocode} />
                <div ref='map'>
                </div>
            </div>            
        );
    }
} 

export default App;
