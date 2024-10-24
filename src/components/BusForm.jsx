
import React, { useEffect,useState } from "react";
import axios from "axios";
const BusForm = ({ formData, setFormData, onSubmit }) => {
    const [routes, setRoutes] = useState()
  
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [routeDetails, setRouteDetails] = useState({})

    const token = sessionStorage.getItem("token");
    // Function to handle API calls for add, edit, and delete
  
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    useEffect(() => {
        // Fetch all routes
        const fetchRoutes = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/buses/routes',headers);
            setRoutes(response.data);
           console.log(response)
          } catch (error) {
            console.log(error?.response?.data?.message)
            console.error('Error fetching routes:', error);
          }
        };
    
        fetchRoutes();
      }, []);
    
      const handleRouteChange = async (event) => {
        const routeId = event.target.value;
        setSelectedRoute(routeId);
    
        // Fetch the selected route details
        try {
            console.log(routeId)
          const response = await axios.get(`http://localhost:5000/api/buses/routes/${routeId}`,headers);
          console.log("Route Details",response)
          setRouteDetails(response.data);
          
          setFormData((prev)=>({...prev,routes:[response.data]}));
        } catch (error) {
          console.error('Error fetching route details:', error);
        }
      };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()), // Converts a comma-separated string to an array
    }));
  };

  return (
    <form onSubmit={onSubmit} className="modal-bus-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Total Seats:
        <input
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Current Occupancy:
        <input
          type="number"
          name="currentOccupancy"
          value={formData.currentOccupancy}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Available Days (comma-separated):
        <input
          type="text"
          name="availableDays"
          value={formData.availableDays.join(", ")}
          onChange={handleArrayChange}
          required
        />
      </label>
      <label>
        Estimated Time of Arrival:
        <input
          type="text"
          name="estimatedTimeofArrival"
          value={formData.estimatedTimeofArrival}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Estimated Time of Departure:
        <input
          type="text"
          name="estimatedTimeofDeparture"
          value={formData.estimatedTimeofDeparture}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Route:
        <select value={selectedRoute} onChange={handleRouteChange}>
          <option value="">Select a route</option>
          {routes?.map((route) => (
            <option key={route._id} value={route._id}>
              {route.origin} to {route.destination}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BusForm;
