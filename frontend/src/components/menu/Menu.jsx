import "./menu.scss";
import { useNavigate } from "react-router-dom";

const Menu = ({ Logo, name }) => {
  const navigate = useNavigate();
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
  return (
    <div style={{ cursor: "pointer" }} className="menu__cont">
      <img alt="logo" src={Logo} />
      <p
        style={{
          color: name === "Logout" ? "#f80d38" : "",
          fontWeight: name === "Logout" ? "bold" : "",
        }}
        onClick={() => {
          if (name === "Logout") {
            handleLogout();
          }
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default Menu;
