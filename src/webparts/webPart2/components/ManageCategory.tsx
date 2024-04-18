/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
//import NavBar from "./NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

//1.
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
//import { sp } from "@pnp/sp";


const ManageCategory = (props: any) => {

  console.log("props.context", props.context);
  const [spData, setSpData] = useState([]);

  //////Model/////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showEdit, setShowEdit] = useState(false);
  //////

  console.log(setShowEdit)

  const [formData, setFormData] = useState({
    //id: null,
    Title: '',
    Status: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  console.log('formData2', formData);

  //const [exitStingData, setExitStingData] = useState(null);

  // const [manageCategory, setManageCategory] = useState([]);
  //const apiUrl = "http://localhost:5000";
  //2.
  const siteUrl = props.context.pageContext.web.absoluteUrl;
  const decodedListName = 'ManageCategories';
  const listName = decodeURIComponent(decodedListName);
  const api = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&Select=ID,Title`;
  console.log("API23", api);

  //////// fetch data from Rest api

  /////////SPFx/////////
  const fetchData = async () => {


    //const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&`
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$select=Title,ID,Status`;

    try {
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

      if (response.ok) {
        const data = await response.json();
        console.log("service layer data:", data.value);
        setSpData(data.value)

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

  console.log("ManageCategoryData", spData);



  async function saveEvent(EditedformData: any) {
    if (showEdit) {
      const siteUrl = props.context.pageContext.web.absoluteUrl;
      const listName = "ManageCategories";
      const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${EditedformData.ID})`;

      const headers = {
        "Content-Type": "application/json",
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*"
      };

      const itemData = {
        Title: EditedformData.Title,
        Active: EditedformData.Active
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
    } else {
      const siteUrl = props.context.pageContext.web.absoluteUrl;
      const listName = 'ManageCategories';
      const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;

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
        fetchData()
      } else {
        throw new Error(response.statusText);
      }
    }
  }


  /////// Delete Event in SPFx ////////


  const deleteEvent = async (genreId: any) => {
    const siteUrl = props.context.pageContext.web.absoluteUrl;
    const listName = "ManageCategories";
    const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items(${genreId})`;

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
  };





  ///// Posting in SPFx /////




  /////////SPFx/////////



  const handleShow = () => {
    setShow(true);
    setShowEdit(false);
    setFormData({
      //id: null,
      Title: "",
      Status: "",
    });
  };

  //////Edit Event/////
  /////EditEvent in SPFx/////
  const editEvent = (editAllData: any) => {
    setShow(true);
    setShowEdit(true);
    setFormData(editAllData);
  };



  return (
    <div>
      {/* <NavBar /> */}
      <Container fluid className="p-0 mt-2">
        <Row>
          <Col className="d-flex justify-content-end mr-3">
            <Button
              variant="primary"
              className="py-2 px-2"
              onClick={handleShow}
            >
              Category +
            </Button>
            {/* Categoty Model */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {showEdit ? "Edit Category" : "New Category"}
                </Modal.Title>
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
                      name="Title"
                      value={formData.Title}
                      onChange={(e) => handleChange(e)}
                    />
                  </Col>
                  <Col md={6}>
                    <select
                      className="form-control"
                      name="Status"
                      value={formData.Status}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="Choose..">Choose..</option>
                      <option value={"Active"}>Active</option>
                      <option value={"Inactive"}>Inactive</option>
                    </select>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  <span onClick={() => saveEvent(formData)}>
                    {showEdit ? "Update" : "Save"}
                  </span>
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
                  <th>Id1</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {/* <tbody id="categotyData"> */}
              <tbody>
                {spData.map((eachData: any) => (
                  <>
                    <tr key={eachData.ID}>
                      <td>{eachData.ID}</td>
                      <td>{eachData.Title}</td>
                      <td>{eachData.Status}</td>
                      <td
                        className="text-primary"
                        onClick={() => editEvent(eachData)}
                      >
                        {<BiEdit />}
                      </td>
                      <td
                        className="text-danger"
                        onClick={() => deleteEvent(eachData.ID)}
                      >
                        {<AiFillDelete />}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
            {/* <Button variant="secondary"
              onClick={postData}
            >ADD</Button> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default ManageCategory;
