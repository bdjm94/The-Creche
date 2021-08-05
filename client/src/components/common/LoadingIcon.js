import React from "react";

import loading from "../../img/loadingIcon.gif";

import "./loadingIcon.scss";

const Loading = () => {
  return (
    <div className="Loading">
      <img className="indicator" src={loading} alt="Loading..." />
    </div>
  );
};

export default Loading;