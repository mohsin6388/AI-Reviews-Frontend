import React, { useState } from "react";
import axios from "axios";
import "./GooglePlaceSearch.css";

const GooglePlaceSearch = () => {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      setPlaces([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/google-places/autocomplete?input=${value}`,
      );

      setPlaces(response.data.predictions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setSearch(place.description);
    setPlaces([]);
  };

  return (
    <div className="google-place-search">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Business..."
        className="search-input"
      />

      {places.length > 0 && (
        <div className="places-dropdown">
          {places.map((place) => (
            <div
              key={place.place_id}
              onClick={() => handleSelectPlace(place)}
              className="place-item"
            >
              <p className="place-name">
                {place.structured_formatting.main_text}
              </p>

              <p className="place-address">
                {place.structured_formatting.secondary_text}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedPlace && (
        <div className="selected-place-card">
          <h3>Selected Place</h3>

          <p>
            <strong>Name:</strong>{" "}
            {selectedPlace.structured_formatting.main_text}
          </p>

          <p>
            <strong>Address:</strong> {selectedPlace.description}
          </p>

          <p className="place-id">
            <strong>Place ID:</strong> {selectedPlace.place_id}
          </p>
        </div>
      )}
    </div>
  );
};

export default GooglePlaceSearch;
