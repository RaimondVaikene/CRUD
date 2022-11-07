import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
        <td>{contact.orderNo}</td>
        <td>{contact.date}</td>
        <td>{contact.customer}</td>
        <td>{contact.trackingNo}</td>
        <td>{contact.status}</td>
        <td>{contact.consignee}</td>
        <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >Edit</button>
        <button type="button" onClick={(event) => handleDeleteClick(event, contact)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;