
import axios from 'axios';
const DeleteBusModal = ({setShowDeleteModal,id}) => {
  
    const handleDeleteBus = (busId) =>{
        const token = sessionStorage.getItem("token");
        // Function to handle API calls for add, edit, and delete
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log(busId)
        try {
            const response = axios.delete(`https://movingsync-assignment-backend.onrender.com/api/buses/${busId}`,headers);
            if(response){

                window.alert('Bus deleted successfully')
            }
           
          } catch (error) {
            console.error('Error deleting bus:', error.response?.data || error.message);
            window.alert('Error deleting bus');
          }
          finally{
            setShowDeleteModal(false)
          }
    }

  return (
    <div className="modal" id="deleteBusModal">
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
          <button className="btn btn-danger" onClick={()=>handleDeleteBus(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DeleteBusModal