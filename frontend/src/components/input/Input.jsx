import "./input.scss";
const Input = ({ title, type, refId }) => {
  return (
    <div
      style={{ marginBottom: type === "password" && "5px" }}
      className="input__container"
    >
      <p>{title}</p>
      <input type={type} ref={refId}></input>
    </div>
  );
};

export default Input;
