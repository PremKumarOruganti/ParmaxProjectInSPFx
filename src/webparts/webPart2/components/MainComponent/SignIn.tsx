/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { useState, useEffect } from "react";
//import { useHistory } from "history";
//import { useHistory } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

//import imgBc from "./../assets/Images.ts/img1.jpg";
//import imgBc from "./img1.jpg";

// interface User {
//   userName: string;
//   password: string;
//   role: string;
//   // Other properties if any
// }

const SignIn = () => {
  //const history = useHistory();
  const [IuserName, setUserName] = useState("");
  const [Ipassword, setPassword] = useState("");
  //const [errordisplay, setErrorDisplay] = useState(false);

  //const Navigate = useNavigate();
  const apiUrl = "http://localhost:5000";
  //const [apiUserName, setApiUserName] = useState<User[]>([]);

  useEffect(() => {
    fetch(apiUrl + "/registrationData")
      .then((response) => response.json())
      //.then((data) => setApiUserName(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  // const validateUser = () => {
  // const userExists = apiUserName.filter(
  //   (item) => item.userName === IuserName && item.password === Ipassword
  // );
  // if (userExists.length > 0) {
  //   const user = userExists[0];
  //   alert("User exists");
  //   if (user.role === "Admin") {
  //      Navigate(`/?userName=${IuserName}`);
  //   } else if (user.role === "Employee") {
  //      Navigate("/");
  //   } else {
  //     setErrorDisplay(true);
  //   }
  // } else {
  //   setErrorDisplay(true);
  // }
  //Redirect to SignUp page after successful login
  //history.push("/signup");
  //};
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const imageSrc: string = require("./img1.jpg");

  return (
    <div className="PageWidth">
      <Form>
        <Container fluid p-0>
          <Row style={{ backgroundColor: "#E2CF81" }}>&nbsp;</Row>

          <Row>
            <Col md={2} style={{ backgroundColor: "#E2CF81" }}>
              &nbsp;
            </Col>
            <Col md={8} className="p-0">
              <Container fluid>
                <Row>
                  <Col md={6} className="p-0">
                    <img
                      src={imageSrc}
                      className="rounded"
                      alt="Cinque Terre"
                      id="img"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Col>

                  <Col md={6} id="secondBgColor">
                    <Container fluid>
                      <Row className="p-3">&nbsp;</Row>
                      <Row className="font-weight-bolder">
                        <Col md={12} className="text-center">
                          <h2>Welcome to the Pharmacy</h2>
                        </Col>
                      </Row>
                      <Row className="font-weight-bolder p-1">
                        <Col md={12} className="text-center">
                          <h6>
                            Always there for you to giving your Health a new
                            Lift
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="text-center p-1">
                          <input
                            className="form-control"
                            placeholder="Enter User Name"
                            type="text"
                            value={IuserName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="text-center p-1">
                          <input
                            className="form-control"
                            placeholder="Enter Password"
                            type="Password"
                            value={Ipassword}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12} className="text-center">
                          &nbsp;
                        </Col>
                      </Row>
                      {/* {errordisplay && (
                        <label className="text-danger">
                          Please enter correct User name and Password
                        </label>
                      )} */}
                      <Row>
                        <Col md={12} className="text-center py-3">
                          <Button
                            type="button"
                            className="btn btn-primary w-75 h-75 border-0"
                            // id="btnColor"
                            //onClick={validateUser}
                          >
                            <Link to="/Home" className="text-danger">
                              <p>Login</p>
                            </Link>
                          </Button>
                        </Col>
                      </Row>
                      <Row className="text-center font-weight-bolder p-3 mb-1">
                        <Col md={12}>
                          Not a member?
                          {/* <Link to="/signUpPage">Register Now</Link> */}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col md={2} style={{ backgroundColor: "#E2CF81" }}>
              &nbsp;
            </Col>
          </Row>

          <Row style={{ backgroundColor: "#E2CF81" }}>&nbsp;</Row>
        </Container>
      </Form>
    </div>
  );
};

export default SignIn;
