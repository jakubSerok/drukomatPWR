import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../Context/Context";

const OrderHistory = () => {
  const { token } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [drukomats, setDrukomats] = useState({}); // Store drukomat details
  const [error, setError] = useState("");

  const apiUrl = "http://localhost:4000";

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your orders.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/orders/getUserOrders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Orders Response:", response.data); // Log the response to check its structure
        setOrders(response.data);

        // Fetch drukomat details for each order
        const drukomatPromises = response.data.map((order) => {
          // Check if DrukomantID exists before fetching
          if (order.DrukomantID) {
            return fetchDrukomatDetails(order.DrukomantID);
          }
          return Promise.resolve(null); // Return null if DrukomantID is not present
        });

        const drukomatDetails = await Promise.all(drukomatPromises);
        const drukomatMap = {};
        drukomatDetails.forEach((detail, index) => {
          if (detail) {
            drukomatMap[response.data[index].DrukomantID] = detail;
          }
        });
        setDrukomats(drukomatMap);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      }
    };

    const fetchDrukomatDetails = async (drukomatId) => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/drukomat/drukomaty/${drukomatId}`
        );
        return response.data; // Return drukomat details
      } catch (err) {
        console.error(`Error fetching drukomat ${drukomatId}:`, err);
        return null; // Return null if there's an error
      }
    };

    fetchOrders();
  }, [token]);

  const statusLabels = {
    0: "Pending",
    1: "In Progress",
    2: "Completed",
    3: "Canceled",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4 mt-[150px]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Order History
      </h1>

      {error && (
        <div className="bg-red-200 text-red-800 p-2 rounded text-center">
          {error}
        </div>
      )}

      {!error && orders.length === 0 && (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id || order.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Order Code: {order.CollectionCode}
            </h2>
            <p className="text-gray-700">
              <strong>Status:</strong> {statusLabels[order.Status] || "Unknown"}
            </p>
            <p className="text-gray-700">
              <strong>Quantity:</strong> {order.File?.Quantity}
            </p>
            <p className="text-gray-700">
              <strong>Color:</strong> {order.File?.Color ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <strong>Format:</strong> {order.File?.Format}
            </p>
            <p className="text-gray-700">
              <strong>Data:</strong> {order.CreationDate}
            </p>

            {drukomats[order.DrukomantID] && (
              <p className="text-gray-700">
                <strong>Drukomat Address:</strong>{" "}
                {drukomats[order.DrukomantID].city}{" "}
                {drukomats[order.DrukomantID].address}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
