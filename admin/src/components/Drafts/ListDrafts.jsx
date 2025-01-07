import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../assets/assets";
const ListDrafts = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get(`${url}/api/drafts/getDrafts`);
        setDrafts(response.data);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };
    fetchDrafts();
  }, []);

  const handleEdit = (id) => {
    const newName = prompt("Enter the new name for the draft:");
    if (!newName) return;

    axios
      .put(`/api/drafts/${id}`, { name: newName })
      .then((response) => {
        alert("Draft updated successfully!");
        setDrafts((prevDrafts) =>
          prevDrafts.map((draft) =>
            draft._id === id ? { ...draft, name: newName } : draft
          )
        );
      })
      .catch((error) => {
        console.error("Error updating draft:", error);
        alert("Failed to update draft.");
      });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h1 className="text-xl font-bold mb-4">List of Drafts</h1>
      <ul className="space-y-2">
        {drafts.map((draft) => (
          <li
            key={draft._id}
            className="p-4 bg-white rounded-md shadow flex justify-between items-center"
          >
            <span>{draft.Name}</span>
            <button
              onClick={() => handleEdit(draft._id)}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListDrafts;
