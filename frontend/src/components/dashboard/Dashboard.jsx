import React, { useEffect, useState } from "react";
import "./dashboard.scss";

import Logo from "../../assets/img/logo.png";
import expand from "../../assets/img/expand.png";
import noti from "../../assets/img/noti.png";
import line from "../../assets/img/line.png";
import contrast from "../../assets/img/contrast.png";

const Dashboard = () => {
  const [patientData, setPatientData] = useState();
  useEffect(() => {
    const handleAsync = async () => {
      const response = await fetch(
        `http://localhost:5000/tratrac-health/api/v1/auth/isLoggedIn`,
        {
          credentials: "include",
        }
      );
      console.log(response);
      setPatientData(response);
    };
    handleAsync();
  }, []);
  const handleToggle = (id) => {
    document.documentElement.className = id;
  };
  return (
    <div className="dash__container">
      <div className="dash__side">
        <div className="dash__side__header">
          <div className="dash__side__header__logo">
            <img alt="logo" src={Logo} />
            <p>Iwosan</p>
          </div>
          <img alt="expand" src={expand} />
        </div>
      </div>
      <div className="dash__main">
        <div className="dash__main__header">
          <input type="search" className="dash__main__header__search"></input>
          <div className="dash__main__header__noti">
            <img alt="noti" src={noti} />
          </div>
          <img alt="line" src={line} />
          <div className="dash__main__header__circle">
            <div className="dash__main__header__circleg"></div>
          </div>
          <div className="dash__main__header__title">
            <b>{patientData?.email}</b>
            <p>PATIENT</p>
          </div>
        </div>
        <div className="dash__main__greeting">
          <div className="dash__main__greeting__name">
            <b style={{ color: "#F80D38" }}>{patientData?.name}</b>
            <p className="dash__main__greeting__2">How are you doing?</p>
          </div>
          <div className="dash__main__greeting__switch">
            <img alt="contrast" src={contrast} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="switch">
                <div className="switch_circle"></div>
                <div className="switch_line"></div>
              </div>
              <p>Apply Dark Theme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
