import React from "react";
import CountUp from "react-countup";

export default function Counter({ number, title }) {
  return (
    <div className="number">
      <CountUp duration={7} className="counterTitle" end={number} enableScrollSpy={true} />
      {/* <span className="counterTitle">{title}</span> */}
    </div>
  );
}