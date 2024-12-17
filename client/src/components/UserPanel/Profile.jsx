import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context/Context";

const apiUrl = "http://localhost:4000";

const Profile = () => {
  const { token, setToken } = useContext(Context);
  const [user, setUser] = useState({
    _id: "",
    FirstName: "",
    LastName: "",
    email: "",
    phone: "",
    address: "",
    streetAndNumber: "",
    City: "",
    PostalCode: "",
    Country: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile data on component mount
  useEffect(() => {
    if (!token) {
      setError("Please log in to view your profile.");
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/user/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token here
          },
        });

        const data = await response.json();

        if (data.success === false) {
          setError(data.message || "Failed to fetch profile data.");
        } else {
          setUser({
            _id: data._id,
            FirstName: data.FirstName,
            LastName: data.LastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            streetAndNumber: data.streetAndNumber,
            City: data.City,
            PostalCode: data.PostalCode,
            Country: data.Country,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]); // Add token as a dependency

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    console.log(user);
  };

  // Handle profile update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      setError("Please log in to update your profile.");
      return;
    }

    if (!user._id) {
      setError("User ID is missing.");
      return;
    }

    setLoading(true);

    // Send the user ID and other fields in the request body
    fetch(`${apiUrl}/api/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: user._id, ...user }), // Include _id in the request body
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess("Profile updated successfully!");
        } else {
          setError(data.errors || "Failed to update profile.");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("Failed to update profile.");
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(user);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>

        {/* Error and Success messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-gray-100 p-4 rounded-md mt-2"
        >
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col w-full md:w-1/2">
              <label>First Name</label>
              <input
                type="text"
                name="FirstName"
                value={user.FirstName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>Last Name</label>
              <input
                type="text"
                name="LastName"
                value={user.LastName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>City</label>
              <input
                type="text"
                name="City"
                value={user.City}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>Street and Number</label>
              <input
                type="text"
                name="streetAndNumber"
                value={user.streetAndNumber}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>Postal Code</label>
              <input
                type="text"
                name="PostalCode"
                value={user.PostalCode}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label>Country</label>
              <input
                type="text"
                name="Country"
                value={user.Country}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Update Profile Button */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
