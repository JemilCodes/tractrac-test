import React, { useEffect, useState } from "react";
import "./dashboard.scss";

import Logo from "../../assets/img/logo.png";
import expand from "../../assets/img/expand.png";
import noti from "../../assets/img/noti.png";
import line from "../../assets/img/line.png";
import contrastLogo from "../../assets/img/contrast.png";

import { reactLocalStorage } from "reactjs-localstorage";

const Dashboard = () => {
  const [patientData, setPatientData] = useState();
  const [contrast, setContrast] = useState(
    reactLocalStorage.get("contrast", "light", true)
  );
  useEffect(() => {
    fetch(`http://localhost:5000/tratrac-health/api/v1/auth/isLoggedIn`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPatientData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleToggle = (id) => {
    console.log(id);
    document.documentElement.className = id;
    reactLocalStorage.set("contrast", id);
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
            <b>{patientData?.email || "loading..."}</b>
            <p>PATIENT</p>
          </div>
        </div>
        <div className="dash__main__greeting">
          <div className="dash__main__greeting__name">
            <b style={{ color: "#F80D38" }}>
              {patientData?.name || "loading..."}
            </b>
            <p className="dash__main__greeting__2">How are you doing?</p>
          </div>
          <div className="dash__main__greeting__switch">
            <img alt="contrast" src={contrastLogo} />
            <div
              className="switch"
              onClick={() => {
                if (contrast === "light") {
                  handleToggle("dark");
                  setContrast("dark");
                  return;
                }
                if (contrast === "dark") {
                  handleToggle("light");
                  setContrast("light");
                  return;
                }
              }}
            >
              <div
                style={{ left: contrast === "light" ? "0" : "20px" }}
                className="switch__circle"
              ></div>
            </div>
            <p>Apply Dark Theme</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
