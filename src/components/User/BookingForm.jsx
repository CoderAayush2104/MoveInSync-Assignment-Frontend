import { useState } from 'react';
import axios from 'axios';
import '../../styles/bookingForm.css';

const BookingForm = ({ busId, onBookingSuccess }) => {
  const [seatNumber, setSeatNumber] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const userId = sessionStorage.getItem('id');

  // Get tomorrow's date for minimum date validation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Additional validation
    if (seatNumber < 1) {
      setError('Please enter a valid seat number');
      return;
    }

    const selectedDate = new Date(date);
    if (selectedDate < tomorrow) {
      setError('Please select a future date');
      return;
    }

    const token = sessionStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(
        'http://localhost:5000/api/bookings',
        { userId, busId, seatNumber, date },
        headers
      );
      onBookingSuccess();
    } catch (error) {
      setError(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="booking-form-container">
      <h3>Book a Seat</h3>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="seatNumber">Seat Number</label>
          <input
            id="seatNumber"
            type="number"
            min="1"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            placeholder="Enter seat number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Travel Date</label>
          <input
            id="date"
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;