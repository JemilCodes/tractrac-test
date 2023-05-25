import React from "react";

import chat from "../../../assets/img/chat.png";
import chatDark from "../../../assets/img/chatDark.png";
import { BsThreeDots } from "react-icons/bs";

const Doctor = ({ picked, contrast, expanded }) => {
  return (
    <div className="report__main__content">
      <div className="report__main__content__1">
        <div className="report__main__content__1__circle"></div>
        <b>Dr. Ibrahim yakubu</b>
      </div>
      <div className="report__main__content__2">
        <b>Heart Surgeon</b>
      </div>
      <div
        style={{
          marginRight: !expanded && "3%",
        }}
        className="report__main__content__3"
      >
        <b>66</b>
      </div>
      <div className="report__main__content__4">
        {contrast === "light" && <img alt="chat" src={chat} />}
        {contrast === "dark" && <img alt="chat" src={chatDark} />}
      </div>
      <div
        className="report__main__content__5"
        style={{
          backgroundColor: picked === true && "#100DB1",
          marginRight: picked === true && "8.4%",
          border: picked === true && "none",
        }}
      >
        {!picked && <b>Book</b>}
        {picked && <div>Booked</div>}
      </div>
      <div className="report__main__content__6">
        <BsThreeDots
          style={{ color: "var(--input-color)", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Doctor;
