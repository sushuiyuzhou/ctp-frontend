import React from "react";

const InfoGrid = ({ title, ctn }) => {
  return (
    <>
      <div>{title}</div>
      <div>
        <ul>
          {Object.entries(ctn).map(([key, val]) => (
            <li key={key}>
              {key}:{val}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default InfoGrid;
