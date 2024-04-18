/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useEffect, useState } from "react";
//import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
//import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
//import axios from "axios";

const EditAndNewSalesInvoice = (props: any) => {

  const { idFromUrl }: any = useParams();

  const GUID1: any = uuidv4();
  const GUID2 = idFromUrl ? idFromUrl : GUID1;
  const [GUID, setNewGuid] = useState(GUID2);

  /// Current Date ///
  const currentDate = new Date();
  const currentFormatedDate = currentDate.toISOString();


  const [editData1, setEditData1] = useState(false);

  const [GrandTotalAmount, setGrandTotalAmount] = useState(0);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  //edit
  const [editData, setEditData] = useState<{
    editId: any,
    Title: any;
    TransactionType: string;
    MedicineName: any;
    Description: any;
    Quantity: any;
    Amount: any;
    TotalAmount: any;
    InvoiceNum: any;
  } | null>(null);

  const [invoiceFormData, setInvoiceFormData] = useState({
    Title: "",
    NameOfParty: "",
    Age: 0,
    Mobile: 0,
    Email: "",
    Address: "",
    TransactionType: "Sales",
    TotalQuantity: 0,
    TotalAllAmounts: 0,
    Date: currentFormatedDate,
    InvoiceNum: GUID,
    id: 0,
  });




  const [savedData, setSavedData] = useState<any[]>([]); // Explicitly specify the type as an array of any
  console.log('savedData22', savedData);

  const [selectedMedicine, setSelectedMedicine] = useState({
    Title: "--Select--",
    Description: "",
    Price: 0,
    ID: 0,
  });

  const [quantity, setQuantity] = useState(0);


  const handleMedicineSelection234 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    alert(e.target.value + "uu")
    const selectedMedicineID = parseInt(e.target.value);
    const selectedMedicineData = Medicines.find((item: any) => item.ID === selectedMedicineID);

    // if (selectedMedicineData) {
    //   setSelectedMedicine(selectedMedicineData);
    // } else {
    //   setSelectedMedicine({
    //     ID: 0,
    //     Title: '',
    //     Description: '',
    //     Price: 0
    //   });
    // }
    setSelectedMedicine(
      selectedMedicineData || { Title: "", Description: "", Price: 0, ID: 0 }
    );
  };

  console.log("setSelectedMedicine1345", selectedMedicine);
  //GUID
  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c: any) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  //Save Button
  const handleSaveAndUpdate = () => {
    setEditData1(false);


    const totalAmountForItem = quantity * selectedMedicine.Price;
    //const newGuId = uuidv4();

    // Calculate the new ID based on the length of savedData
    const newID = savedData.length;

    const newData = {
      ID: newID, // Assign a unique ID based on the length of savedData
      TransactionType: "Sales",
      MedicineName: selectedMedicine.Title,
      Description: selectedMedicine.Description,
      Quantity: quantity,
      Amount: selectedMedicine.Price,
      TotalAmount: totalAmountForItem,
      InvoiceNum: GUID,
    };

    // If editData exists, update the corresponding item in savedData based on its ID
    if (editData) {

      const UpdatedData = {
        ID: editData.editId, // Assign a unique ID based on the length of savedData
        TransactionType: "Sales",
        MedicineName: editData.Title,
        Description: editData.Description,
        Quantity: quantity,
        Amount: totalAmountForItem,
        TotalAmount: editData.TotalAmount,
        InvoiceNum: editData.InvoiceNum,
      };

      setSavedData((prevSavedData: any[]) =>
        prevSavedData.map((item: any) =>
          item.ID === editData.editId ? { ...UpdatedData, Quantity: quantity, TotalAmount: selectedMedicine.Price * quantity } : item
        )
      );
      console.log("Quantity:", quantity);
      console.log("EditData TotalAmount:", editData.TotalAmount);
      setEditData(null);
    }
    else {
      // If editData doesn't exist, add the new data to savedData
      setSavedData((prevSavedData: any) => [...prevSavedData, newData]);
    }

    const updatedTotalAmountSum = [
      ...savedData.filter((item) => item.ID !== editData?.editId),
      newData,
    ].reduce((sum, data) => sum + data.TotalAmount, 0);

    const updatedTotalQuantitySum = [
      ...savedData.filter((item) => item.ID !== editData?.editId),
      newData,
    ].reduce((sum, data) => sum + parseInt(data.Quantity), 0);

    console.log('updatedTotalAmountSum1', updatedTotalAmountSum);
    console.log('updatedTotalQuantitySum1', updatedTotalQuantitySum);


    setGrandTotalAmount(updatedTotalAmountSum);
    setTotalQuantity(updatedTotalQuantitySum);
    ///////////////////////////////
    // const updatedTotalQuantitySum = savedData.reduce(
    //   (sum, data) => sum + parseInt(data.quantity),
    //   0
    // );
    // const updatedTotalAmountSum = savedData.reduce(
    //   (sum, data) => sum + data.totalAmount,
    //   0
    // );
    // // Generate a new GUID


    // setTotalQuantity(updatedTotalQuantitySum);
    // setGrandTotalAmount(updatedTotalAmountSum);
    /////////////////////////
    // Clear input fields and reset state
    setSelectedMedicine({
      Title: "--Select--",
      Description: "",
      Price: 0,
      ID: 0
    });
    setQuantity(0);
  };

  const [editingItem, setEditingItem] = useState<any>(null);

  const handleEdit = (item: any) => {
    setEditData1(true);
    setEditData({
      editId: item.ID,
      Title: item.MedicineName,
      TransactionType: "Sales",
      MedicineName: item.MedicineName,
      Description: item.Description,
      Quantity: item.Quantity,
      Amount: item.Amount,
      TotalAmount: item.totalAmount,
      InvoiceNum: item.InvoiceNum,
    });
    console.log('setEditData11', editData);

    setSelectedMedicine({
      Title: item.Title,
      Description: item.Description,
      Price: item.Amount,
      ID: item.ID
    });
    setQuantity(item.Quantity);

    setEditingItem(item)
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Create a copy of invoiceParticulars
    const updatedInvoiceParticulars = { ...invoiceFormData };

    // Update the specific field in the copied array
    (updatedInvoiceParticulars as any)[name] = value;

    setInvoiceFormData(updatedInvoiceParticulars);
  };

  const generateNewGUID = () => {
    const newGUID = uuidv4();
    setNewGuid(newGUID);
    return newGUID;
  };





  const SPFxTransactionPost = async (data: any[]) => {
    const siteUrl = props.context.pageContext.web.absoluteUrl;
    const listName = 'Transactions';
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;

    const headers = {
      'Content-Type': 'application/json',
    };

    for (const item of data) {
      const itemData = {
        Title: item.Title,
        MedicineNameId: item.MedicineNameId,
        DescriptionId: item.DescriptionId,
        Quantity: item.Quantity,
        Amount: item.Amount,
        TotalAmount: item.TotalAmount,
        InvoiceNum: item.InvoiceNum
      };

      const spHttpClientOptions = {
        body: JSON.stringify(itemData),
        headers: headers,
      };

      try {
        const response: SPHttpClientResponse = await props.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spHttpClientOptions);
        console.log("Item added successfully:", response);
        alert("success")
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (error) {
        alert("fail")
        console.error("Error adding item:", error);
        throw error; // Rethrow the error to be caught by the caller
      }
    }
  };

  async function SPFxInvoicesPost(newInvoiceFormData: any) {
    alert();
    const siteUrl = props.context.pageContext.web.absoluteUrl;
    const listName = 'Invoices';
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;

    const headers = {
      'Content-Type': 'application/json',
    };
    const spHttpClientOptions = {
      body: JSON.stringify(newInvoiceFormData),
      headers: headers,
    };
    const response: SPHttpClientResponse = await props.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spHttpClientOptions);
    if (response.ok) {
      const data = await response.json();
      return data.d;
    } else {
      throw new Error(response.statusText);
    }
  }

  const handleSubmit = async () => {

    try {
      // // Calculate totalQuantity and totalAllAmounts
      // const updatedTotalQuantitySum = savedData.reduce(
      //   (sum, data) => sum + parseInt(data.quantity),
      //   0
      // );
      // const updatedTotalAmountSum = savedData.reduce(
      //   (sum, data) => sum + data.totalAmount,
      //   0
      // );
      // // Generate a new GUID
      // const newGUID = generateNewGUID();

      // setTotalQuantity(updatedTotalQuantitySum);
      // setGrandTotalAmount(updatedTotalAmountSum);
      // Calculate totalQuantity and totalAllAmounts
      const updatedTotalQuantitySum = savedData.reduce(
        (sum, data) => sum + parseInt(data.quantity),
        0
      );
      const updatedTotalAmountSum = savedData.reduce(
        (sum, data) => sum + data.totalAmount,
        0
      );
      // Generate a new GUID
      const newGUID = generateNewGUID();

      setTotalQuantity(updatedTotalQuantitySum);
      setGrandTotalAmount(updatedTotalAmountSum);

      const { id, ...newInvoiceFormData } = {
        ...invoiceFormData,

        TotalQuantity: updatedTotalQuantitySum,
        TotalAllAmounts: updatedTotalAmountSum,
        TransactionType: "Sales",
        Date: currentFormatedDate,
        InvoiceNum: GUID,
      };

      SPFxTransactionPost(savedData)
      SPFxInvoicesPost(newInvoiceFormData)
      // SPFxTransactionPost(savedData)
      setSavedData([])




      //SavedData

      setInvoiceFormData({
        Title: "",
        NameOfParty: "",
        Age: 0,
        Mobile: 0,
        Email: "",
        Address: "",
        TransactionType: "Sales",
        TotalQuantity: 0,
        TotalAllAmounts: 0,
        Date: currentFormatedDate,
        InvoiceNum: newGUID,
        id: 0,
      });

      setQuantity(0);
      setSelectedMedicine({
        Title: "--Select--",
        Description: "",
        Price: 0,
        ID: 0
      });
      setGrandTotalAmount(0);
      setTotalQuantity(0);

      ////////////////SPFx///////////////////


    } catch (error) {
      console.error("Error deleting transactions:", error);
      // Handle error if the delete request fails
    }
  };



  console.log("editData", editData);

  /// Cancel Event ///
  const CancelEvent = () => {
    setSelectedMedicine({
      Title: "",
      Description: "",
      Price: 0,
      ID: 0
    });
    setQuantity(0);
  };
  /// Delete Event ///
  const deleteEvent = (id: any) => {
    alert(id)
    const confirmval = confirm(
      "Are you sure , Do you want to delete this item ?"
    );
    if (confirmval) {
      if (savedData) {
        const newSavedData = savedData.filter((item: any) => item.ID != id);
        setSavedData(newSavedData);
      } else {
        alert("ID is not found");
      }
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  useEffect(() => {
    const updatedTotalAmountSum = savedData.reduce(
      (sum, data) => sum + data.TotalAmount,
      0
    );

    const updatedTotalQuantitySum = savedData.reduce(
      (sum, data) => sum + parseInt(data.Quantity),
      0
    );

    setGrandTotalAmount(updatedTotalAmountSum);
    setTotalQuantity(updatedTotalQuantitySum);
  }, []);



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////SPFx/////////////////////////

  //console.log("props.context", props.context);
  const [Medicines, setMedicines] = useState([]);

  //2.
  const siteUrl = props.context.pageContext.web.absoluteUrl;
  // const decodedListName = 'ManageMedicines';MedicinesL 
  const decodedListName = 'ManageMedicines';
  const listName = decodeURIComponent(decodedListName);

  const fetchData = async () => {
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,Description,Price`;
    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (response.ok) {
        const data = await response.json();
        console.log("ManageMedicinesData for lookup245:", data.value);
        setMedicines(data.value)

        // Return the data
      } else {
        console.log(`Error: ${response.statusText}`);
        throw new Error(response.statusText); // Throw an error if the response is not ok
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
  console.log("MedicinesDataforlookup", Medicines);






  // function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>, arg1: string): void {
  //   throw new Error("Function not implemented.");
  // }
  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = e.target.value;

    // Update the editing item's field based on the input field's name
    setEditingItem((prevItem: any) => ({
      ...prevItem,
      [field]: value,
    }));
    // setQuantity(e.target.value(quantity))

    console.log('editingItem13', value)

  };

  ////////////////////////SPFx/////////////////////////
  return (
    <>
      {/* <NavBar /> */}
      <Container fluid>
        <Row>
          <Col className=" h2 pb-3">
            {idFromUrl ? "Edit Billing Page" : "Sales Billing Page"}
          </Col>
        </Row>
        <Row>
          <Col>PAN</Col>
          <Col>Name</Col>
          <Col>Age</Col>
          <Col>Mobile</Col>
          <Col>Email</Col>
          <Col>Address</Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter PAN number"
              name="Title"
              value={invoiceFormData.Title}
              onChange={handleChange}
            />
          </Col>

          <Col>
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter name"
              name="NameOfParty"
              value={invoiceFormData.NameOfParty}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control py-1"
              placeholder="Enter age"
              name="Age"
              value={invoiceFormData.Age}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control py-1"
              placeholder="Enter mobile number"
              name="Mobile"
              value={invoiceFormData.Mobile}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control py-1"
              placeholder="Enter email"
              name="Email"
              value={invoiceFormData.Email}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <textarea
              className="form-control py-1"
              placeholder="Enter address"
              name="Address"
              value={invoiceFormData.Address}
              onChange={handleChange}
            />
          </Col>
        </Row>


        <Row className="pt-5">
          <Col md={4}>Medicine Name1</Col>
          <Col md={3}>Description</Col>
          <Col>Amount</Col>
          <Col>Quantity</Col>
        </Row>
        <Row>
          <>
            {/* Display editing item details if it exists */}
            {editingItem ? (
              <>
                <Col md={3}>
                  <input
                    type="text"
                    className="form-control py-1"
                    placeholder="Medicine Name"
                    value={editingItem.MedicineName}
                    onChange={(e) => handleEditInputChange(e, 'MedicineName')}
                  />
                </Col>
                <Col md={3}>
                  <textarea
                    className="form-control py-1"
                    placeholder="Enter description"
                    value={editingItem.Description}
                    onChange={(e) => handleEditInputChange(e, 'Description')}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control py-1"
                    placeholder="Enter amount per piece"
                    value={editingItem.Amount}
                    onChange={(e) => handleEditInputChange(e, 'Amount')}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control py-1"
                    placeholder="Enter quantity"
                    // value={editingItem.Quantity}
                    value={quantity}
                    onChange={((e) => setQuantity(parseInt(e.target.value)))}
                  // onChange={(e) => handleEditInputChange(e, 'Quantity')}
                  />
                </Col>
              </>
            ) : (
              // Display default input fields if no item is being edited
              <>
                <Col md={3}>
                  <select
                    className="form-control py-1 text-center"
                    value={selectedMedicine.ID}
                    onChange={handleMedicineSelection234}
                  >
                    <option value="">--Select--</option>
                    {Medicines.map((eachData: any) => (
                      <option key={eachData.ID} value={eachData.ID}>
                        {eachData.Title}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={3}>
                  <textarea
                    className="form-control py-1"
                    placeholder="Enter description"
                    name="description"
                    value={selectedMedicine.Description}
                    onChange={(e) => handleEditInputChange(e, 'Description')}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control py-1"
                    placeholder="Enter amount per piece"
                    name="amount"
                    value={selectedMedicine.Price}
                    onChange={(e) => handleEditInputChange(e, 'Price')}
                  />
                </Col>
                <Col>
                  <input
                    type="number"
                    className="form-control py-1"
                    placeholder="Enter quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value))}
                  />
                </Col>
              </>
            )}
          </>
        </Row>


        <Row>
          <Col className="pt-3 pr-4 d-flex justify-content-end">
            <Button className="py-1 px-5" onClick={handleSaveAndUpdate}>
              {editData1 ? "Update" : "Save"}
            </Button>



            &nbsp;&nbsp;
            {editData1 && (
              <Button className="py-1 px-5" onClick={CancelEvent}>
                Cancel
              </Button>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  {/* <th>Id</th> */}
                  <th>Medicine Name</th>
                  <th>Description</th>
                  <th>Amount per pease</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>

                {savedData &&
                  savedData.length > 0 &&
                  savedData.map((item: any) => (
                    <tr key={item.ID}>
                      <td>{item.MedicineName}</td>
                      <td>{item.Description}</td>
                      <td>{item.Amount}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.TotalAmount}</td>
                      <td
                        className="text-primary"
                        onClick={() => handleEdit(item)}
                      >
                        {<BiEdit />}
                      </td>
                      <td
                        className="text-danger"
                        onClick={() => deleteEvent(item.ID)}
                      >
                        {<AiFillDelete />}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8} />
          <Col md={4}>
            <h6>Total Purchase Amount (₹) : {GrandTotalAmount} </h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8} />
          <Col md={4}>
            <h6>Total Quantity :{TotalQuantity}</h6>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={8} />
          <Col md={4}>
            <h6>Grand Total (₹) : {GrandTotalAmount}</h6>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end pt-3 pb-2">
            <Button
              variant="primary"
              className="py-1 px-5"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {/* <Button className="py-1 px-5" onClick={() => handleSubmit1()}>
              Submit1
            </Button> */}
            {/* <Button
              variant="primary"
              className="py-1 px-5"
              onClick={handleDelete}
            >
              Delete
            </Button> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default EditAndNewSalesInvoice;
