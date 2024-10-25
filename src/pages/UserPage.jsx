// src/pages/UserPage.js
import { useState, useEffect } from "react";
import BusList from "../components/User/BusList";
import BookingForm from "../components/User/BookingForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/userPage.css'
const UserPage = () => {
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const navigate = useNavigate()
  const token = sessionStorage.getItem("token");

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/buses/routes', headers);
        setRoutes(response.data);
        
        const uniqueSources = new Set(response.data.map(route => route.origin));
        const uniqueDestinations = new Set(response.data.map(route => route.destination));

        setSources([...uniqueSources]);
        setDestinations([...uniqueDestinations]);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const handleSearchBuses = () => {
    setSelectedBusId(null); // Reset the bus ID on search
  };

  const handleBookingSuccess = () => {
    alert("Booking successful!");
    setSelectedBusId(null);
  };

  return (
    <div className="user-page">
      <h1>Bus Booking System</h1>
      
      <button onClick={()=>{navigate('/user/bookings')}} className="search-buses-button">My Bookings</button>
      <div className="source-field">
        <label htmlFor="source" className="source-field-label">Source</label>
        <select
          id="source"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Source</option>
          {sources.map((source, index) => (
            <option key={index} value={source}>{source}</option>
          ))}
        </select>
      </div>

      <div className="destination-field">
        <label htmlFor="destination" className="destination-field-label">Destination</label>
        <select
          id="destination"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Destination</option>
          {destinations.map((destination, index) => (
            <option key={index} value={destination}>{destination}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSearchBuses} className="search-buses-button">Search Buses</button>

      

      {selectedBusId ? (
        <BookingForm
          busId={selectedBusId}
          onBookingSuccess={handleBookingSuccess}
        />
      ) : (
        <BusList
          source={selectedSource}
          destination={selectedDestination}
          onSelectBus={setSelectedBusId}
        />
      )}
    </div>
  );
};

export default UserPage;
