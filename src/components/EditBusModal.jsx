// EditBusModal.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BusForm from "./BusForm";

const EditBusModal = ({ setShowEditModal, bus }) => {
  const token = sessionStorage.getItem("token");
  console.log(bus);
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    totalSeats: 0,
    currentOccupancy: 0,
    availableDays: [],
    estimatedTimeofArrival: "",
    estimatedTimeofDeparture: "",
    routes: [],
  });

  useEffect(() => {
    if (bus) {
      setFormData(bus); // Set initial form data when bus prop changes
    }
  }, [bus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = axios.put(
        `http://localhost:5000/api/buses/${bus._id}`,
        formData,
        headers
      );
      console.log(response);
      window.alert("Bus updated successfully")
    } catch (error) {
      window.alert(`Error updating bus: ${error.message}`);
    } finally {
      setShowEditModal(false);
    }
  };

  return (
    <div className="modal" id="editBusModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Bus</h4>
            <button type="button" className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <BusForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-default"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBusModal;
