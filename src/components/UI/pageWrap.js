import React from "react";

const PageWrap = ({ children }) => {
  return (
    <section
      style={{
        display: "flex",
        width: "95%",
        height: "100%",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {children}
    </section>
  );
};

export default PageWrap;
