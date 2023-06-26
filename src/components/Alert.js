import React from "react";

const Alert = (props) => {
  const { alert } = props;
  return (
    <div style={{ height: '50px' }}>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        {alert.message}
      </div>}
    </div>
  );
};

export default Alert;
