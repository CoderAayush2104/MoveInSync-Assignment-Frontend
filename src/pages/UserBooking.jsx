import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/userBooking.css';

const UserBookings = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState(null);
  
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem('id');
  
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bookings/${userId}`,
        headers
      );
      setTickets(response.data);
    } catch (err) {
      alert("Failed to fetch bookings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (ticketId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancelingId(ticketId);
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${ticketId}`,
        headers
      );
      setTickets(tickets.filter(ticket => ticket.ticketId !== ticketId));
      window.alert("Ticket cancelled successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancelingId(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h2>Your Bookings</h2>
      </div>
      
      {tickets.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found. Book a bus ticket to get started!</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {tickets.map(ticket => (
            <div key={ticket.ticketId} className="booking-card">
              <div className="booking-info">
                <div className="booking-detail">
                  <span className="detail-label">Bus Name</span>
                  <span className="detail-value">{ticket.busName}</span>
                </div>
                <div className="booking-detail">
                  <span className="detail-label">Seat Number</span>
                  <span className="detail-value">{ticket.seatNumber}</span>
                </div>
                <div className="booking-detail">
                  <span className="detail-label">Travel Date</span>
                  <span className="detail-value">
                    {new Date(ticket.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                className="cancel-button"
                onClick={() => handleCancel(ticket.ticketId)}
                disabled={cancelingId === ticket.ticketId}
              >
                {cancelingId === ticket.ticketId ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;