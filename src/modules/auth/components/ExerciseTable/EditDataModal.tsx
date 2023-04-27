import React, { useState } from 'react';
import { useDispatch } from 'react-redux';



interface EditDataModalProps {
  data: any;
  onCancel: () => void;
  onUpdate: (updatedData: any) => void;
}

const EditDataModal: React.FC<EditDataModalProps> = ({ data, onCancel, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(data);
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value", e.target.value);
    console.log("valueName", e.target.name);
    const { name, value } = e.target;
    const { id, fundingMethod, order, status, total, currency } = updatedData;
      setUpdatedData({ id, fundingMethod,order, status, total, currency, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedData);
    console.log("updatedData", updatedData);
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Data</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="status"
              className="form-control"
              value={updatedData.status}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDataModal;
