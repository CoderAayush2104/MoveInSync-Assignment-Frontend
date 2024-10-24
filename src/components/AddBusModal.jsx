
import React, { useState } from "react";
import axios from "axios";
import BusForm from "./BusForm";

const AddBusModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    totalSeats: 0,
    currentOccupancy: 0,
    availableDays: [],
    estimatedTimeofArrival: "",
    estimatedTimeofDeparture: "",
    routes: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/buses", formData)
      .then((response) => {
        window.alert("Bus added successfully!");
        onAdd(response.data); // Call the onAdd function to refresh the bus list
        onClose(); // Close the modal
      })
      .catch((error) => {
        window.alert(`Error adding bus: ${error.message}`);
      });
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Bus</h2>
        <BusForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddBusModal;
