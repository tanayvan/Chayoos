import React from "react";
import tableGrey from "../Config/table.svg";
import tableGreen from "../Config/tableGreen.svg";
import tableOutline from "../Config/tableOutline.svg";

export default function Table({ reserved, onClick, number }) {
  return (
    <div
      onClick={() => {
        if (!reserved) {
          onClick(number);
        }
      }}
      style={{
        position: "relative",
        cursor: reserved ? "not-allowed" : "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          height: "100%",
          width: "100%",
          // backgroundColor: "red",
        }}
      >
        <div
          style={{
            color: "white",
            position: "absolute",
            bottom: "45%",
            left: "50%",
          }}
        >
          {number}
        </div>
      </div>
      <img src={reserved ? tableGrey : tableGreen} />
    </div>
  );
}