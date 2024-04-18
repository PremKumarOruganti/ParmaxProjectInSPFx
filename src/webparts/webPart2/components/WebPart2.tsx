/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable-next-line react/self-closing-comp*/
import * as React from "react";
// import styles from "./WebPart2.module.scss";
import type { IWebPart2Props } from "./IWebPart2Props";
// import MainApp from "./MainComponent/MainApp";
import "./Styles.css";
import SignIn from "./MainComponent/SignIn";
import { HashRouter, Route, Routes } from "react-router-dom";
//import SignUp from "./MainComponent/SignUp";
import Home from "./MainComponent/Home";
import NavBar from "./MainComponent/NavBar";
//import StackDetailsGraph from "./MainComponent/StackDetails";
import ManageCategory from "./ManageCategory";
import Medicines from "./MainComponent/MedicinesPage";
import SalesInvoice from "./MainComponent/SaleInvoices";
import PurchaseInvoice from "./MainComponent/PurchaseInvoices";
import EditAndNewSalesInvoice from "./MainComponent/EditAndNewSalesInvoice";
import EditAndNewPurchaseInvoice from './MainComponent/EditAndNewPurchaseInvoice'
import Server from "./Server";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default class WebPart2 extends React.Component<IWebPart2Props, {}> {
  public render(): React.ReactElement<IWebPart2Props> {
    const {
      //   description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      // userDisplayName,
      context,
    } = this.props;

    //const [dataFromNav, setDataFromNav] = React.useState(true);
    const handelModeProps = (darkMode: boolean) => {
      //setDataFromNav(darkMode);
    };
    return (
      <>
        {/* <ToastContainer /> */}
        <Server context={context} />
        {/* <SignIn /> */}
        <HashRouter>
          <NavBar sendModeProps={handelModeProps} />
          <Routes>
            <Route path="/" Component={SignIn} />
            {/* <Route path="/signup" Component={SignUp} /> */}
            <Route path="/Home" Component={Home} />
            {/* <Route path="/StockDetails" Component={StackDetailsGraph} /> */}
            <Route
              path="/ManageCategory"
              element={<ManageCategory context={context} />}
            />
            <Route path="/Medicines" element={<Medicines context={context} />} />
            <Route path="/SalesInvoice" element={<SalesInvoice context={context} ToastContainer />} />
            <Route path="/PurchaseInvoice" element={<PurchaseInvoice context={context} />} />
            <Route
              path="/sale-invoices/invoice/new"
              element={<EditAndNewSalesInvoice context={context} />}
            />
            <Route path="/purchase-invoices/invoice/new" element={<EditAndNewPurchaseInvoice context={context} />}></Route>
          </Routes>
        </HashRouter>
      </>
    );
  }
}
