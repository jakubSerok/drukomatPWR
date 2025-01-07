import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Icon } from "leaflet";
import { IoPrintSharp } from "react-icons/io5";
import { Context } from "../Context/Context";
import "leaflet/dist/leaflet.css";

const CreateOrder = () => {
  const { token } = useContext(Context); // Get token from Context
  const [userId, setUserId] = useState("");
  const [drukomats, setDrukomats] = useState([]);
  const [selectedDrukomat, setSelectedDrukomat] = useState(null);
  const [selectedOption, setSelectedOption] = useState("userFile");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDrukomats, setFilteredDrukomats] = useState([]);
  const [drafts, setDrafts] = useState([]); // State for drafts
  const [selectedDraft, setSelectedDraft] = useState(null); // State for selected draft
  const mapRef = useRef();
  const [data, setData] = useState({
    DrukomantID: "",
    UserId: "",
    CollectionCode: "",
    Status: 0,
    File: {
      DraftID: 0,
      UserFile: null,
      Quantity: 1,
      Color: false,
      Format: "A4",
    },
  });

  const apiUrl = "http://localhost:4000";
  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/user/user`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          if (data && data._id) {
            setUserId(data._id); // Set user ID
            setData((prevData) => ({ ...prevData, UserId: data._id }));
          } else {
            console.error(
              "Failed to fetch user ID:",
              data.message || "Unknown error"
            );
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      };

      fetchUserProfile();
    }
  }, [token]);
  // Fetch Drukomats from the server
  useEffect(() => {
    const fetchDrukomats = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/drukomat/getDrukomaty`);
        const data = await response.json();
        setDrukomats(data);
        setFilteredDrukomats(data);
      } catch (error) {
        console.error("Error fetching drukomats:", error);
        setMessage("Failed to load drukomats. Please try again later.");
      }
    };

    fetchDrukomats();
  }, []);

  // Fetch drafts from the server
  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/drafts/getDrafts`);
        const data = await response.json();
        setDrafts(data);
      } catch (error) {
        console.error("Error fetching drukomats:", error);
        setMessage("Failed to load drukomats. Please try again later.");
      }
    };

    fetchDrafts();
  }, []);

  // Search functionality
  const handleSearch = useCallback(() => {
    if (searchTerm) {
      const filtered = drukomats.filter((drukomat) =>
        drukomat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDrukomats(filtered);

      if (filtered.length > 0) {
        const map = mapRef.current;
        if (map) {
          map.setView([filtered[0].latitude, filtered[0].longitude], 16, {
            animate: true,
          });
        }
      }
    } else {
      setFilteredDrukomats(drukomats);
    }
  }, [searchTerm, drukomats]);

  // Scroll map to a specific drukomat
  const scrollToLocation = useCallback((latitude, longitude) => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([latitude, longitude], 16, { animate: true });
    }
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      console.log("Selected file:", selectedFile); // Log the selected file
      setData((prevData) => ({
        ...prevData,
        File: { ...prevData.File, UserFile: "selectedFile" },
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle changes to both top-level and nested File fields
    if (name in data.File) {
      setData((prevData) => ({
        ...prevData,
        File: { ...prevData.File, [name]: value },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Handle changes to checkboxes within the File object
    if (name in data.File) {
      setData((prevData) => ({
        ...prevData,
        File: { ...prevData.File, [name]: checked },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    }
  };

  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDrukomat) {
      setMessage("Please select a Drukomat.");
      return;
    }

    if (!data.File.UserFile) {
      setMessage("Please upload a file.");
      return;
    }

    if (!userId) {
      setMessage("User ID is missing. Please log in.");
      return;
    }

    const generateRandomCode = () =>
      Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const orderData = {
        ...data,
        DrukomantID: selectedDrukomat._id,
        CollectionCode: generateRandomCode(),
      };

      console.log(orderData);

      const response = await axios.post(
        `${apiUrl}/api/orders/createOrder`,
        orderData
      );

      if (response) {
        setMessage("Order created successfully!");
      } else {
        setMessage(response.data.message || "Failed to create the order.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("An error occurred while creating the order.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Order
      </h1>

      {/* Search bar */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded flex-grow"
        />
        <button
          onClick={handleSearch}
          className="p-2 ml-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* List of drukomats */}
      <div className="mb-4 max-h-40 overflow-y-auto">
        {filteredDrukomats.map((drukomat) => (
          <div
            key={drukomat._id}
            className="p-2 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
            onClick={() =>
              scrollToLocation(drukomat.latitude, drukomat.longitude)
            }
          >
            <h3 className="font-semibold text-gray-800">{drukomat.name}</h3>
            <p className="text-sm text-gray-600">{drukomat.address}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="h-80 w-full mb-4">
        <MapContainer
          center={[52.2297, 21.0122]} // Default center (e.g., Warsaw, Poland)
          zoom={6}
          className="h-full w-full rounded"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredDrukomats.map((drukomat) => (
            <Marker
              key={drukomat._id}
              position={[drukomat.latitude, drukomat.longitude]}
              icon={
                new Icon({
                  iconUrl: "/path/to/custom-marker.png", // Replace with your marker icon path
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
              eventHandlers={{
                click: () => setSelectedDrukomat(drukomat),
              }}
            >
              <Popup>
                <h3 className="font-semibold">{drukomat.name}</h3>
                <p>{drukomat.address}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedDrukomat && (
        <div class Name="mb-4">
          <label
            htmlFor="fileType"
            className="block text-sm font-medium text-gray-700"
          >
            Select File Type
          </label>
          <select
            id="fileType"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="userFile">User File</option>
            <option value="draftFile">Draft File</option>
          </select>
        </div>
      )}
      {selectedDrukomat && selectedOption === "draftFile" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="draftSelect"
              className="block text-sm font-medium text-gray-700"
            >
              Select Draft
            </label>
            <select
              id="draftSelect"
              onChange={(e) => {
                const selectedDraft = drafts.find(
                  (draft) => draft._id === e.target.value
                );
                setSelectedDraft(selectedDraft);
                setData((prevData) => ({
                  ...prevData,
                  File: {
                    ...prevData.File,
                    UserFile: "draftFile", //selectedDraft ? selectedDraft.DraftFile : null,
                  },
                }));
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a draft</option>
              {drafts.map((draft) => (
                <option key={draft._id} value={draft._id}>
                  {draft.Name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="Quantity"
              value={data.File.Quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              min="1"
            />
          </div>

          {/* Color */}
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color Printing
            </label>
            <input
              id="color"
              type="checkbox"
              name="Color"
              checked={data.File.Color}
              onChange={handleCheckboxChange}
              className="mt-1"
            />
          </div>

          {/* Format */}
          <div>
            <label
              htmlFor="format"
              className="block text-sm font-medium text-gray-700"
            >
              Format
            </label>
            <select
              id="format"
              name="Format"
              value={data.File.Format}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            Create Order
          </button>
        </form>
      )}
      {/* File Upload Section */}
      {selectedDrukomat && selectedOption === "userFile" && (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Quantity */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="Quantity"
              value={data.File.Quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              min="1"
            />
          </div>

          {/* Color */}
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color Printing
            </label>
            <input
              id="color"
              type="checkbox"
              name="Color"
              checked={data.File.Color}
              onChange={handleCheckboxChange}
              className="mt-1"
            />
          </div>

          {/* Format */}
          <div>
            <label
              htmlFor="format"
              className="block text-sm font-medium text-gray-700"
            >
              Format
            </label>
            <select
              id="format"
              name="Format"
              value={data.File.Format}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600"
          >
            Create Order
          </button>
        </form>
      )}

      {message && (
        <div
          className={`p-2 text-center rounded ${
            message.includes("success")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
