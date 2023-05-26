import React, { useEffect, useState } from "react";
import "./dashboard.scss";

import Logo from "../../assets/img/logo.png";
import expand from "../../assets/img/expand.png";
import expandDark from "../../assets/img/expandDark.png";
import noti from "../../assets/img/noti.png";
import line from "../../assets/img/line.png";
import appoint from "../../assets/img/appoint.png";
import chat from "../../assets/img/chat.png";
import mon from "../../assets/img/mon.png";
import patient from "../../assets/img/patient.png";
import call from "../../assets/img/call.png";
import overview from "../../assets/img/overview.png";
import overviewDark from "../../assets/img/overviewDark.png";
import patientDark from "../../assets/img/patientDark.png";
import chatDark from "../../assets/img/chatDark.png";
import settingDark from "../../assets/img/settingDark.png";
import monDark from "../../assets/img/monDark.png";
import setting from "../../assets/img/setting.png";
import appointDark from "../../assets/img/appointDark.png";
import pathology from "../../assets/img/pathology.png";
import pathologyDark from "../../assets/img/pathologyDark.png";

import diagnostic from "../../assets/svg/diagnostic.png";
import patientLogo from "../../assets/svg/patient.png";
import health from "../../assets/svg/health.png";
import range from "../../assets/svg/range.png";
import pandemic from "../../assets/svg/pandemic.png";
import appointment from "../../assets/svg/appointment.png";

import diagnosticDark from "../../assets/svg/diagnostic-dark.png";
import patientLogoDark from "../../assets/svg/patient-dark.png";
import healthDark from "../../assets/svg/health-dark.png";
import rangeDark from "../../assets/svg/range-dark.png";
import pandemicDark from "../../assets/svg/pandemic-dark.png";
import appointmentDark from "../../assets/svg/appointment-dark.png";

import mobileLogo from "../../assets/img/mobileLogo.png";

import { BiSearch } from "react-icons/bi";

import Menu from "../menu/Menu";

import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { ImBrightnessContrast } from "react-icons/im";
import Doctor from "./component/Doctor";

const Dashboard = () => {
  const [patientData, setPatientData] = useState();
  const navigate = useNavigate();
  const [contrast, setContrast] = useState(
    reactLocalStorage.get("contrast", "light", true)
  );
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/tratrac-health/api/v1/auth/isLoggedIn`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "false") {
          navigate("/login");
        }
        setPatientData(result);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
      });
  }, []);
  const handleToggle = (id) => {
    document.documentElement.className = id;
    reactLocalStorage.set("contrast", id);
  };
  const menu = [
    {
      name: "Overview",
      Logo: contrast === "light" ? overview : overviewDark,
    },
    {
      name: "Appointment",
      Logo: contrast === "light" ? appoint : appointDark,
    },
    {
      name: "Doctors",
      Logo: contrast === "light" ? patient : patientDark,
    },
    {
      name: "Pathology Results",
      Logo: contrast === "light" ? pathology : pathologyDark,
    },
    {
      name: "Chats",
      Logo: contrast === "light" ? chat : chatDark,
    },
  ];
  const menu2 = [
    {
      name: "Settings",
      Logo: contrast === "light" ? setting : settingDark,
    },
    {
      name: "Logout",
      Logo: contrast === "light" ? mon : monDark,
    },
  ];
  const MenuItems = menu.map(({ Logo, name }) => {
    return <Menu Logo={Logo} name={name} key={name} />;
  });

  const MenuItems2 = menu2.map(({ Logo, name }) => {
    return <Menu Logo={Logo} name={name} key={name} />;
  });

  const handleLogout = () => {
    fetch(`http://localhost:5000/tratrac-health/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result === "loggedOut") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const MenuItemsMobile = menu.map(({ Logo, name }) => {
    return (
      <div
        key={name}
        style={{
          marginBottom: name === "Chats" && "100px",
          backgroundColor: name === "Overview" && "#D3D3D3",
        }}
        className="mobile__side__li_1"
      >
        <img alt={name} src={Logo} />
      </div>
    );
  });

  const MenuItems2Mobile = menu2.map(({ Logo, name }) => {
    return (
      <img
        alt={name}
        src={Logo}
        key={name}
        className="mobile__side__li_2"
        onClick={() => {
          if (name === "Logout") {
            handleLogout();
          }
        }}
      />
    );
  });

  return (
    <div className="dash__container">
      {expanded && (
        <div className="dash__side">
          <div className="dash__side__header">
            <div className="dash__side__header__logo">
              <img alt="logo" src={Logo} />
              <p>Iwosan</p>
            </div>
            {contrast === "light" && (
              <img
                alt="expand"
                src={expand}
                style={{ cursor: "pointer" }}
                onClick={() => setExpanded(false)}
              />
            )}
            {contrast === "dark" && (
              <img
                alt="expand"
                src={expandDark}
                style={{ cursor: "pointer" }}
                onClick={() => setExpanded(false)}
              />
            )}
          </div>
          {MenuItems}
          <div className="side__acount">
            <b>Account</b>
          </div>
          {MenuItems2}
          <div className="side__footer">
            <div className="side__footer__1">
              <img alt="call" src={call} />
            </div>

            <div className="side__footer__2">
              <b>Emergency HotLines:</b>
              <div>
                <p>+234 92 928 2891</p>
                <p>+234 60 621 2098</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {expanded === false && (
        <div className="mobile__side">
          <div className="mobile__side__header">
            <img alt="mobileLogo" src={mobileLogo} />
          </div>
          {MenuItemsMobile}
          {MenuItems2Mobile}
          {contrast === "light" && (
            <img
              alt="expand"
              style={{ cursor: "pointer" }}
              src={expand}
              onClick={() => setExpanded(true)}
            />
          )}
          {contrast === "dark" && (
            <img
              alt="expand"
              src={expandDark}
              style={{ cursor: "pointer" }}
              onClick={() => setExpanded(true)}
            />
          )}
          <div className="mobile__side__footer">
            <div>
              <img alt="call" src={call} />
            </div>
          </div>
        </div>
      )}

      <div style={{ width: !expanded && "95%" }} className="dash__main">
        <div className="dash__main__header">
          <div className="dash__main__header__search__cont">
            <BiSearch />
            <input
              type="search"
              className="dash__main__header__search"
              placeholder="Search pathology results"
            />
          </div>

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
            <ImBrightnessContrast
              style={{ color: contrast === "dark" ? "white" : "" }}
              className="contrast"
            />
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
                style={{ left: contrast === "light" ? "0" : "15px" }}
                className="switch__circle"
              ></div>
            </div>
            <p>Apply Dark Theme</p>
          </div>
        </div>
        <div className="dash__main__content">
          <div className="dash__main__contnent__1">
            <div className="dash__main__contnent__1__graph">
              <div>
                <img
                  alt="div"
                  src={contrast === "light" ? diagnostic : diagnosticDark}
                />
              </div>
              <div>
                <img
                  alt="div"
                  src={contrast === "light" ? patientLogo : patientLogoDark}
                />
              </div>
              <div>
                <img
                  alt="div"
                  src={contrast === "light" ? health : healthDark}
                />
              </div>
            </div>
            <div className="dash__main__contnent__1__map">
              <div>
                <img
                  alt="div"
                  src={contrast === "light" ? pandemic : pandemicDark}
                />
              </div>
              <div>
                <img alt="div" src={contrast === "light" ? range : rangeDark} />
              </div>
            </div>
            <div className="dash__main__contnent__1__report">
              <div className="dash__main__contnent__1__report__cont">
                <div className="dash__main__contnent__1__report__header">
                  <b>Doctor</b>
                  <div className="dash__main__contnent__1__report__header__cont">
                    <div className="dash__main__contnent__1__report__header__input">
                      <BiSearch
                        style={{ color: "var(--input-color)", margin: "10px" }}
                      />
                      <input
                        type="saerch"
                        placeholder="Search pathology results"
                      />
                    </div>
                    <div className="dash__main__contnent__1__report__header__buttons">
                      <div
                        style={{ backgroundColor: "#f80d38", color: "white" }}
                        className="report__header__buttons__1"
                      >
                        <b style={{ color: "white" }}>ALL</b>
                      </div>
                      <div className="report__header__buttons__1">
                        <b>MEN</b>
                      </div>
                      <div
                        style={{ borderRight: "none" }}
                        className="report__header__buttons__1"
                      >
                        <b>WOMAN</b>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="report__main__header">
                  <div className="report__main__header__1">
                    <b>name</b>
                  </div>
                  <div className="report__main__header__2">
                    <b>Role</b>
                  </div>
                  <div className="report__main__header__3">
                    <b>booked appointments</b>
                  </div>
                  <div className="report__main__header__4">
                    <b>chat</b>
                  </div>
                  <div className="report__main__header__5">
                    <b>book new appointments</b>
                  </div>
                </div>
                <Doctor contrast={contrast} expanded={expanded} />
                <Doctor contrast={contrast} expanded={expanded} />
                <Doctor picked={true} contrast={contrast} expanded={expanded} />
                <div className="report__main__button">
                  <b>GO TO DOCTORS</b>
                </div>
              </div>
            </div>
          </div>
          <div className="dash__main__contnent__2">
            <img
              alt={appointment}
              src={contrast === "light" ? appointment : appointmentDark}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
