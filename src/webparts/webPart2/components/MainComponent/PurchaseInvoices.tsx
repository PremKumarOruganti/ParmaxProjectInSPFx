/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
//import * as react from "react";
import { useEffect, useState } from "react";
import { Row, Container, Col, Table, Button } from "react-bootstrap";
//import NavBar from "./NavBar";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import * as React from "react";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const PurchaseInvoice = (props: any) => {
  //////Model/////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  //   ////
  //   const editEvent = () => {
  //     alert("edit Event");
  //   };
  const deleteEvent = () => {
    alert("Purchases Invoices are not suppose to delete");
  };
  // ///////fetching data from API/////
  // const apiUrl = "http://localhost:5000";
  // const [invoiceParticulars, setInvoiceParticulars] = useState([]);
  // function fetchData() {
  //   fetch(apiUrl + "/" + "invoices")
  //     .then((res) => res.json())
  //     .then((data) => setInvoiceParticulars(data))
  //     .catch((error) => console.error("Error fetching data:", console.error));
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);
  // ////////
  // //////Sales Data finding//////
  // const [purchaseData, setpurchaseData] = useState([]);

  // useEffect(() => {
  //   const purchaseData = invoiceParticulars.filter(
  //     (item: any) => item.transactionType === "Purchase"
  //   );
  //   setpurchaseData(purchaseData);
  // }, [invoiceParticulars]);
  // ////

  ////
  // console.log("purchaseData", purchaseData);
  /////SPFx//////
  const [PurchaseInvoice, setPurchaseInvoice] = useState([]);

  //2.
  const siteUrl = props.context.pageContext.web.absoluteUrl;
  const decodedListName = 'Invoices';
  const listName = decodeURIComponent(decodedListName);
  //const api = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&Select=ID,Title`;
  //console.log(api);
  //////// fetch data from Rest api

  const PurchaseInvoicefetchingData = async () => {
    // const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,InvoiceNum,NameOfParty,Age,$filter=TransactionType eq Sales`;
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,InvoiceNum,NameOfParty,Mobile,Date,Email,Address,TotalQuantity,TotalAllAmounts,TransactionType&$filter=TransactionType eq 'Purchase'`;

    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (response.ok) {
        const data = await response.json();
        console.log("service layer data:", data.value);
        setPurchaseInvoice(data.value)
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
    PurchaseInvoicefetchingData()
  }, [])
  /////SPFx/////


  return (
    <div>
      {/* <NavBar /> */}
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3">
            <Link to="/purchase-invoices/invoice/new">
              <Button
                variant="primary"
                className="py-2 px-4 "
              //   onClick={handleShow}
              >
                Add Purchase +
              </Button>
            </Link>
            {/* <Button onClick={handleShow}>Add Purchase +</Button> */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>Category</Col>
                  <Col md={6}>Status</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Enter category"
                      className="form-control"
                    //   onChange={(e) => setNewinvoiceNum(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <select
                      className="form-control"
                    //   onChange={(e) => setNewstatus(e.target.value)}
                    >
                      <option>Select</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  <span>Save Changes</span>
                  {/* <span onClick={saveEvent}>Save Changes</span> */}
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col className="pt-2">
            <Table
              striped
              bordered
              hover
              variant="dark"
              className="text-center"
            >
              <thead>
                <tr>
                  <th>Vendor Name</th>
                  <th>GSTIN</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Total Quantity</th>
                  <th>Total Amount</th>
                  <th>view Details</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {PurchaseInvoice.map((item: any) => (
                  <tr key={item.ID}>

                    <td>{item.NameOfParty}</td>
                    <td>{item.Title}</td>
                    <td>{item.Mobile}</td>
                    <td>{item.Date}</td>
                    <td>{item.Email}</td>
                    <td>{item.Address}</td>
                    <td>{item.TotalQuantity}</td>
                    <td>{item.TotalAllAmounts}</td>
                    <td className="text-center text-primary">
                      <Link
                        to={`/purchase-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link>
                    </td>
                    {/* <Link
                        to={`/sale-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link> */}
                    <td className="text-primary">
                      <Link
                        to={`/purchase-invoices/invoice/edit/${item.invoiceNum}`}
                      >
                        <BiEdit />
                      </Link>
                    </td>
                    <td className="text-danger" onClick={() => deleteEvent()}>
                      <AiFillDelete />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default PurchaseInvoice;
