import { createRoot } from "react-dom/client";
import { useState } from "react";

import Metrics from "./components/Metrics";
import CampaignForm from "./components/CampaignForm";
import RetrieveAndCalculate from "./components/RetrieveAndCalculate";

const apiUrl = "http://localhost:4000/api/campaigns";

const App = () => {
  const [campaignData, setCampaignData] = useState(null);

  const handleDataRetrieved = (data) => {
    setCampaignData(data);
  };

  // Calculate metrics
  const calculateMetrics = () => {
    if (!campaignData || campaignData.message) return null;

    const ctr = (
      (campaignData.clicks / campaignData.impressions) *
      100
    ).toFixed(2);
    const cr = ((campaignData.conversions / campaignData.clicks) * 100).toFixed(
      2,
    );
    const cpc = (campaignData.spend / campaignData.clicks).toFixed(2);
    const costPerConversion = (
      campaignData.spend / campaignData.conversions
    ).toFixed(2);

    return { ctr, cr, cpc, costPerConversion };
  };

  const metricsData = calculateMetrics();

  return (
    <div className="app-container">
      <h1 className="app-heading">Hello, from Marketing Metrics</h1>
      <CampaignForm apiUrl={apiUrl} />
      <Metrics data={metricsData || campaignData} />
      <RetrieveAndCalculate
        apiUrl={apiUrl}
        onDataRetrieved={handleDataRetrieved}
      />
    </div>
  );
};

export default App;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
