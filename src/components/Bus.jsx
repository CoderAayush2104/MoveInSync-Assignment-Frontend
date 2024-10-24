
const Bus = ({ bus, onEdit,onDelete,onSelect,id ,onSelectBus}) => {
  return (
    <tr>
      <td>{bus.name}</td>
      <td>{bus.totalSeats}</td>
      <td>{bus.currentOccupancy}</td>
      <td>{bus.availableDays.join(", ")}</td>
      <td>{bus.estimatedTimeofArrival}</td>
      <td>{bus.estimatedTimeofDeparture}</td>
      <td>{/* Display routes as "source -> destination" */}
        {bus.routes?.map((route) => (
          <div key={route._id}>
            {route.origin} → {route.destination}
          </div>
        ))}</td>
      <td className="table-action-buttons">
        <button onClick={() => {
            onSelectBus(bus)
           
            onEdit(bus)
            }}>Edit</button>
        <button onClick={() => {
            onSelect(id)
            onDelete(id)}}>Delete</button>
      </td>
    </tr>
  );
};

export default Bus;
