import React, { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { IoPrintSharp } from "react-icons/io5";
import "leaflet/dist/leaflet.css";

const LocationPopup = ({ location, onClose }) => {
  if (!location) return null;

  return (
    <Popup onClose={onClose} className="p-3 bg-white shadow-md rounded-lg">
      <div className="text-center">
        <h3 className="font-semibold text-xl text-gray-800">{location.name}</h3>

        <p className="text-sm text-gray-600">{location.address}</p>

        <p className="text-sm text-gray-500">{location.description}</p>
      </div>
    </Popup>
  );
};

const Map = () => {
  const [locations, setLocations] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [filteredLocations, setFilteredLocations] = useState([]);

  const mapRef = useRef();

  // Fetching all locations from API

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/drukomat/getDrukomaty"
        );

        const data = await response.json();

        setLocations(data);

        setFilteredLocations(data);
      } catch (error) {
        console.error("Error fetching drukomaty data:", error);
      }
    };

    fetchLocations();
  }, []);

  // Search functionality

  const handleSearch = useCallback(async () => {
    if (searchTerm) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/drukomat/searchDrukomat?city=${searchTerm}`
        );

        const data = await response.json();

        setFilteredLocations(data);

        if (data.length > 0) {
          const map = mapRef.current;

          if (map) {
            map.setView([data[0].latitude, data[0].longitude], 16, {
              animate: true,
            });
          }
        } else {
          setFilteredLocations([]); // No results found
        }
      } catch (error) {
        console.error("Error searching drukomaty:", error);
      }
    } else {
      setFilteredLocations(locations); // Reset to all locations if search term is empty
    }
  }, [searchTerm, locations]);

  // Scroll map to a specific drukomat

  const scrollToLocation = useCallback((latitude, longitude) => {
    if (mapRef.current) {
      const map = mapRef.current;

      map.setView([latitude, longitude], 16, { animate: true });
    }
  }, []);

  return (
    <div className="map-container w-full h-[500px] p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="map-container w-full h-[500px] p-4 bg-gray-100 rounded-lg shadow-lg mb-[100px]">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Wpisz miasto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Ensure this is correct
            className="p-2 border border-gray-300 rounded"
          />

          <button
            onClick={handleSearch} // Ensure this is correct
            className="p-2 ml-2 bg-blue-500 text-white rounded"
          >
            Szukaj
          </button>
        </div>

        {/* List of drukomats */}
        <div className="mb-4 max-h-40 overflow-y-auto">
          {filteredLocations.map((loc) => (
            <div
              key={loc._id}
              className="p-2 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
              onClick={() => scrollToLocation(loc.latitude, loc.longitude)}
            >
              <h3 className="font-semibold text-gray-800">{loc.name}</h3>
              <p className="text-sm text-gray-600">{loc.address}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <MapContainer
          center={[52.2297, 21.0122]} // Default map center (Warsaw)
          zoom={13}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg shadow-lg"
          ref={mapRef} // Reference to the map
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Displaying markers on the map */}
          {filteredLocations.map((loc) => (
            <Marker
              key={loc._id}
              position={[loc.latitude, loc.longitude]}
              icon={
                new Icon({
                  iconUrl: "/path/to/custom-marker.png", // Insert your custom icon path
                  iconUrl: <IoPrintSharp />, // Insert your custom icon path
                  iconSize: [32, 32], // Icon size
                  iconAnchor: [16, 32], // Anchor point of the icon
                })
              }
            >
              <Popup className="p-3 bg-white shadow-md rounded-lg">
                <div className="text-center">
                  <h3 className="font-semibold text-xl text-gray-800">
                    {loc.name}
                  </h3>
                  <p className="text-sm text-gray-600">{loc.address}</p>
                  <p className="text-sm text-gray-500">{loc.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
