import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png"; // Ensure the path is correct
import { url } from "../../assets/assets";

const ListDrukomaty = () => {
  const [allDrukomaty, setAllDrukomaty] = useState([]);
  const [displayedDrukomaty, setDisplayedDrukomaty] = useState([]);
  const [editingDrukomat, setEditingDrukomat] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    status: "Active", // Default status
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [drukomatyPerPage, setDrukomatyPerPage] = useState(10);

  // Fetch drukomat data
  const fetchDrukomaty = async () => {
    try {
      const response = await fetch(`${url}/api/drukomat/getDrukomaty`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setAllDrukomaty(data);
      setDisplayedDrukomaty(
        getPaginatedDrukomaty(data, currentPage, drukomatyPerPage)
      );
    } catch (error) {
      console.error("Failed to fetch drukomaty:", error);
    }
  };

  // Fetch drukomaty on component mount
  useEffect(() => {
    fetchDrukomaty();
  }, [currentPage]);

  // Remove a drukomat
  const removeDrukomat = async (id) => {
    try {
      await fetch(`${url}/api/drukomat/delete`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchDrukomaty(); // Refresh drukomat list after removal
    } catch (error) {
      console.error("Failed to remove drukomat:", error);
    }
  };

  // Open the edit form and set the current drukomat's details
  const openEditForm = (drukomat) => {
    setEditingDrukomat(drukomat.id);
    setEditForm({
      name: drukomat.name,
      address: drukomat.address,
      city: drukomat.city,
      latitude: drukomat.latitude,
      longitude: drukomat.longitude,
      status: drukomat.status,
      description: drukomat.description,
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the edited drukomat details
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/drukomat/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editingDrukomat, ...editForm }),
      });
      const result = await response.json();
      if (result.success) {
        fetchDrukomaty(); // Refresh drukomaty after edit
        setEditingDrukomat(null); // Close the edit form
      }
    } catch (error) {
      console.error("Failed to edit drukomat:", error);
    }
  };

  const getPaginatedDrukomaty = (drukomaty, currentPage, drukomatyPerPage) => {
    const startIndex = (currentPage - 1) * drukomatyPerPage;
    const endIndex = startIndex + drukomatyPerPage;
    return drukomaty.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center w-full h-[740px] py-[10px] px-[50px] m-[30px] rounded-md bg-white">
      <h1>All Drukomaty List</h1>
      <div className="grid grid-cols-8 gap-[10px] w-full py-[20 px] text-[#454545] text-[15px] font-bold">
        <p>Name</p>
        <p>Address</p>
        <p>City</p>
        <p>Latitude</p>
        <p>Longitude</p>
        <p>Status</p>
        <p>Edit</p>
        <p>Remove</p>
      </div>
      <div className="w-full overflow-y-auto">
        <hr />
        {displayedDrukomaty.map((drukomat) => (
          <React.Fragment key={drukomat.id}>
            <div className="grid grid-cols-8 gap-[10px] w-full items-center">
              <p>{drukomat.name}</p>
              <p>{drukomat.address}</p>
              <p>{drukomat.city}</p>
              <p>{drukomat.latitude}</p>
              <p>{drukomat.longitude}</p>
              <p>{drukomat.status}</p>
              <img
                src={cross_icon} // Icon for editing
                onClick={() => openEditForm(drukomat)}
                alt="Edit drukomat"
                className="m-auto cursor-pointer"
              />
              <img
                src={cross_icon} // Icon for removing
                onClick={() => removeDrukomat(drukomat.id)}
                alt="Remove drukomat"
                className="m-auto cursor-pointer"
              />
            </div>
            <hr />

            {/* Conditional rendering of the edit form */}
            {editingDrukomat === drukomat.id && (
              <form
                onSubmit={handleSubmitEdit}
                className="w-full bg-gray-100 p-4 rounded-md mt-2"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
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
                    <label>Latitude</label>
                    <input
                      type="text"
                      name="latitude"
                      value={editForm.latitude}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Longitude</label>
                    <input
                      type="text"
                      name="longitude"
                      value={editForm.longitude}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Status</label>
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Active">Active</option>
                      <option value="Out of Service">Out of Service</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
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
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        {[...Array(Math.ceil(allDrukomaty.length / drukomatyPerPage))].map(
          (_, index) => (
            <button
              key={index}
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

export default ListDrukomaty;
