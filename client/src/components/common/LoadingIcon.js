import React from "react";

import loading from "../../img/loadingIcon.gif";

import "./LoadingIcon.scss";

const Loading = () => {
  return (
    <div className="loading">
      <img className="indicator" src={loading} alt="Loading..." />
    </div>
  );
};

export default Loading;