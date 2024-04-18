/* eslint-disable @typescript-eslint/no-floating-promises */
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
import * as React from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

const Medicines = (props: any) => {
  const [spMedicineData, SetspMedicineData] = useState([]);
  const [categories, setCategories] = useState([])
  ////////////////////SPFx////////////////


  console.log("props.context", props.context);
  //const [spData, setSpData] = useState([]);

  //2.

  // const api = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&Select=ID,Title`;
  // console.log(api);
  //////// fetch data from Rest api

  const fetchData = async () => {
    const siteUrl = props.context.pageContext.web.absoluteUrl;
    // const decodedListName = 'ManageMedicines';
    const listName = 'ManageMedicines';

    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,Description,Price,SelectStatus,ManageCategories/Id,ManageCategories/Title&$expand=ManageCategories`;



    console.log("apiUrl456777", apiUrl);

    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (response.ok) {
        const data = await response.json();
        console.log("Medicines Data:", data.value);
        SetspMedicineData(data.value)
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

  const medicinfetchData = async () => {
    const siteUrl = props.context.pageContext.web.absoluteUrl;
    // const decodedListName = 'ManageMedicines';
    const listName = 'ManageCategories';
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID`;



    console.log("apiUrl456777", apiUrl);

    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (response.ok) {
        const data = await response.json();
        console.log("Medicines Data:", data.value);
        setCategories(data.value)
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
    fetchData();
    medicinfetchData();
  }, [])
  console.log("spMedicineData", spMedicineData);


  ////////////////////SPFx////////////////
  // //   //////Model/////
  // //   const [show, setShow] = useState(false);
  // //   const handleClose = () => setShow(false);
  // //   const handleShow = () => setShow(true);
  // //   ////
  // //////Model/////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showEdit, setShowEdit] = useState(false);
  // //////
  // const [categorty, setCategories] = useState([]);
  const [formData, setFormData] = useState({

    Title: "",
    Description: "",
    ManageCategoriesId: 0,
    SelectStatus: "",
    Price: 0,
  });


  // //////////////////
  const editEvent = (editAllData: any) => {
    setShow(true);
    setShowEdit(true);
    setFormData(editAllData);
  };


  ////Delete Event in SPFx////
  const deleteEvent = async (IdForDelete: any) => {
    const siteUrl = props.context.pageContext.web.absoluteUrl;
    const listName = "ManageMedicines";
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${IdForDelete})`;

    const headers = {
      "X-HTTP-Method": "DELETE",
      "IF-MATCH": "*",
    };

    const spHttpClientOptions = {
      headers: headers,
    };

    const response = await props.context.spHttpClient.post(
      apiUrl,
      SPHttpClient.configurations.v1,
      spHttpClientOptions
    );

    if (response.ok) {
      fetchData();
      return "Genre deleted successfully.";
    } else {
      throw new Error(response.statusText);
    }
  }

  const handleChange = (event: any) => {
    // const { name, value } = event.target;

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  console.log('formDataMedicines', formData);

  ////////////////POST IN SPFx///////// formData

  async function saveEvent(EditedFormData: any) {
    if (showEdit) {
      const siteUrl = props.context.pageContext.web.absoluteUrl;
      const listName = "ManageMedicines";
      const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${EditedFormData.ID})`;
      const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*"
      };
      const itemData = {
        Title: EditedFormData.Title,
        Description: EditedFormData.Description,
        Price: EditedFormData.Price,
        SelectStatus: EditedFormData.SelectStatus,
        medicineName: EditedFormData.medicineName
      };
      const spHttpClientOptions = {
        body: JSON.stringify(itemData),
        headers: headers,
      };
      const response = await props.context.spHttpClient.post(
        apiUrl,
        SPHttpClient.configurations.v1,
        spHttpClientOptions
      );
      if (response.ok) {
        fetchData()
        return true;
      } else {
        throw new Error(response.statusText);
      }

    }
    else {
      alert();
      const siteUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'ManageMedicines';
      const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;
      console.log('apiUrlMedicine', apiUrl);

      const headers = {
        'Content-Type': 'application/json',
      };
      const spHttpClientOptions = {
        body: JSON.stringify(formData),
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
  }


  ////////////////POST IN SPFx/////////
  // ////////////
  const addMedicineEvent = () => {
    setShow(true);
    setShowEdit(false);
    setFormData({
      //id: null,
      Title: "",
      Description: "",
      ManageCategoriesId: 0,
      SelectStatus: "",
      Price: 0,
    });
  }


  return (
    <div>
      {/* <NavBar /> */}
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3 h4">
            <Button
              onClick={addMedicineEvent}
            >Medicine +</Button>
            <Modal
              show={show} onHide={handleClose}
            >
              <Modal.Header>
                <Modal.Title>
                  {showEdit ? "Edit Medicine" : "New Medicine"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>Medicine Name</Col>
                  <Col md={6}>Category</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Enter Medicine Name"
                      className="form-control"
                      name="Title"
                      value={formData.Title}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col md={6}>
                    {/* <select
                      className="form-control"
                      name="Title"
                      value={formData.Title}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Select</option>
                      {
                        // Title &&
                        //   categorty.length > 0 &&
                        spMedicineData.map((eachOption: any) => (
                          <>
                            <option key={eachOption.ID}>
                              {eachOption.SelectCategoty}
                            </option>
                          </>
                        ))}
                    </select> */}
                    <select
                      className="form-control"
                      name="ManageCategoriesId"
                      value={formData.ManageCategoriesId}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Select</option>
                      {categories.map((eachOption: any) => (
                        <option key={eachOption.ID} value={eachOption.ID}>
                          {eachOption.Title} {/* Accessing Title property */}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>Description</Col>
                  <Col md={6}>Price</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      placeholder="Enter Description"
                      className="form-control"
                      name="Description"
                      value={formData.Description}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      className="form-control"
                      name="Price"
                      value={formData.Price}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>Status</Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <select
                      className="form-control"
                      name="SelectStatus"
                      value={formData.SelectStatus}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value={'Select'}>Select</option>
                      <option value={'Active'}>Active</option>
                      <option value={'Inactive'}>Inactive</option>
                    </select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  <span
                    onClick={() => saveEvent(formData)}
                  >
                    {showEdit ? "Update" : "Save"}
                  </span>
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col className="pt-2">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id4</th>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Status</th>

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {spMedicineData.map((item: any) => (
                  <tr key={item.ID}>
                    <td>{item.ID}</td>
                    <td>{item.Title}</td>
                    <td>{item.ManageCategories.Title}</td>
                    <td>{item.Description}</td>
                    <td>{item.Price}</td>
                    <td>{item.SelectStatus}</td>



                    <td
                      className="text-primary"
                      onClick={() => editEvent(item)}
                    >
                      <BiEdit />
                    </td>
                    <td
                      className="text-danger"
                      onClick={() => deleteEvent(item.ID)}
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
export default Medicines;
