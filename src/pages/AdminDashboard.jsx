import { useState, useEffect } from "react";
import "../styles/adminDashboard.css";
import axios from "axios";
import Bus from "../components/Bus";
import DeleteBusModal from "../components/DeleteBusModal";
import AddBusModal from "../components/AddBusModal";
import EditBusModal from "../components/EditBusModal";
const AdminDashboard = () => {
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [selectedBus,setSelectedBus] = useState();
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
        console.log(response.data[0]);
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



  const handleEditBus = () => {
    setShowEditModal(true); // Open the edit modal
  };


  const handleDeleteBus = () =>{
    setShowDeleteModal(true);
  }


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
                  <i className="material-icons">+</i>{" "}
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
                  key={bus._id}
                  bus={bus}
                  id={bus._id}
                  onEdit={handleEditBus}
                  onDelete={handleDeleteBus}
                  onSelect={setSelectedBusId}
                  onSelectBus={setSelectedBus}
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
        <AddBusModal setShowAddModal={setShowAddModal} />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditBusModal setShowEditModal={setShowEditModal} bus={selectedBus} />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteBusModal setShowDeleteModal={setShowDeleteModal} id={selectedBusId}/>
      )}
    </>
  );
};

export default AdminDashboard;
