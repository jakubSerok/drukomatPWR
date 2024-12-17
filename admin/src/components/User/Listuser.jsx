import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png"; // Make sure to use the correct path for your icons
import { url } from "../../assets/assets";

const Listuser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]); // For paginated users
  const [editingUser, setEditingUser] = useState(null); // To track the user being edited
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    streetAndNumber: "",
    postalCode: "",
    country: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [usersPerPage, setUsersPerPage] = useState(10); // State for users per page

  // Fetch user data
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${url}/api/user/allUsers`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllUsers(data);
      setDisplayedUsers(getPaginatedUsers(data, currentPage, usersPerPage));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Remove a user
  const removeUser = async (_id) => {
    try {
      await fetch(`${url}/api/user/delete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      fetchUsers(); // Refresh user list after removal
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

  // Open the edit form and set the current user's details
  const openEditForm = (user) => {
    setEditingUser(user._id);
    setEditForm({
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.City,
      streetAndNumber: user.streetAndNumber,
      postalCode: user.PostalCode,
      country: user.Country,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the edited user details
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/user/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: editingUser, ...editForm }),
      });
      const result = await response.json();
      if (result.success) {
        fetchUsers(); // Refresh users after edit
        setEditingUser(null); // Close the edit form
      }
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  const getPaginatedUsers = (users, currentPage, usersPerPage) => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] py-[10px] px-[50px] m-[30px] rounded-md bg-white">
      <h1>All Users List</h1>
      <div className="grid grid-cols-6 gap-[10px] w-full py-[20px] text-[#454545] text-[15px] font-bold">
        <p>First Name</p>
        <p>Last Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="w-full overflow-y-auto">
        <hr />
        {displayedUsers.map((user) => (
          <div key={user._id}>
            <div className="grid grid-cols-6 gap-[10px] w-full items-center">
              <p>{user.FirstName}</p>
              <p>{user.LastName}</p>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <img
                src={cross_icon} // Icon for editing
                onClick={() => openEditForm(user)}
                alt="Edit user"
                className="m-auto cursor-pointer"
              />
              <img
                src={cross_icon} // Icon for removing
                onClick={() => removeUser(user._id)}
                alt="Remove user"
                className="m-auto cursor-pointer"
              />
            </div>
            <hr />

            {/* Conditional rendering of the edit form */}
            {editingUser === user._id && (
              <form
                onSubmit={handleSubmitEdit}
                className="w-full bg-gray-100 p-4 rounded-md mt-2"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editForm.address}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={editForm.city}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Street and Number</label>
                    <input
                      type="text"
                      name="streetAndNumber"
                      value={editForm.streetAndNumber}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={editForm.postalCode}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={editForm.country}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        {[...Array(Math.ceil(allUsers.length / usersPerPage))].map(
          (_, index) => (
            <button
              key={`page-${index}`} // Updated: Add a unique key
              className={`px-4 py-2 mx-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Listuser;
