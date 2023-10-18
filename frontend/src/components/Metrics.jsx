import React from "react";

const Metrics = ({ data }) => {
  const renderMetric = (label, value) => (
    <p>
      {label}: {isNaN(value) ? "N/A" : value}
    </p>
  );

  return (
    <div className="metrics-container">
      {data ? (
        <>
          {renderMetric("Click Through Rate (CTR)", data.ctr + "%")}
          {renderMetric("Conversion Rate (CR)", data.cr + "%")}
          {renderMetric("Cost Per Click (CPC)", "₦" + data.cpc)}
          {renderMetric("Cost Per Conversion", "₦" + data.costPerConversion)}
        </>
      ) : (
        <p className="no-data-message">No campaign data available</p>
      )}
    </div>
  );
};

export default Metrics;
