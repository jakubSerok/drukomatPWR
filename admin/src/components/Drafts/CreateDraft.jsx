import React, { useState } from "react";
import { url } from "../../assets/assets";
import axios from "axios";

const CreateDraft = () => {
  const [formData, setFormData] = useState({
    Name: "",
    DraftFile: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const draftData = {
        ...formData,
      };
      console.log(draftData);
      const response = await axios.post(
        `${url}/api/drafts/createDraft`,
        draftData
      );

      if (response) {
      } else {
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      console.log("Selected file:", selectedFile); // Log the selected file
      setFormData((prevData) => ({
        ...prevData,
        DraftFile: "selectedFile",
      }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle changes to both top-level and nested File fields

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Create Draft</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700"
      >
        Create Draft
      </button>
    </form>
  );
};

export default CreateDraft;
