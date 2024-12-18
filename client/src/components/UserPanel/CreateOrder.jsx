import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icon in Leaflet (default icons won't work)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CreateOrder = () => {
  const [drukomats, setDrukomats] = useState([]);
  const [selectedDrukomat, setSelectedDrukomat] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = "http://localhost:4000";

  // Fetch Drukomats from the server
  useEffect(() => {
    const fetchDrukomats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/drukomat/getDrukomaty`);
        console.debug("Drukomats fetched:", response.data);
        setDrukomats(response.data);
      } catch (error) {
        console.error("Error fetching drukomats:", error);
        setMessage("Failed to load drukomats. Please try again later.");
      }
    };

    fetchDrukomats();
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    console.debug("File selected:", uploadedFile);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDrukomat) {
      setMessage("Please select a Drukomat.");
      return;
    }

    if (!file) {
      setMessage("Please upload a file.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("DrukomantID", selectedDrukomat._id);
    formData.append("file", file);

    console.debug("Submitting order with data:", {
      DrukomantID: selectedDrukomat._id,
      file,
    });

    try {
      const response = await axios.post(
        `${apiUrl}/api/order/createOrder`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("Order created successfully!");
        console.debug("Order created successfully:", response.data);
      } else {
        setMessage("Failed to create the order. Please try again.");
        console.error("Error response:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("An error occurred while creating the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Order
      </h1>

      {message && (
        <div
          className={`mb-4 p-2 text-center rounded ${
            message.includes("success")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Map Section */}
      <div className="h-80 w-full mb-4">
        <MapContainer
          center={[52.2297, 21.0122]} // Default center (e.g., Warsaw, Poland)
          zoom={6}
          className="h-full w-full rounded"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {drukomats.map((drukomat) => (
            <Marker
              key={drukomat._id}
              position={[drukomat.latitude, drukomat.longitude]}
              eventHandlers={{
                click: () => {
                  setSelectedDrukomat(drukomat);
                  console.debug("Drukomat selected:", drukomat);
                },
              }}
            >
              <Popup>{drukomat.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* File Upload Section (only if a Drukomat is selected) */}
      {selectedDrukomat && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              Selected Drukomat: <strong>{selectedDrukomat.name}</strong>
            </p>
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </label>
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full p-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Order"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateOrder;
