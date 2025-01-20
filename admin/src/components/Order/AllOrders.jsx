import React, { useEffect, useState } from "react";
import { url } from "../../assets/assets"; // Adjust the import based on your project structure

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [users, setUsers] = useState([]); // Assuming you have a list of users to filter by
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/orders/getOrders`); // Adjust the endpoint as necessary
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data); // Initially, all orders are displayed
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch users (assuming you have an endpoint for this)
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${url}/api/users`); // Adjust the endpoint as necessary
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Filter orders by selected user
  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) {
      setFilteredOrders(orders.filter((order) => order.UserId === userId));
    } else {
      setFilteredOrders(orders); // Reset to all orders if no user is selected
    }
  };

  // Fetch orders and users on component mount
  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      <div className="mb-4">
        <label htmlFor="userSelect" className="mr-2">
          Filter by User:
        </label>
        <select
          id="userSelect"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.FirstName} {user.LastName}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">User ID</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Collection Code</th>
            <th className="border border-gray-300 p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-300 p-2">{order._id}</td>
              <td className="border border-gray-300 p-2">{order.UserId}</td>
              <td className="border border-gray-300 p-2">{order.Status}</td>
              <td className="border border-gray-300 p-2">
                {order.CollectionCode}
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
