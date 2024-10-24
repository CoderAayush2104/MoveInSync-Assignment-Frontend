import { useState } from "react";
import axios from "axios";
import BusForm from "./BusForm";

const AddBusModal = ({ setShowAddModal }) => {
  const token = sessionStorage.getItem("token");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = axios.post(
        "http://localhost:5000/api/buses",
        formData,
        headers
      );
      console.log(response);
      window.alert('Bus added successfully')
    } catch (error) {
      window.alert(`Error adding bus: ${error.message}`);
    } finally {
      setShowAddModal(false);
    }
  };

  return (
    <div className="modal" id="addBusModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Bus</h4>
            <button
              type="button"
              className="close"
              onClick={() => setShowAddModal(false)}
            >
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
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusModal;
