import { useState } from "react";
import "./menu.scss";
import { useNavigate } from "react-router-dom";

const Menu = ({ Logo, name }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    setIsLoading(true);
    fetch(`http://localhost:5000/tratrac-health/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoading(false);
        if (result === "loggedOut") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <div
      style={{
        cursor: "pointer",
        backgroundColor: name === "Overview" ? "#DFE0E2" : "",
      }}
      className="menu__cont"
    >
      <img alt="logo" src={Logo} />
      <p
        style={{
          color:
            name === "Logout" ? "#f80d38" : name === "Overview" && "#100DB1",
          fontWeight: name === "Logout" && "900",
          ...(name === "Overview" && { fontWeight: "900" }),
        }}
        onClick={() => {
          if (name === "Logout") {
            handleLogout();
          }
        }}
      >
        {name === "Logout" ? (isLoading ? "Loading..." : name) : name}
      </p>
    </div>
  );
};

export default Menu;
