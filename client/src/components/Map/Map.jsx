import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const CreateOrder = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [file, setFile] = useState(null);
  const mapRef = useRef();

  // Fetching locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/drukomat/getDrukomaty"
        );
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching drukomaty data:", error);
      }
    };

    fetchLocations();
  }, []);

  // Handle file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!selectedLocation) {
      alert("Please select a location.");
      return;
    }
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("locationId", selectedLocation._id);
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:4000/api/orders/createOrder",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Order submitted successfully!");
      } else {
        alert("Error submitting the order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="create-order-container w-full p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Order</h2>

      {/* File Upload */}
      <div className="file-upload mb-4">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Upload your file:
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          className="p-2 border border-gray-300 rounded"
        />
        {file && (
          <p className="text-sm text-gray-600 mt-2">File: {file.name}</p>
        )}
      </div>

      {/* Map */}
      <div className="map-container w-full h-[500px] mb-4">
        <MapContainer
          center={[52.2297, 21.0122]} // Default map center (Warsaw)
          zoom={13}
          style={{ width: "100%", height: "100%" }}
          ref={mapRef}
          className="rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Markers */}
          {locations.map((loc) => (
            <Marker
              key={loc._id}
              position={[loc.latitude, loc.longitude]}
              icon={
                new Icon({
                  iconUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png", // Use default Leaflet marker for now
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
              eventHandlers={{
                click: () => setSelectedLocation(loc), // Set selected location on marker click
              }}
            >
              <Popup className="p-3 bg-white shadow-md rounded-lg">
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-800">
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

      {/* Selected Location */}
      {selectedLocation && (
        <div className="selected-location mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Selected Location:
          </h3>
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {selectedLocation.name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Address:</strong> {selectedLocation.address}
          </p>
        </div>
      )}

      {/* Submit Order Button */}
      <button
        onClick={handleSubmitOrder}
        className="w-full p-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600"
      >
        Submit Order
      </button>
    </div>
  );
};

export default CreateOrder;
