import React, { useState, useEffect } from 'react';

const Metrics = ({ data }) => {
  const calculateMetrics = (data) => {
    if (!data) return {};

    const ctr = ((data.clicks / data.impressions) * 100).toFixed(2);
    const cr = ((data.conversions / data.clicks) * 100).toFixed(2);
    const cpc = (data.spend / data.clicks).toFixed(2);
    const costPerConversion = (data.spend / data.conversions).toFixed(2);

    return { ctr, cr, cpc, costPerConversion };
  };

  const [metrics, setMetrics] = useState(calculateMetrics(data));

  useEffect(() => {
    setMetrics(calculateMetrics(data));
  }, [data]);

  return (
    <div>
      <p>Click Through Rate (CTR): {metrics.ctr || 'N/A'}%</p>
      <p>Conversion Rate (CR): {metrics.cr || 'N/A'}%</p>
      <p>Cost Per Click (CPC): ${metrics.cpc || 'N/A'}</p>
      <p>Cost Per Conversion: ${metrics.costPerConversion || 'N/A'}</p>
    </div>
  );
};

export default Metrics;
