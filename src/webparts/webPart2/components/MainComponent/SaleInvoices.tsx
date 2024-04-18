/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
//import * as react from "react";
import { useState } from "react";
import { Row, Container, Col, Table, Button } from "react-bootstrap";
//import NavBar from "./NavBar";
import { AiFillDelete } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
//import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import * as React from "react";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'
//import { Toast } from '@pnp/spfx-controls-react/lib/Toast';

//import { Toast } from '@pnp/spfx-controls-react/lib/Toast';




const SalesInvoice = (props: any) => {
  //////Model/////
  //const [show, setShow] = useState(false);

  //const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  ////
  //   const [newinvoiceNum, setNewinvoiceNum] = useState("");
  //   const [newmedicineId, setMedicineId] = useState("");
  //   const [newquntity, setNewQuantity] = useState("");
  //   const [newAmountPerPeace, setAmountPerPeace] = useState("");
  //   const [newCategory, setNewCategory] = useState("");
  //   const [newInvoicetype, setNewInvoicetype] = useState("");
  //   const [newstatus, setNewstatus] = useState("");

  //   const newSalesData = {
  //     invoiceNum: newinvoiceNum,
  //     medicineId: newmedicineId,
  //     quntity: newquntity,
  //     amountPerPeace: newAmountPerPeace,
  //     category: newCategory,
  //     invoicetype: newInvoicetype,
  //     status: newstatus,
  //   };

  ///////Save Changes On click///////
  //   const saveEvent = () => {
  //     fetch(apiUrl + "/" + "manageCategories", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newSalesData),
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("Data sent Successfully", newSalesData);
  //           fetchData();
  //           //setNewinvoiceNum("");
  //           setMedicineId("");
  //           //handleClose(); // Close the modal here
  //         } else {
  //           console.log("Failed to send Data");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error", error);
  //       });
  //   };
  ///// Delete Event /////

  // const notify = () => {
  //   toast("Wow so easy!");
  // };

  //const notify = () => toast("Wow so easy!");

  //////Fetching data////
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
  ////// Sending invoiceParticulars to ViewDetailedSalesInvoicePage ////

  //////Sales Data finding//////
  // const [salesData, setSalesData] = useState([]);

  // useEffect(() => {
  //   const salesData = invoiceParticulars.filter(
  //     (item: any) => item.transactionType === "Sales"
  //   );
  //   setSalesData(salesData);
  // }, [invoiceParticulars]);
  // console.log("salesData", salesData);
  //////////////////SPFx//////////////



  const [SalesInvoices, setSalesInvoices] = useState([]);

  //2.
  const siteUrl = props.context.pageContext.web.absoluteUrl;
  const decodedListName = 'Invoices';
  const listName = decodeURIComponent(decodedListName);
  //const api = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&Select=ID,Title`;
  //console.log(api);
  //////// fetch data from Rest api

  const SalesInvoicesfetchingData = async () => {
    // const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,InvoiceNum,NameOfParty,Age,$filter=TransactionType eq Sales`;
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,InvoiceNum,NameOfParty,Age,Mobile,Date,Email,Address,TotalQuantity,TotalAllAmounts,TransactionType&$filter=TransactionType eq 'Sales'`;

    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (response.ok) {
        const data = await response.json();
        console.log("SalesInvoice data:", data.value);
        setSalesInvoices(data.value)
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
    SalesInvoicesfetchingData()
  }, [])
  /////////////////SPFx///////////////

  return (
    <div>
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3">
            <Link to="/sale-invoices/invoice/new">
              <Button
                variant="primary"
                className="py-2 px-4 "
              //   onClick={handleShow}
              >
                Add Slaes +
              </Button>
            </Link>
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
                  <th>S.NO</th>
                  <th>invoiceNum</th>
                  <th>Customer</th>
                  <th>Age</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Total Quantity</th>
                  <th>Total Amount</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {SalesInvoices.map((item: any) => (
                  <tr key={item.ID}>
                    <td>{item.ID}</td>
                    <td>{item.Title}</td>
                    <td>{item.NameOfParty}</td>
                    <td>{item.Age}</td>
                    <td>{item.Mobile}</td>
                    <td>{item.Date}</td>
                    <td>{item.Email}</td>
                    <td>{item.Address}</td>
                    <td>{item.TotalQuantity}</td>
                    <td>{item.TotalAllAmounts}</td>
                    <td>
                      <Link
                        to={`/sale-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link>
                      {/* <Link
                        to={`/sale-invoices/invoice/view/${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link> */}
                      {/* <Link
                        to={`/ViewDetailedSalesInvoicePage?invoiceNum=${item.invoiceNum}`}
                      >
                        {<MdRemoveRedEye />}
                      </Link> */}
                    </td>
                    <td className="text-primary">
                      <Link
                        to={`/sale-invoices/invoice/edit/${item.invoiceNum}`}
                      >
                        <BiEdit />
                      </Link>
                    </td>
                    <td
                      className="text-danger"
                    // onClick={() => deleteEvent(item.invoiceNum)}
                    //onClick={notify}


                    >

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
export default SalesInvoice;
