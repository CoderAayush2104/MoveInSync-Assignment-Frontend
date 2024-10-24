
import React, { useEffect } from "react";

const BusForm = ({ formData, setFormData, onSubmit }) => {
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
    <form onSubmit={onSubmit}>
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
        Routes (comma-separated):
        <input
          type="text"
          name="routes"
          value={formData.routes.join(", ")}
          onChange={handleArrayChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BusForm;
