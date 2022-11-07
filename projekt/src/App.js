import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {

  const getData = async () => {
    const { data  } = await axios.get('https://my.api.mockaroo.com/shipments.json?key=5e0b62d0');
    setContacts(data);
  };
  useEffect(() => {
    getData();
  }, []);


  const postData = async (contact) => {
    const { data } = await axios.post('https://my.api.mockaroo.com/shipments.json?key=5e0b62d0', {...contact});
    setContacts(data);
  };

  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    orderNo: "",
    date: "",
    customer: "",
    trackingNo: "",
    status: "",
    consignee: "",
  });

  const [editFormData, setEditFormData] = useState({
    orderNo: "",
    date: "",
    customer: "",
    trackingNo: "",
    status: "",
    consignee: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };



  const handleAddFormSubmit = (event) => {

    event.preventDefault();

    const newContact = {
      id: nanoid(),
      orderNo: addFormData.orderNo,
      date: addFormData.date,
      customer: addFormData.customer,
      trackingNo: addFormData.trackingNo,
      status: addFormData.status,
      consignee: addFormData.consignee,
 
    };
   
    const newContacts = [...contacts, newContact];
    postData(newContact);
setContacts(newContacts);
  };



  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      orderNo: editFormData.orderNo,
      date: editFormData.date,
      customer: editFormData.customer,
      trackingNo: editFormData.trackingNo,
      status: editFormData.status,
      consignee: editFormData.consignee,

    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.orderNo === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.orderNo);

    const formValues = {
      orderNo: contact.orderNo,
      date: contact.date,
      customer: contact.customer,
      trackingNo: contact.trackingNo,
      status: contact.status,
      consignee: contact.consignee,
 
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (event, contact) => {
    event.preventDefault();
    const newContacts = [...contacts];

    const index = contacts.findIndex((c) => c.orderNo === contact.orderNo);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    
    <div className="app-container">

<div className="add-form">
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="orderNo"
          required="required"
          placeholder="Enter OrderNo"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="date"
          required="required"
          placeholder="Enter DeliveryDate"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="customer"
          required="required"
          placeholder="Enter Customer"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="trackingNo"
          required="required"
          placeholder="Enter TrackingNo"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="status"
          required="required"
          placeholder="Enter Status"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="consignee"
          required="required"
          placeholder="Enter Consignee"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
      </div>
 
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>OrderNo</th>
              <th>DeliveryDate</th>
              <th>Customer</th>
              <th>TrackingNo</th>
              <th>Status</th>
              <th>Consignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.orderNo ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>


        

    </div>
  );
};

export default App;