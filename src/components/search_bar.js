import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete'

const LocationSearchInput = (props) => {
//console.log(PlacesAutocomplete.suggestion.description);
return (
    <PlacesAutocomplete 
      value={props.value}
      onChange={props.onChange} 
      onSelect={props.onSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input'
            })}
          />
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                          ? { backgroundColor: 'yellow', cursor: 'pointer' }
                          : { backgroundColor: 'grey', cursor: 'pointer' };
              return (
                <div {...getSuggestionItemProps(suggestion, { className, style })}>
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
export default LocationSearchInput;
/*class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.term}
                    onChange={event => this.setState({ term: event.target.value })} />
            </div>
        )
    }
}

export default SearchBar;*/