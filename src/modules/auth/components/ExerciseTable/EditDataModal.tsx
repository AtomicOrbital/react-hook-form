import React, { useState } from 'react';

interface EditDataModalProps {
  data: any;
  onCancel: () => void;
  onUpdate: (updatedData: any) => void;
}

const EditDataModal: React.FC<EditDataModalProps> = ({ data, onCancel, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedData);
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
              name="client"
              className="form-control"
              value={updatedData.client}
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
