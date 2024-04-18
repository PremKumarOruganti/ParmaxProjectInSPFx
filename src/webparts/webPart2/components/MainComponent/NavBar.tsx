/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {
  BsThreeDots,
  BsFillBellFill,
  BsFillMoonFill,
  BsFillFileTextFill,
} from "react-icons/bs";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { AiOutlineShoppingCart, AiFillHeart } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { useNavigate, NavLink } from "react-router-dom";

import "./Index.css";
const userName = new URLSearchParams(location.search).get("userName");

interface modeProps {
  sendModeProps: (darkMode: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const NavBar = ({ sendModeProps }: modeProps) => {
  const [userName1, setUserName1] = useState(false);
  useEffect(() => {
    if (userName) {
      setUserName1(true);
    } else {
      setUserName1(false);
    }
  }, [userName]);

  const [darkMode, setDarkMode] = useState(false);
  const Navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const toggleColorMode = () => {
    setDarkMode(!darkMode);
    sendModeProps(darkMode);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const logOutEvent = () => {
    Navigate("/firstHomePage");
  };

  const linkStyle = {
    color: darkMode ? "white" : "black",
  };

  return (
    <>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        data-bs-theme={darkMode ? "dark" : "light"}
        className="p-0 pb-2"
      >
        <Container fluid className="NavShadow px-5">
          <NavLink
            to="/"
            className="mr-4 navbar-brand active-link"
            style={linkStyle}
          >
            PharmX
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" role="navigation">
            <Nav className="me-auto p-1">
              {userName1 && (
                <NavLink
                  className="mr-4 active-link"
                  style={linkStyle}
                  to="/manageManageCategory"
                //activeClassName="active-link"
                >
                  Manage Admin
                </NavLink>
              )}
              <NavLink
                className="mr-4  active-link pr-5 pl-3"
                style={linkStyle}
                to="/StockDetails"
              //activeClassName="active-link"
              >
                Home
                {/* <Link to="/stock-details">Home</Link> */}
              </NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <NavLink
                className="mr-4 active-link"
                style={linkStyle}
                to="/ManageCategory"
              //activeClassName="active-link"
              >
                Category
              </NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <NavLink
                className="mr-4 active-link"
                style={linkStyle}
                to="/Medicines"
              //activeClassName="active-link"
              >
                Medicines
              </NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <NavLink
                className="mr-4 active-link"
                style={linkStyle}
                to="/SalesInvoice"
              //activeClassName="active-link"
              >
                Sale Invoices
              </NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <NavLink
                className="mr-4 active-link"
                style={linkStyle}
                to="/PurchaseInvoice"
              //activeClassName="active-link"
              >
                Purchase Invoices
              </NavLink>
              &nbsp;
              {/* <NavLink
                className="mr-4 active-link"
                style={linkStyle}
                to="/"
                //activeClassName="active-link"
              >
                Home
              </NavLink> */}
            </Nav>
            <div className="ml-auto">
              <span onClick={toggleColorMode}>
                {darkMode ? (
                  <FiSun className="text-white" />
                ) : (
                  <BsFillMoonFill />
                )}
              </span>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <NavDropdown
              title={<BsThreeDots size={30} />}
              id="basic-nav-dropdown"
              className=" custom-dropdown"
            >
              <div className="custom-dropdown-menu dropdown-menu-right ">
                <NavDropdown.Item href="#action/3.1" className="py-0">
                  <CgProfile /> &nbsp; Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" className="py-0">
                  <AiOutlineShoppingCart /> &nbsp; Orders
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" className="py-0">
                  <AiFillHeart /> &nbsp; Wishlist
                </NavDropdown.Item>
                <NavDropdown.Item className="py-0">
                  <BsFillBellFill /> &nbsp; Notification
                </NavDropdown.Item>
                {userName1 && (
                  <NavDropdown.Item
                    className="py-0 active-link"
                    as={NavLink}
                    to="/manageManageCategory"
                  //activeClassName="active-link"
                  >
                    <GrUserAdmin /> &nbsp; Admin
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item
                  className="py-0 active-link"
                  as={NavLink}
                  to="/billing"
                //activeClassName="active-link"
                >
                  <BsFillFileTextFill /> &nbsp; Billing
                </NavDropdown.Item>
                <NavDropdown.Item className="py-0">
                  <CgLogOut /> <span onClick={logOutEvent}>Log out</span>
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
