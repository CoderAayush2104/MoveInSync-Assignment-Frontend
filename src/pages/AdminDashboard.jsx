import { useState, useEffect } from "react";
import "../styles/adminDashboard.css";
import axios from "axios";
import Bus from "../components/Bus";
const AdminDashboard = () => {
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState();

  const token = sessionStorage.getItem("token");
  // Function to handle API calls for add, edit, and delete

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchBuses = () => {
    axios
      .get("http://localhost:5000/api/buses", headers)
      .then((response) => {
        console.log(response);
        setBuses(response.data);
      })
      .catch((error) => {
        console.log(error)
        window.alert(`Error fetching buses: ${error.message}`);
      });
  };
  // Function to fetch buses
  useEffect(() => {
    fetchBuses();
  }, []);


  const handleEditBus = (id) => {
    setSelectedBus(bus); // Set the bus to be edited
    setShowEditModal(true); // Open the edit modal
  };

  const handleUpdateBus = (updatedBus) => {
    setBuses((prev) =>
      prev.map((bus) => (bus.id === updatedBus.id ? updatedBus : bus))
    ); // Update the bus list with the edited bus
  };
  const handleDeletBus = (id) =>{
    setShowDeleteModal(true);
  }

  const handleAddBus = (newBus) => {
    setBuses((prev) => [...prev, newBus]); // Add the new bus to the list
  };

  return (
    <>
      <div className="admindash-container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Buses</b>
                </h2>
              </div>
              <div className="col-sm-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-success"
                >
                  <i className="material-icons">&#xE147;</i>{" "}
                  <span>Add New Bus</span>
                </button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Seats</th>
                <th>Current Occupancy</th>
                <th>Available Days</th>
                <th>ETA</th>
                <th>ETD</th>
                <th>Routes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses?.map((bus) => (
                <Bus
                  key={bus.id}
                  bus={bus}
                  onEdit={handleEditBus}
                  onDelete={handleDeleteBus}
                />
              ))}
              {/* {buses?.map((bus, index) => (
                <tr key={index}>
                  <td>{bus.name}</td>
                  <td>{bus.totalSeats}</td>
                  <td>{bus.currentOccupancy}</td>
                  <td>{bus.availableDays.join(", ")}</td>
                  <td>{bus.estimatedTimeofArrival}</td>
                  <td>{bus.estimatedTimeofDeparture}</td>
                  <td>{bus.routes.join(", ")}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedBus(bus);
                        setShowEditModal(true);
                      }}
                      className="edit"
                    >
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Edit"
                      >
                        &#xE254;
                      </i>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBus(bus);
                        setShowDeleteModal(true);
                      }}
                      className="delete"
                    >
                      <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Delete"
                      >
                        &#xE872;
                      </i>
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal show" id="addBusModal">
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
                {/* Form Inputs for Adding Bus */}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-default"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleAddBus}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBus && (
        <div className="modal show" id="editBusModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Bus</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {/* Form Inputs for Editing Bus */}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-default"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-info" onClick={handleEditBus}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal show" id="deleteBusModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Delete Bus</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this bus?</p>
                <p className="text-warning">
                  <small>This action cannot be undone.</small>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-default"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteBus}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
