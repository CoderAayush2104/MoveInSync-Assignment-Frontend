
const Bus = ({ bus, onEdit,onDelete }) => {
  return (
    <tr>
      <td>{bus.name}</td>
      <td>{bus.totalSeats}</td>
      <td>{bus.currentOccupancy}</td>
      <td>{bus.availableDays.join(", ")}</td>
      <td>{bus.estimatedTimeofArrival}</td>
      <td>{bus.estimatedTimeofDeparture}</td>
      <td>{bus.routes.join(", ")}</td>
      <td>
        <button onClick={() => onEdit(bus)}>Edit</button>
        <button onClick={() => onDelete(bus)}>Delete</button>
      </td>
    </tr>
  );
};

export default Bus;
