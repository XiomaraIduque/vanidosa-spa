import DashHeader from "../components/DashHeader";
import logofull from "../assets/img/logo.svg";
import DashMenu from "../components/DashMenu";
import React, { useState } from "react";
import '../assets/css/dash-view.css';

function DashHome() {

  return (
    <div className="content-dash">
      <DashMenu />
      <div className="container-main">
        <DashHeader />
        <div className="content-main">
          <div className="container-view">
            <img className="main-logo" src={logofull} alt="" />
          </div>
        </div>
      </div>
      <script src="../assets/js/funcionesClientes.js"></script>
    </div>
  );
}

export default DashHome;
