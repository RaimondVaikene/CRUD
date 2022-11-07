import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter OrderNo"
          name="orderNo"
          value={editFormData.orderNo}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter DeliveryDate"
          name="date"
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Customer"
          name="customer"
          value={editFormData.customer}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter TrackingNo"
          name="trackingNo"
          value={editFormData.trackingNo}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Status"
          name="status"
          value={editFormData.status}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Consignee"
          name="consignee"
          value={editFormData.consignee}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;