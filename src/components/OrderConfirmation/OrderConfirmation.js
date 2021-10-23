import React from "react";

export default (props) => {
  return (
    <React.Fragment>
      <p>{props.order.total}</p>
    </React.Fragment>
  );
};
