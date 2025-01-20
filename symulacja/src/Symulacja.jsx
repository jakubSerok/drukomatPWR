import React, { useState, useEffect } from "react";
import axios from "axios";

const Symulacja = () => {
  const [drukomaty, setDrukomaty] = useState([]); // List of drukomats
  const [selectedDrukomatId, setSelectedDrukomatId] = useState(""); // Selected drukomat ID
  const [orders, setOrders] = useState([]); // Orders for the selected drukomat
  const [collectionCode, setCollectionCode] = useState(""); // Input collection code
  const [message, setMessage] = useState(""); // Feedback message

  // Fetch all drukomats on component mount
  useEffect(() => {
    const fetchDrukomaty = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/drukomat/getDrukomaty"
        );
        setDrukomaty(response.data);
      } catch (error) {
        console.error("Error fetching drukomats:", error);
        setMessage("Failed to fetch drukomats.");
      }
    };
    fetchDrukomaty();
  }, []);

  // Fetch orders when a drukomat is selected
  const fetchOrders = async (drukomatId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/orders/getOrdersByDrukomatId/${drukomatId}`
      );
      console.log("Fetched orders:", response.data);
      setOrders(response.data);
      setMessage("");
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        "Failed to fetch orders. Please check the drukomat ID and try again."
      );
    }
  };

  // Handle drukomat selection
  const handleDrukomatChange = (e) => {
    const drukomatId = e.target.value;
    setSelectedDrukomatId(drukomatId);
    if (drukomatId) fetchOrders(drukomatId); // Fetch orders for the selected drukomat
  };

  // Handle collection code submission
  const handleCodeSubmit = async () => {
    if (!orders || orders.length === 0) {
      setMessage("No orders found for the selected drukomat.");
      return;
    }

    // Find the order with the entered collection code
    const matchingOrder = orders.find(
      (order) => order.CollectionCode === collectionCode
    );

    if (matchingOrder) {
      try {
        // Update the order status
        const updatedOrder = {
          _id: matchingOrder._id, // Include the order ID
          Status: 2, // Set status to 4 (cache opened)
        };

        await axios.post(
          `http://localhost:4000/api/orders/updateOrder/${matchingOrder._id}`, // Use the correct endpoint
          updatedOrder
        );

        setMessage("Skrytka otwarta"); // Success message
        setCollectionCode(""); // Clear the input field
        fetchOrders(selectedDrukomatId); // Refresh orders
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response ? error.response.data : error.message
        );

        setMessage("Failed to fetch orders.");
      }
    } else {
      setMessage("Zły kod"); // Error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Symulacja Drukomatu</h1>

      {/* Drukomat Selection */}
      <div className="mb-4">
        <label className="block text-gray-700">Wybierz Drukomat:</label>
        <select
          value={selectedDrukomatId}
          onChange={handleDrukomatChange}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">-- Wybierz --</option>
          {drukomaty.map((drukomat) => (
            <option key={drukomat._id} value={drukomat._id}>
              {drukomat.name} - {drukomat.city}
            </option>
          ))}
        </select>
      </div>

      {/* Collection Code Input */}
      {selectedDrukomatId && (
        <div className="mb-4">
          <label className="block text-gray-700">Wprowadź Kod:</label>
          <input
            type="text"
            value={collectionCode}
            onChange={(e) => setCollectionCode(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
          <button
            onClick={handleCodeSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Otwórz Skrytkę
          </button>
        </div>
      )}

      {/* Feedback Message */}
      {message && (
        <div
          className={`mt-4 p-3 rounded ${
            message === "Skrytka otwarta"
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

export default Symulacja;
