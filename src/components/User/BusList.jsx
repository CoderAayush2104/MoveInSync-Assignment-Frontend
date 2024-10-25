// src/components/User/BusList.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/busList.css"
const BusList = ({ source, destination, onSelectBus }) => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchBuses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/buses/available?source=${source}&destination=${destination}`, headers);
        setBuses(response.data);
        setError(null)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        
      }
    };
    if(source && destination){
      setLoading(true)
      setError(null);
      fetchBuses();
    }else{
      setLoading(false)
      setError("Source or Destination missing.Please enter")
    }
  }, [source, destination]);

  useEffect(()=>console.log(buses),[buses])

  const getOccupancyColor = (currentOccupancy, totalSeats) => {
    const occupancyPercentage = (currentOccupancy / totalSeats) * 100;
    if (occupancyPercentage < 60) return 'low';
    if (occupancyPercentage < 90) return 'medium';
    return 'high';
  };

  if (loading) return <div>Loading buses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bus-list-container">
      <h2>Available Buses</h2>
      <div className="bus-cards-grid">
        {buses.map(bus => {
          const occupancyPercentage = ((bus.currentOccupancy / bus.totalSeats) * 100).toFixed(0);
          const occupancyColor = getOccupancyColor(bus.currentOccupancy, bus.totalSeats);
          
          return (
            <div key={bus._id} className="bus-card">
              <h3>{bus.name}</h3>
              <p>Seats Available: {bus.totalSeats - bus.currentOccupancy}</p>
              <div className="occupancy-container">
                <div 
                  className={`occupancy-fill ${occupancyColor}`}
                  style={{ width: `${occupancyPercentage}%` }}
                ></div>
                <div className="occupancy-text">
                  {occupancyPercentage}% Full
                </div>
              </div>
              <button onClick={() => onSelectBus(bus._id)}>Book Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusList;
